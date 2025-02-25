import { getApiKey } from "../../client";
import fetch from "cross-fetch";

interface ConfigurationResponse {
  value: any;
  [key: string]: any;
}

/**
 * Fetches configuration value by key from the API
 * @param key The configuration key to fetch
 * @returns Promise that resolves to the configuration value
 * @throws Error if client is not initialized with API key
 */
export async function getConfigurationByKey(
  key: string
): Promise<ConfigurationResponse> {
  const baseUrl = "https://rulecms.com/api";

  try {
    // Get API key - will throw if not initialized
    const apiKey = getApiKey();
    const response = await fetch(`${baseUrl}/v1/configuration/${key}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch configuration for key ${key}: ${response.statusText}`
      );
    }

    const data: ConfigurationResponse = await response.json();
    return data;
  } catch (error) {
    // Don't log the API key in errors
    console.error(`Error fetching configuration for key ${key}:`, error);
    throw error;
  }
}
