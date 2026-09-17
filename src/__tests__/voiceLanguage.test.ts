import { describe, expect, it } from "vitest";
import {
  getBrowserVoiceLanguage,
  getGeminiTranscriptionPrompt,
  getProviderTranscriptionLanguage,
} from "../lib/voice/language";

describe("voice language helpers", () => {
  it("maps app voice languages to browser BCP 47 language tags", () => {
    expect(getBrowserVoiceLanguage("en", "zh-TW")).toBe("en-US");
    expect(getBrowserVoiceLanguage("zh", "en-US")).toBe("zh-CN");
    expect(getBrowserVoiceLanguage("ja", "en-US")).toBe("ja-JP");
    expect(getBrowserVoiceLanguage("pt", "en-US")).toBe("pt-BR");
    expect(getBrowserVoiceLanguage("auto", "ja-JP")).toBe("ja-JP");
  });

  it("passes supported provider transcription language hints", () => {
    expect(getProviderTranscriptionLanguage("auto")).toBeUndefined();
    expect(getProviderTranscriptionLanguage("en")).toBe("en");
    expect(getProviderTranscriptionLanguage("zh")).toBe("zh");
    expect(getProviderTranscriptionLanguage("ja")).toBe("ja");
    expect(getProviderTranscriptionLanguage("pt")).toBe("pt");
  });

  it("builds a Japanese Gemini transcription prompt", () => {
    expect(getGeminiTranscriptionPrompt("ja")).toContain("Japanese");
  });

  it("builds a Portuguese Gemini transcription prompt", () => {
    expect(getGeminiTranscriptionPrompt("pt")).toContain("Portuguese");
  });
});
