import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("api-key-utilities", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("initialize stores a valid API key", async () => {
    const { initialize, getApiKey } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );

    initialize({ apiKey: "test-key" });
    expect(getApiKey()).toBe("test-key");
  });

  test("initialize throws when options is missing", async () => {
    const { initialize } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );

    expect(() => initialize(undefined as unknown as { apiKey: string })).toThrow(
      "Options object is required for initialization"
    );
    expect(() => initialize(null as unknown as { apiKey: string })).toThrow(
      "Options object is required for initialization"
    );
  });

  test("initialize throws when options is not an object", async () => {
    const { initialize } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );

    expect(() => initialize("bad" as unknown as { apiKey: string })).toThrow(
      "Options object is required for initialization"
    );
    expect(() => initialize(42 as unknown as { apiKey: string })).toThrow(
      "Options object is required for initialization"
    );
  });

  test("initialize throws when apiKey is missing or not a string", async () => {
    const { initialize } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );

    expect(() => initialize({} as { apiKey: string })).toThrow(
      "API key is required and must be a string"
    );
    expect(() => initialize({ apiKey: "" })).toThrow(
      "API key is required and must be a string"
    );
    expect(() => initialize({ apiKey: 123 as unknown as string })).toThrow(
      "API key is required and must be a string"
    );
  });

  test("getApiKey throws when client is not initialized", async () => {
    const { getApiKey } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );

    expect(() => getApiKey()).toThrow(
      'RuleCMS client must be initialized with an API key first. Call initialize({ apiKey: "your-api-key" }) before making requests.'
    );
  });

  test("api-key-utilities barrel re-exports initialize", async () => {
    const barrel = await import("../api-key-utilities/src/index");
    expect(typeof barrel.initialize).toBe("function");
  });
});
