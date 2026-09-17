import type { ModelProvider, ProviderType } from "@/types";
import {
  ANTHROPIC_PROVIDER_TYPE,
  GOOGLE_PROVIDER_TYPE,
  OPENAI_COMPATIBLE_PROVIDER_TYPE,
  OPENAI_PROVIDER_TYPE,
  isAnthropicProviderType,
  isGoogleProviderType,
} from "./providerTypes";

export interface ProviderPreset {
  id: string;
  name: string;
  type: ProviderType;
  baseUrl: string;
  keyUrl?: string;
  isLocal?: boolean;
  directCall?: boolean;
}

/**
 * Quick-add presets for well-known model providers. Selecting one pre-fills
 * name/type/baseUrl so the user only has to paste an API key.
 */
export const PROVIDER_PRESETS: ProviderPreset[] = [
  {
    id: "openai",
    name: "OpenAI",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.openai.com",
    keyUrl: "https://platform.openai.com/api-keys",
  },
  {
    id: "anthropic",
    name: "Anthropic (Claude)",
    type: ANTHROPIC_PROVIDER_TYPE,
    baseUrl: "https://api.anthropic.com",
    keyUrl: "https://console.anthropic.com/settings/keys",
  },
  {
    id: "google",
    name: "Google Gemini",
    type: GOOGLE_PROVIDER_TYPE,
    baseUrl: "https://generativelanguage.googleapis.com",
    keyUrl: "https://aistudio.google.com/app/apikey",
  },
  {
    id: "groq",
    name: "Groq",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.groq.com/openai",
    keyUrl: "https://console.groq.com/keys",
  },
  {
    id: "xai",
    name: "xAI (Grok)",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.x.ai",
    keyUrl: "https://console.x.ai/",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.deepseek.com",
    keyUrl: "https://platform.deepseek.com/api_keys",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.mistral.ai",
    keyUrl: "https://console.mistral.ai/api-keys/",
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.perplexity.ai",
    keyUrl: "https://www.perplexity.ai/settings/api",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://openrouter.ai/api",
    keyUrl: "https://openrouter.ai/keys",
  },
  {
    id: "together",
    name: "Together AI",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.together.xyz",
    keyUrl: "https://api.together.xyz/settings/api-keys",
  },
  {
    id: "fireworks",
    name: "Fireworks AI",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.fireworks.ai/inference",
    keyUrl: "https://fireworks.ai/api-keys",
  },
  {
    id: "cerebras",
    name: "Cerebras",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.cerebras.ai",
    keyUrl: "https://cloud.cerebras.ai/",
  },
  {
    id: "sambanova",
    name: "SambaNova Cloud",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.sambanova.ai",
    keyUrl: "https://cloud.sambanova.ai/",
  },
  {
    id: "deepinfra",
    name: "DeepInfra",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.deepinfra.com/v1/openai",
    keyUrl: "https://deepinfra.com/dash/api_keys",
  },
  {
    id: "cohere",
    name: "Cohere",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "https://api.cohere.ai/compatibility",
    keyUrl: "https://dashboard.cohere.com/api-keys",
  },
  {
    id: "ollama",
    name: "Ollama (Local)",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "http://localhost:11434",
    isLocal: true,
    directCall: true,
  },
  {
    id: "lmstudio",
    name: "LM Studio (Local)",
    type: OPENAI_COMPATIBLE_PROVIDER_TYPE,
    baseUrl: "http://localhost:1234",
    isLocal: true,
    directCall: true,
  },
];

const KNOWN_PROVIDER_DOMAINS: Array<{ domain: string; keyUrl: string }> = [
  { domain: "openai.com", keyUrl: "https://platform.openai.com/api-keys" },
  {
    domain: "anthropic.com",
    keyUrl: "https://console.anthropic.com/settings/keys",
  },
  {
    domain: "generativelanguage.googleapis.com",
    keyUrl: "https://aistudio.google.com/app/apikey",
  },
  {
    domain: "aistudio.google.com",
    keyUrl: "https://aistudio.google.com/app/apikey",
  },
  { domain: "groq.com", keyUrl: "https://console.groq.com/keys" },
  { domain: "x.ai", keyUrl: "https://console.x.ai/" },
  { domain: "deepseek.com", keyUrl: "https://platform.deepseek.com/api_keys" },
  { domain: "mistral.ai", keyUrl: "https://console.mistral.ai/api-keys/" },
  {
    domain: "perplexity.ai",
    keyUrl: "https://www.perplexity.ai/settings/api",
  },
  { domain: "openrouter.ai", keyUrl: "https://openrouter.ai/keys" },
  {
    domain: "together.xyz",
    keyUrl: "https://api.together.xyz/settings/api-keys",
  },
  {
    domain: "together.ai",
    keyUrl: "https://api.together.xyz/settings/api-keys",
  },
  { domain: "fireworks.ai", keyUrl: "https://fireworks.ai/api-keys" },
  { domain: "cerebras.ai", keyUrl: "https://cloud.cerebras.ai/" },
  { domain: "sambanova.ai", keyUrl: "https://cloud.sambanova.ai/" },
  { domain: "deepinfra.com", keyUrl: "https://deepinfra.com/dash/api_keys" },
  { domain: "cohere.ai", keyUrl: "https://dashboard.cohere.com/api-keys" },
  { domain: "cohere.com", keyUrl: "https://dashboard.cohere.com/api-keys" },
  {
    domain: "siliconflow.cn",
    keyUrl: "https://cloud.siliconflow.cn/account/ak",
  },
  {
    domain: "moonshot.cn",
    keyUrl: "https://platform.moonshot.cn/console/api-keys",
  },
  {
    domain: "bigmodel.cn",
    keyUrl: "https://open.bigmodel.cn/usercenter/apikeys",
  },
  { domain: "aliyun.com", keyUrl: "https://bailian.console.aliyun.com/" },
  {
    domain: "minimaxi.com",
    keyUrl:
      "https://platform.minimaxi.com/user-center/basic-information/interface-key",
  },
  { domain: "novita.ai", keyUrl: "https://novita.ai/settings/key-management" },
  { domain: "ai21.com", keyUrl: "https://studio.ai21.com/account/api-key" },
  { domain: "upstage.ai", keyUrl: "https://console.upstage.ai/api-keys" },
];

export function getProviderApiKeyHelpUrl(
  provider?: Partial<ModelProvider> | ProviderType | null,
): string | undefined {
  if (!provider) return undefined;
  if (typeof provider === "string") {
    return getProviderApiKeyHelpUrl({ type: provider });
  }

  const directKeyUrl =
    typeof provider.keyUrl === "string" ? provider.keyUrl.trim() : "";
  if (directKeyUrl) return directKeyUrl;

  const id = provider.id?.trim().toLowerCase();
  const name = provider.name?.trim().toLowerCase();
  const baseUrl = provider.baseUrl?.trim().toLowerCase();

  if (id) {
    const presetById = PROVIDER_PRESETS.find(
      (preset) => preset.id.toLowerCase() === id,
    );
    if (presetById?.keyUrl) return presetById.keyUrl;
  }

  if (name) {
    const presetByName = PROVIDER_PRESETS.find(
      (preset) => preset.name.toLowerCase() === name,
    );
    if (presetByName?.keyUrl) return presetByName.keyUrl;
  }

  if (baseUrl) {
    try {
      const url = new URL(
        baseUrl.startsWith("http://") || baseUrl.startsWith("https://")
          ? baseUrl
          : `https://${baseUrl}`,
      );
      const host = url.hostname.toLowerCase();

      const presetByBaseUrl = PROVIDER_PRESETS.find((preset) => {
        if (!preset.baseUrl) return false;
        try {
          const presetHost = new URL(preset.baseUrl).hostname.toLowerCase();
          return (
            host === presetHost ||
            host.endsWith("." + presetHost) ||
            presetHost.endsWith("." + host)
          );
        } catch {
          return false;
        }
      });
      if (presetByBaseUrl?.keyUrl) return presetByBaseUrl.keyUrl;

      const matchedDomain = KNOWN_PROVIDER_DOMAINS.find(
        (entry) => host === entry.domain || host.endsWith("." + entry.domain),
      );
      if (matchedDomain) return matchedDomain.keyUrl;
    } catch {
      // Ignore URL parse errors
    }
  }

  if (isGoogleProviderType(provider.type)) {
    return "https://aistudio.google.com/app/apikey";
  }
  if (isAnthropicProviderType(provider.type)) {
    return "https://console.anthropic.com/settings/keys";
  }
  if (provider.type === OPENAI_PROVIDER_TYPE) {
    return "https://platform.openai.com/api-keys";
  }

  return undefined;
}
