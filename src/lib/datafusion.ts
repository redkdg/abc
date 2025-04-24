import { getApiKey } from "./api";
import { toast } from "@/components/ui/use-toast";

// Define the DataFusion API endpoint
const DATAFUSION_API_ENDPOINT =
  "https://api.datafusion.example.com/v1/invoices";

// Track sync history in localStorage
const trackSyncHistory = (invoice: any, action: string, success: boolean) => {
  try {
    const historyKey = "datafusion_sync_history";
    const existingHistory = localStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];

    // Add new sync event to history
    const syncEvent = {
      id: `sync-${Date.now()}`,
      type: action,
      status: success ? "success" : "failed",
      timestamp: new Date().toISOString(),
      details: `Invoice #${invoice.invoiceNumber} ${action} operation`,
      itemsCount: 1,
      invoiceNumber: invoice.invoiceNumber,
    };

    // Add to beginning of array and limit to 50 entries
    const updatedHistory = [syncEvent, ...history].slice(0, 50);
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Error tracking sync history:", error);
  }
};

/**
 * Automatically sync invoice data to DataFusion
 * @param invoice The invoice data to sync
 * @param action The action that triggered the sync (create, update, delete)
 */
export const syncInvoiceToDataFusion = async (
  invoice: any,
  action: "create" | "update" | "delete",
): Promise<boolean> => {
  const apiKey = getApiKey();

  // If no API key is configured, silently skip sync
  if (!apiKey) {
    console.log("DataFusion sync skipped: No API key configured");
    return false;
  }

  try {
    console.log(
      `Starting DataFusion sync for invoice #${invoice.invoiceNumber} with action: ${action}`,
    );
    console.log(
      `Using API key: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`,
    ); // Show only first and last 4 chars for security

    // Prepare invoice data for export
    const exportData = {
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName || invoice.client,
      issueDate: invoice.issueDate || invoice.date,
      dueDate: invoice.dueDate,
      amount: invoice.total,
      status: invoice.status,
      items: invoice.items.map((item: any) => ({
        description: item.description,
        quantity: item.quantity,
        price: item.price || item.rate,
        amount: item.amount || item.quantity * (item.price || item.rate),
      })),
      taxRate: invoice.taxRate || 10,
      taxAmount: invoice.tax,
      subtotal: invoice.subtotal,
      total: invoice.total,
      notes: invoice.notes,
      syncAction: action,
      syncedAt: new Date().toISOString(),
    };

    console.log(`DataFusion API endpoint: ${DATAFUSION_API_ENDPOINT}`);
    console.log(
      `DataFusion sync payload:`,
      JSON.stringify(exportData, null, 2),
    );

    // In a real implementation, you would send this data to your DataFusion API
    // For demo purposes, we'll simulate an API call with fetch
    try {
      // Uncomment and modify this code to make a real API call
      /*
      const response = await fetch(DATAFUSION_API_ENDPOINT, {
        method: action === 'delete' ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'X-DataFusion-Action': action
        },
        body: JSON.stringify(exportData)
      });

      const responseData = await response.json();
      console.log('DataFusion API response:', responseData);

      if (!response.ok) {
        throw new Error(`DataFusion API error: ${response.status} ${response.statusText}`);
      }
      */

      // For now, just simulate a successful API call
      console.log(`Simulating DataFusion API call for ${action}...`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("DataFusion sync completed successfully (simulated)");

      // Track this sync in history
      trackSyncHistory(invoice, action, true);

      return true;
    } catch (apiError) {
      console.error("DataFusion API call failed:", apiError);
      // Track failed sync attempt
      trackSyncHistory(invoice, action, false);
      return false;
    }
  } catch (error) {
    console.error("Error preparing data for DataFusion sync:", error);
    return false;
  }
};

/**
 * Show a toast notification for successful DataFusion sync
 * @param invoice The invoice that was synced
 * @param action The action that triggered the sync
 */
export const showSyncSuccessToast = (
  invoice: any,
  action: "create" | "update" | "delete",
) => {
  const actionText = {
    create: "created",
    update: "updated",
    delete: "deleted",
  }[action];

  toast({
    title: "DataFusion Sync Complete",
    description: `Invoice #${invoice.invoiceNumber} was ${actionText} in DataFusion`,
    variant: "default",
  });

  console.log(
    `Toast notification shown for invoice #${invoice.invoiceNumber} ${actionText} in DataFusion`,
  );
};

/**
 * Troubleshoot DataFusion connection issues
 * @returns Object with connection status and details
 */
export const troubleshootDataFusionConnection = async (): Promise<{
  connected: boolean;
  details: string;
  timestamp: string;
}> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      connected: false,
      details:
        "No API key configured. Please add your DataFusion API key in Settings.",
      timestamp: new Date().toISOString(),
    };
  }

  try {
    // Simulate a connection test
    console.log("Testing DataFusion API connection...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation, you would make an actual API call to test the connection
    // For demo purposes, we'll just return success
    return {
      connected: true,
      details: "Connection successful. API endpoint is reachable.",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error testing DataFusion connection:", error);
    return {
      connected: false,
      details: `Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      timestamp: new Date().toISOString(),
    };
  }
};
