import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getApiKey } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";
import { Upload, Loader2 } from "lucide-react";

export default function ExportDataButton() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const apiKeyConfigured = !!getApiKey();

  const handleExport = async () => {
    if (!apiKeyConfigured) {
      toast({
        title: "API Key Required",
        description: "Please configure your DataFusion API key in settings",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      // Simulate API call to export data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Data Exported Successfully",
        description: "Your invoice data has been exported to DataFusion",
        variant: "default",
      });
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

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting || !apiKeyConfigured}
      className="w-full justify-between"
      variant="outline"
    >
      <span>Export to DataFusion</span>
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Upload className="h-4 w-4" />
      )}
    </Button>
  );
}
