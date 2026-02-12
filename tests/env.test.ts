import { describe, expect, test } from "bun:test";

function forceServerRuntime() {
  delete (globalThis as any).window;
  delete (globalThis as any).document;
  delete (globalThis as any).navigator;
}

async function importFreshEnv() {
  return import(`../src/env.mjs?test=${crypto.randomUUID()}`);
}

describe("env.mjs loading .env", () => {
  test("reads variables from the .env file (via process.env)", async () => {
    forceServerRuntime();

    const mod = await importFreshEnv();
    const env = mod.default;

    expect(env.NODE_ENV).toBe("test");
    expect(env.NEXT_PUBLIC_WEBSITE_URL).toBeTruthy();
  });
});
