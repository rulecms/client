import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("getConfigurationByKey", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("throws when not running in a browser environment", async () => {
    const { getConfigurationByKey } = await import(
      "../get-configuration/src/get-configuration-by-key"
    );

    await expect(getConfigurationByKey("site-title")).rejects.toThrow(
      "This function can only be used in a browser environment"
    );
  });

  test("returns configuration data on successful fetch", async () => {
    vi.stubGlobal("window", {});
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      statusText: "OK",
      json: async () => ({ value: "hello", extra: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { initialize } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );
    const { getConfigurationByKey } = await import(
      "../get-configuration/src/get-configuration-by-key"
    );

    initialize({ apiKey: "secret-key" });
    const data = await getConfigurationByKey("site-title");

    expect(data).toEqual({ value: "hello", extra: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://rulecms.com/api/v1/configuration/site-title",
      {
        headers: {
          Authorization: "Bearer secret-key",
          "Content-Type": "application/json",
        },
      }
    );
  });

  test("logs and rethrows when response is not ok", async () => {
    vi.stubGlobal("window", {});
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", fetchMock);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const { initialize } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );
    const { getConfigurationByKey } = await import(
      "../get-configuration/src/get-configuration-by-key"
    );

    initialize({ apiKey: "secret-key" });

    await expect(getConfigurationByKey("missing")).rejects.toThrow(
      "Failed to fetch configuration for key missing: Not Found"
    );
    expect(consoleError).toHaveBeenCalled();
  });

  test("logs and rethrows when client is not initialized", async () => {
    vi.stubGlobal("window", {});
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const { getConfigurationByKey } = await import(
      "../get-configuration/src/get-configuration-by-key"
    );

    await expect(getConfigurationByKey("site-title")).rejects.toThrow(
      "RuleCMS client must be initialized with an API key first"
    );
    expect(consoleError).toHaveBeenCalled();
  });

  test("logs and rethrows when fetch rejects", async () => {
    vi.stubGlobal("window", {});
    const networkError = new Error("network down");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(networkError));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const { initialize } = await import(
      "../api-key-utilities/src/api-key-utilities"
    );
    const { getConfigurationByKey } = await import(
      "../get-configuration/src/get-configuration-by-key"
    );

    initialize({ apiKey: "secret-key" });

    await expect(getConfigurationByKey("site-title")).rejects.toThrow(
      "network down"
    );
    expect(consoleError).toHaveBeenCalledWith(
      "Error fetching configuration for key site-title:",
      networkError
    );
  });

  test("get-configuration barrel re-exports", async () => {
    const barrel = await import("../get-configuration/src/index");
    expect(typeof barrel.getConfigurationByKey).toBe("function");
    expect(typeof barrel.initialize).toBe("function");
  });
});
