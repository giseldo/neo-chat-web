import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createApiErrorResponse,
  readJsonRequestBody,
} from "@/lib/api/middleware";
import { ProviderRuntimeConfigSchema } from "@/lib/api/schemas";
import { safeFetchJson } from "@/lib/security/safeFetch";
import { extractProviderModelIds } from "@/lib/providers/models";
import {
  ANTHROPIC_API_VERSION_HEADER,
  getProviderApiKey,
  getProviderModelsUrl,
  getSafeUrlPolicy,
} from "@/lib/security/urlPolicy";
import {
  isAnthropicProviderType,
  isOpenAIProviderType,
} from "@/lib/providers/providerTypes";
import { resolveProviderRuntimeConfig } from "@/lib/byok/server";
import { safeServerLogError } from "@/lib/utils/safeServerLog";

const ProviderModelsRequestSchema = z.object({
  provider: ProviderRuntimeConfigSchema,
});

export async function POST(request: NextRequest) {
  try {
    const { provider: parsedProvider } = ProviderModelsRequestSchema.parse(
      await readJsonRequestBody(request),
    );
    const provider = await resolveProviderRuntimeConfig(parsedProvider);
    const apiKey = getProviderApiKey(provider);

    if (!apiKey) {
      return NextResponse.json(
        { error: `${provider.type} API key is not configured` },
        { status: 401 },
      );
    }

    const endpoint = getProviderModelsUrl(provider.baseUrl, provider.type);
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (isOpenAIProviderType(provider.type)) {
      headers.Authorization = `Bearer ${apiKey}`;
    } else if (isAnthropicProviderType(provider.type)) {
      headers["x-api-key"] = apiKey;
      headers["anthropic-version"] = ANTHROPIC_API_VERSION_HEADER;
    } else {
      headers["x-goog-api-key"] = apiKey;
    }

    const { response, data } = await safeFetchJson<any>(
      endpoint,
      { method: "GET", headers },
      {
        policy: getSafeUrlPolicy("provider"),
        timeoutMs: 20_000,
        maxResponseBytes: 4 * 1024 * 1024,
      },
    );

    if (!response.ok) {
      const upstreamError =
        typeof data?.error === "string"
          ? data.error
          : typeof data?.error?.message === "string"
            ? data.error.message
            : typeof data?.message === "string"
              ? data.message
              : typeof data?.detail === "string"
                ? data.detail
                : undefined;

      const providerLabel = provider.name || provider.type;
      const error = upstreamError
        ? `${providerLabel}: ${upstreamError}`
        : `Failed to fetch ${provider.type} models (HTTP ${response.status})`;

      return NextResponse.json({ error }, { status: response.status });
    }

    const models = extractProviderModelIds(provider.type, data);

    return NextResponse.json({ models });
  } catch (error) {
    safeServerLogError("Provider models error:", error);
    return createApiErrorResponse(error, "Failed to fetch models");
  }
}
