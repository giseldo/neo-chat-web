import type { ProviderType } from "@/types";
import {
  ANTHROPIC_PROVIDER_TYPE,
  GOOGLE_PROVIDER_TYPE,
  OPENAI_COMPATIBLE_PROVIDER_TYPE,
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
