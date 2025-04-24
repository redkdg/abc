import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getApiKey } from "@/lib/api";
import { troubleshootDataFusionConnection } from "@/lib/datafusion";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react";

export default function DataFusionDiagnostics() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    details: string;
    timestamp: string;
  } | null>(null);
  const [syncHistory, setSyncHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("status");

  // Load sync history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem("datafusion_sync_history");
    if (storedHistory) {
      try {
        setSyncHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Error parsing sync history:", e);
      }
    }
  }, []);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const status = await troubleshootDataFusionConnection();
      setConnectionStatus(status);

      if (status.connected) {
        toast({
          title: "Connection Successful",
          description: "Successfully connected to DataFusion API",
          variant: "default",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: status.details,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error checking connection:", error);
      setConnectionStatus({
        connected: false,
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to simulate clearing sync history
  const clearSyncHistory = () => {
    setSyncHistory([]);
    localStorage.removeItem("datafusion_sync_history");
    toast({
      title: "Sync History Cleared",
      description: "DataFusion sync history has been cleared",
      variant: "default",
    });
  };

  // Mock function to simulate forcing a sync
  const forceSync = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add to sync history
      const newSyncEvent = {
        id: `sync-${Date.now()}`,
        type: "manual",
        status: "success",
        timestamp: new Date().toISOString(),
        details: "Manual sync initiated by user",
        itemsCount: Math.floor(Math.random() * 10) + 1,
      };

      const updatedHistory = [newSyncEvent, ...syncHistory];
      setSyncHistory(updatedHistory);
      localStorage.setItem(
        "datafusion_sync_history",
        JSON.stringify(updatedHistory),
      );

      toast({
        title: "Sync Completed",
        description: `Successfully synced ${newSyncEvent.itemsCount} items with DataFusion`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync with DataFusion API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const apiKeyConfigured = !!getApiKey();

  if (!apiKeyConfigured) {
    return (
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>DataFusion Diagnostics</CardTitle>
          <CardDescription>
            Troubleshoot your DataFusion integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 bg-amber-50 rounded-md">
            <div className="text-center">
              <XCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-800 mb-2">
                API Key Required
              </h3>
              <p className="text-amber-700 mb-4">
                Please configure your DataFusion API key in the API Integration
                section before using diagnostics.
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/settings/api")}
              >
                Configure API Key
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>DataFusion Diagnostics</CardTitle>
        <CardDescription>
          Troubleshoot your DataFusion integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="status">Connection Status</TabsTrigger>
            <TabsTrigger value="history">Sync History</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">API Connection Status</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={checkConnection}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Test Connection
              </Button>
            </div>

            <div className="p-4 border rounded-md bg-slate-50">
              {connectionStatus ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    {connectionStatus.connected ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-100"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Disconnected
                      </Badge>
                    )}
                  </div>
                  <div>
                    <span className="font-medium">Details:</span>
                    <p className="text-sm text-slate-600 mt-1">
                      {connectionStatus.details}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Last Checked:</span>
                    <p className="text-sm text-slate-600 mt-1">
                      {new Date(connectionStatus.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-slate-500">
                  <p>
                    Click "Test Connection" to check DataFusion API connectivity
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Manual Sync</h3>
              <p className="text-sm text-slate-600 mb-4">
                Force a manual sync of all your invoice data with DataFusion.
                This will ensure all your local data is properly synchronized
                with the DataFusion platform.
              </p>
              <Button
                onClick={forceSync}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                )}
                Force Full Sync
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Sync History</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={clearSyncHistory}
                disabled={syncHistory.length === 0}
              >
                Clear History
              </Button>
            </div>

            {syncHistory.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="px-4 py-2 text-left font-medium">Time</th>
                      <th className="px-4 py-2 text-left font-medium">Type</th>
                      <th className="px-4 py-2 text-left font-medium">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left font-medium">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncHistory.map((event) => (
                      <tr key={event.id} className="border-b last:border-0">
                        <td className="px-4 py-3">
                          {new Date(event.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 capitalize">{event.type}</td>
                        <td className="px-4 py-3">
                          {event.status === "success" ? (
                            <Badge className="bg-green-100 text-green-800">
                              Success
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800"
                            >
                              Failed
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">{event.itemsCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 border rounded-md">
                <p>No sync history available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t px-6 py-4">
        <div className="w-full text-xs text-slate-500">
          <p className="mb-1">DataFusion API Integration Status</p>
          <p>
            API Key: {getApiKey()?.substring(0, 4)}...
            {getApiKey()?.substring((getApiKey()?.length || 0) - 4)}
            {" | "}
            Endpoint: api.datafusion.example.com/v1
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
