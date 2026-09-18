// @vitest-environment jsdom

import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SecretInput } from "@/components/ui/controls";
import commonMessages from "@/i18n/locales/en/Common.json";

afterEach(cleanup);

function renderSecretInput(
  props: Partial<React.ComponentProps<typeof SecretInput>> = {},
) {
  const merged = {
    id: "test-secret-input",
    name: "testSecret",
    placeholder: "sk-...",
    hasSecret: false,
    onSave: vi.fn(),
    onClear: vi.fn(),
    ...props,
  };

  render(
    <NextIntlClientProvider locale="en" messages={{ Common: commonMessages }}>
      <SecretInput {...merged} />
    </NextIntlClientProvider>,
  );

  return merged;
}

describe("SecretInput", () => {
  it("toggles input type between password and text when show/hide button is clicked", async () => {
    renderSecretInput({ hasSecret: false });

    const input = screen.getByPlaceholderText("sk-...") as HTMLInputElement;
    expect(input.type).toBe("password");

    await userEvent.type(input, "my-secret-key");
    expect(input.value).toBe("my-secret-key");

    const showButton = screen.getByRole("button", { name: /show key/i });
    await userEvent.click(showButton);

    expect(input.type).toBe("text");

    const hideButton = screen.getByRole("button", { name: /hide key/i });
    await userEvent.click(hideButton);

    expect(input.type).toBe("password");
  });

  it("calls onReveal when show button is clicked on existing saved secret", async () => {
    const onReveal = vi.fn().mockResolvedValue("revealed-api-key");
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={{ Common: commonMessages }}>
        <SecretInput
          id="test-secret-input"
          name="testSecret"
          placeholder="sk-..."
          hasSecret={true}
          onSave={vi.fn()}
          onClear={vi.fn()}
          onReveal={onReveal}
        />
      </NextIntlClientProvider>,
    );

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.type).toBe("password");

    const showButton = screen.getByRole("button", { name: /show key/i });
    await userEvent.click(showButton);

    expect(onReveal).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("revealed-api-key");
    expect(input.type).toBe("text");
  });
});
