import { afterEach, beforeEach, describe, expect, test } from "bun:test";

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalNavigator = globalThis.navigator;

function forceServerRuntime(): void {
  const g = globalThis as Record<string, unknown>;
  delete g.window;
  delete g.document;
  delete g.navigator;
}

function restoreRuntime(): void {
  const g = globalThis as Record<string, unknown>;
  g.window = originalWindow;
  g.document = originalDocument;
  g.navigator = originalNavigator;
}

async function importFreshEnv(): Promise<typeof import("@/env.mjs")> {
  return import(`@/env.mjs?test=${crypto.randomUUID()}`);
}

describe("env.mjs loading .env", () => {
  beforeEach(() => {
    forceServerRuntime();
  });

  afterEach(() => {
    restoreRuntime();
  });

  test("reads variables from the .env file (via process.env)", async () => {
    const mod = await importFreshEnv();
    const env = mod.default;

    expect(env.NODE_ENV).toBeTruthy();
    expect(env.NEXT_PUBLIC_WEBSITE_URL).toBeTruthy();
  });
});
