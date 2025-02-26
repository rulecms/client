let apiKey: string | null = null;

export function initialize(key: string): void {
  if (!key || typeof key !== "string") {
    throw new Error("API key is required and must be a string");
  }
  apiKey = key;
}

export function getApiKey(): string {
  if (!apiKey) {
    throw new Error(
      "RuleCMS client must be initialized with an API key first. Call initialize() with your API key."
    );
  }
  return apiKey;
}
