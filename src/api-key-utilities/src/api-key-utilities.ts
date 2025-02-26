let apiKey: string | null = null;

/**
 * Initializes the RuleCMS client with an API key
 * @param options Configuration options containing the API key
 * @throws Error if API key is missing or invalid
 */
export function initialize(options: { apiKey: string }): void {
  if (!options || typeof options !== "object") {
    throw new Error("Options object is required for initialization");
  }

  if (!options.apiKey || typeof options.apiKey !== "string") {
    throw new Error("API key is required and must be a string");
  }

  apiKey = options.apiKey;
}

/**
 * Gets the stored API key
 * @returns The API key
 * @throws Error if client is not initialized
 */
export function getApiKey(): string {
  if (!apiKey) {
    throw new Error(
      'RuleCMS client must be initialized with an API key first. Call initialize({ apiKey: "your-api-key" }) before making requests.'
    );
  }
  return apiKey;
}
