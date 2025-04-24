import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getApiKey, validateApiKey, saveApiKey } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { syncInvoiceToDataFusion } from "@/lib/datafusion";

interface DataFusionExportButtonProps {
  invoice: any;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function DataFusionExportButton({
  invoice,
  variant = "outline",
  size = "sm",
}: DataFusionExportButtonProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleExport = async () => {
    const storedApiKey = getApiKey();

    if (!storedApiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsExporting(true);
    try {
      // Use the shared sync function for consistency
      const syncSuccess = await syncInvoiceToDataFusion(invoice, "update");

      if (syncSuccess) {
        toast({
          title: "Data Exported Successfully",
          description: `Invoice #${invoice.invoiceNumber} has been exported to DataFusion`,
          variant: "default",
        });
      } else {
        throw new Error("Sync failed");
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data to DataFusion",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your DataFusion API key",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      // For demo purposes, accept any API key
      // In production, you would validate with your actual API
      saveApiKey(apiKey);

      toast({
        title: "API Key Saved",
        description: "Your DataFusion API key has been saved",
        variant: "default",
      });

      setShowApiKeyDialog(false);
      // Proceed with export after saving API key
      setTimeout(() => handleExport(), 500);
    } catch (error) {
      toast({
        title: "Error Saving API Key",
        description: "Failed to save your API key",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className="flex items-center gap-1"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        Export to DataFusion
      </Button>

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>DataFusion API Key Required</DialogTitle>
            <DialogDescription>
              Please enter your DataFusion API key to export invoice data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="Enter your DataFusion API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="bg-amber-50 p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Important Note</p>
                <p>
                  For this demo, any API key will be accepted. In a production
                  environment, you would need a valid API key from your
                  DataFusion account.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApiKeyDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveApiKey} disabled={isValidating}>
              {isValidating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Save & Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
