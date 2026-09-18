"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  Check,
  ChevronUp,
  ExternalLink,
  Globe,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  encryptLocalSecret,
  LOCAL_SECRET_CONTEXTS,
  type LocalEncryptedSecretEnvelope,
} from "@/lib/security/localSecrets";
import { resolveSearchApiKey } from "@/lib/security/localSecretResolvers";
import { SecretInput } from "@/components/ui/controls";
import { Button } from "@/components/ui/primitives";

// --- Custom Select Component ---
// --- Search Provider Item ---
export const SearchProviderItem = ({
  id,
  name,
  icon,
  description,
  isActive,
  onActivate,
  defaultBaseUrl,
  hasApiKey = true,
  hasBaseUrl = true,
  config,
  onUpdateConfig,
  apiKeyMaxLength,
  baseUrlMaxLength,
  apiKeyHelpUrl,
}: {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
  isActive: boolean;
  onActivate: () => void;
  defaultBaseUrl?: string;
  hasApiKey?: boolean;
  hasBaseUrl?: boolean;
  config?: {
    apiKey?: string;
    apiKeySecret?: LocalEncryptedSecretEnvelope;
    baseUrl?: string;
  };
  onUpdateConfig?: (updates: {
    apiKey?: string;
    apiKeySecret?: LocalEncryptedSecretEnvelope;
    baseUrl?: string;
  }) => void;
  apiKeyMaxLength?: number;
  baseUrlMaxLength?: number;
  apiKeyHelpUrl?: string;
}) => {
  const t = useTranslations("Common");
  const [isExpanded, setIsExpanded] = useState(false);
  const domId = id.replace(/[^a-zA-Z0-9_-]/g, "-");
  const panelId = `search-provider-${domId}-settings`;
  const apiKeyInputId = `search-provider-${domId}-api-key`;
  const baseUrlInputId = `search-provider-${domId}-base-url`;

  return (
    <div
      className={`border rounded-xl transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden ${isActive ? "border-blue-500 ring-1 ring-blue-500/20 bg-blue-50/10 dark:bg-blue-900/10" : "border-gray-200 dark:border-border bg-white dark:bg-muted hover:border-gray-300 dark:hover:border-border"}`}
    >
      <div className="flex items-center justify-between gap-3 p-4">
        <Button
          variant="bare"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
        >
          <span
            aria-hidden="true"
            className={`w-8 h-8 rounded-lg flex shrink-0 items-center justify-center ${isActive ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300" : "bg-gray-100 dark:bg-accent text-gray-500 dark:text-muted-foreground"}`}
          >
            {icon || <Globe size={18} />}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-medium text-sm text-gray-800 dark:text-foreground">
              {name}
            </span>
            {description && (
              <span className="text-[10px] text-gray-500 dark:text-muted-foreground">
                {description}
              </span>
            )}
          </span>
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="bare"
            type="button"
            aria-pressed={isActive}
            aria-label={`${name}: ${isActive ? t("active") : t("enable")}`}
            onClick={onActivate}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${
              isActive
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-gray-100 dark:bg-accent text-gray-600 dark:text-foreground/85 hover:bg-gray-200 dark:hover:bg-accent/80"
            }`}
          >
            {isActive ? (
              <>
                <Check size={12} strokeWidth={3} aria-hidden="true" />{" "}
                {t("active")}
              </>
            ) : (
              t("enable")
            )}
          </Button>
          <Button
            variant="bare"
            type="button"
            aria-label={
              isExpanded
                ? t("collapseSettings", { name })
                : t("expandSettings", { name })
            }
            aria-expanded={isExpanded}
            aria-controls={panelId}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:hover:bg-accent dark:hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (hasApiKey || hasBaseUrl) && (
        <div
          id={panelId}
          className="px-4 pb-4 pt-0 space-y-3 border-t border-gray-100 dark:border-border mt-1"
        >
          <div className="h-2"></div>

          {hasApiKey && (
            <div className="space-y-1.5">
              <label
                htmlFor={apiKeyInputId}
                className="text-xs font-medium text-gray-500 dark:text-muted-foreground flex justify-between"
              >
                {t("apiKey")}
                {apiKeyHelpUrl ? (
                  <a
                    href={apiKeyHelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-1"
                  >
                    {t("getKey")} <ExternalLink size={10} aria-hidden="true" />
                  </a>
                ) : null}
              </label>
              <div className="relative">
                <SecretInput
                  id={apiKeyInputId}
                  name={`${domId}ApiKey`}
                  maxLength={apiKeyMaxLength}
                  placeholder={t("enterApiKey")}
                  hasSecret={Boolean(config?.apiKey || config?.apiKeySecret)}
                  onReveal={() => resolveSearchApiKey(id, config)}
                  onSave={async (value) =>
                    onUpdateConfig?.({
                      apiKey: "",
                      apiKeySecret: await encryptLocalSecret(
                        value,
                        LOCAL_SECRET_CONTEXTS.searchApiKey(id),
                      ),
                    })
                  }
                  onClear={() =>
                    onUpdateConfig?.({ apiKey: "", apiKeySecret: undefined })
                  }
                  inputClassName="min-w-0 flex-1 px-3 py-2 bg-gray-50 dark:bg-card border border-gray-200 dark:border-border rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-700 dark:text-foreground"
                />
              </div>
            </div>
          )}

          {hasBaseUrl && (
            <div className="space-y-1.5">
              <label
                htmlFor={baseUrlInputId}
                className="text-xs font-medium text-gray-500 dark:text-muted-foreground"
              >
                {t("baseUrl")}
              </label>
              <input
                id={baseUrlInputId}
                name={`${domId}BaseUrl`}
                type="url"
                inputMode="url"
                value={config?.baseUrl || ""}
                onChange={(e) => onUpdateConfig?.({ baseUrl: e.target.value })}
                maxLength={baseUrlMaxLength}
                autoComplete="off"
                spellCheck={false}
                placeholder={
                  defaultBaseUrl
                    ? `${defaultBaseUrl}…`
                    : t("apiBaseUrlPlaceholder")
                }
                className="w-full px-3 py-2 bg-gray-50 dark:bg-card border border-gray-200 dark:border-border rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-700 dark:text-foreground"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
