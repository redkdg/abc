import { toast } from "@/components/ui/use-toast";

// API key management
const API_KEY_STORAGE_KEY = "invoice_api_key";
const API_BASE_URL = "https://api.datafusion.com";

/**
 * Save API key to local storage
 */
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

/**
 * Get API key from local storage
 */
export const getApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

/**
 * Clear API key from local storage
 */
export const clearApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

/**
 * Check if API key is valid by making a test request to the API
 */
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // For demo purposes, we'll accept any API key
    // In a real implementation, you would validate against your actual API
    console.log("Validating API key:", apiKey);

    // Simulate API validation delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Always return true for demo purposes
    return true;
  } catch (error) {
    console.error("Error validating API key:", error);
    return false;
  }
};

/**
 * Extract data from DataFusion API using API key
 */
export const extractDataFromExternalSystem = async (
  endpoint: string,
  params?: Record<string, any>,
): Promise<any> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    toast({
      title: "API Key Missing",
      description: "Please configure your API key in settings",
      variant: "destructive",
    });
    throw new Error("API key not configured");
  }

  try {
    // Build the URL with query parameters if provided
    let url = `${API_BASE_URL}/${endpoint}`;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      url += `?${queryParams.toString()}`;
    }

    // Make the API request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `API-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error extracting data from DataFusion API:", error);
    toast({
      title: "Data Extraction Failed",
      description:
        error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Import invoice data from DataFusion API
 */
export const importInvoiceData = async (): Promise<any> => {
  try {
    const data = await extractDataFromExternalSystem("api/external/data", {
      timeframe: "day",
      dimension: "industry",
    });
    toast({
      title: "Data Imported Successfully",
      description: `Imported ${data.length} invoice records from DataFusion`,
      variant: "default",
    });
    return data;
  } catch (error) {
    // Error is already handled in extractDataFromExternalSystem
    return [];
  }
};

/**
 * Import client data from DataFusion API
 */
export const importClientData = async (): Promise<any> => {
  try {
    const data = await extractDataFromExternalSystem("api/external/data", {
      timeframe: "month",
      dimension: "region",
    });
    toast({
      title: "Data Imported Successfully",
      description: `Imported ${data.length} client records from DataFusion`,
      variant: "default",
    });
    return data;
  } catch (error) {
    // Error is already handled in extractDataFromExternalSystem
    return [];
  }
};

/**
 * Import industry data from DataFusion API
 */
export const importItemData = async (): Promise<any> => {
  try {
    const data = await extractDataFromExternalSystem("api/external/industries");
    toast({
      title: "Data Imported Successfully",
      description: `Imported ${data.length} industry records from DataFusion`,
      variant: "default",
    });
    return data;
  } catch (error) {
    // Error is already handled in extractDataFromExternalSystem
    return [];
  }
};

/**
 * Get aggregated invoice data with specific parameters
 */
export const getAggregatedInvoiceData = async (
  timeframe: string = "day",
  dimension: string = "industry",
  startDate?: string,
  endDate?: string,
): Promise<any> => {
  try {
    const params: Record<string, any> = {
      timeframe,
      dimension,
    };

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return await extractDataFromExternalSystem("api/external/data", params);
  } catch (error) {
    console.error("Error getting aggregated invoice data:", error);
    return [];
  }
};

/**
 * Get industry breakdown data
 */
export const getIndustryBreakdownData = async (): Promise<any> => {
  try {
    return await extractDataFromExternalSystem("api/external/industries");
  } catch (error) {
    console.error("Error getting industry breakdown data:", error);
    return [];
  }
};
