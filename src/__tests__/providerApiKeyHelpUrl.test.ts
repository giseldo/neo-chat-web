import { describe, expect, it } from "vitest";
import {
  getProviderApiKeyHelpUrl,
  PROVIDER_PRESETS,
} from "../lib/providers/presets";

describe("getProviderApiKeyHelpUrl", () => {
  it("returns explicit keyUrl when configured on provider", () => {
    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-id",
        name: "Custom",
        keyUrl: "https://example.com/custom-keys",
      }),
    ).toBe("https://example.com/custom-keys");
  });

  it("resolves keyUrl for Mistral AI by preset ID, name, or baseUrl", () => {
    expect(
      getProviderApiKeyHelpUrl({
        id: "mistral",
        name: "Mistral AI",
        type: "OpenAI Compatible",
        baseUrl: "https://api.mistral.ai",
      }),
    ).toBe("https://console.mistral.ai/api-keys/");

    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-mistral-id",
        name: "Mistral AI",
        type: "OpenAI Compatible",
      }),
    ).toBe("https://console.mistral.ai/api-keys/");

    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-id",
        name: "Custom Name",
        type: "OpenAI Compatible",
        baseUrl: "https://api.mistral.ai/v1",
      }),
    ).toBe("https://console.mistral.ai/api-keys/");
  });

  it("resolves keyUrl for all presets that define keyUrl", () => {
    for (const preset of PROVIDER_PRESETS) {
      if (preset.isLocal) {
        expect(getProviderApiKeyHelpUrl(preset)).toBeUndefined();
      } else if (preset.keyUrl) {
        expect(getProviderApiKeyHelpUrl(preset)).toBe(preset.keyUrl);
      }
    }
  });

  it("resolves keyUrl for known third-party provider domains", () => {
    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-siliconflow",
        name: "SiliconFlow",
        baseUrl: "https://api.siliconflow.cn/v1",
        type: "OpenAI Compatible",
      }),
    ).toBe("https://cloud.siliconflow.cn/account/ak");

    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-moonshot",
        name: "Moonshot",
        baseUrl: "https://api.moonshot.cn/v1",
        type: "OpenAI Compatible",
      }),
    ).toBe("https://platform.moonshot.cn/console/api-keys");
  });

  it("falls back to type-based URL when provider type matches standard providers", () => {
    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-google",
        type: "Google",
      }),
    ).toBe("https://aistudio.google.com/app/apikey");

    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-anthropic",
        type: "Anthropic",
      }),
    ).toBe("https://console.anthropic.com/settings/keys");

    expect(
      getProviderApiKeyHelpUrl({
        id: "custom-openai",
        type: "OpenAI",
      }),
    ).toBe("https://platform.openai.com/api-keys");
  });

  it("handles string provider type arguments for backward compatibility", () => {
    expect(getProviderApiKeyHelpUrl("Google")).toBe(
      "https://aistudio.google.com/app/apikey",
    );
    expect(getProviderApiKeyHelpUrl("Anthropic")).toBe(
      "https://console.anthropic.com/settings/keys",
    );
    expect(getProviderApiKeyHelpUrl("OpenAI")).toBe(
      "https://platform.openai.com/api-keys",
    );
  });

  it("returns undefined for local or unknown providers without key URL", () => {
    expect(
      getProviderApiKeyHelpUrl({
        id: "ollama",
        name: "Ollama (Local)",
        type: "OpenAI Compatible",
        baseUrl: "http://localhost:11434",
      }),
    ).toBeUndefined();

    expect(
      getProviderApiKeyHelpUrl({
        id: "unknown-custom-provider",
        name: "Self Hosted LLM",
        type: "OpenAI Compatible",
        baseUrl: "http://192.168.1.50:8000/v1",
      }),
    ).toBeUndefined();

    expect(getProviderApiKeyHelpUrl(null)).toBeUndefined();
    expect(getProviderApiKeyHelpUrl(undefined)).toBeUndefined();
  });
});
