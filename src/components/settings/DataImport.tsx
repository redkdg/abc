import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  importInvoiceData,
  importClientData,
  importItemData,
  getApiKey,
} from "@/lib/api";
import { Loader2, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DataImport() {
  const [isImportingInvoices, setIsImportingInvoices] = useState(false);
  const [isImportingClients, setIsImportingClients] = useState(false);
  const [isImportingItems, setIsImportingItems] = useState(false);

  const apiKeyConfigured = !!getApiKey();

  const handleImportInvoices = async () => {
    setIsImportingInvoices(true);
    try {
      await importInvoiceData();
    } finally {
      setIsImportingInvoices(false);
    }
  };

  const handleImportClients = async () => {
    setIsImportingClients(true);
    try {
      await importClientData();
    } finally {
      setIsImportingClients(false);
    }
  };

  const handleImportItems = async () => {
    setIsImportingItems(true);
    try {
      await importItemData();
    } finally {
      setIsImportingItems(false);
    }
  };

  if (!apiKeyConfigured) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white">
        <CardHeader>
          <CardTitle>Data Import</CardTitle>
          <CardDescription>Import data from DataFusion API</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API Key Required</AlertTitle>
            <AlertDescription>
              Please configure your DataFusion API key in the API Integration
              section before importing data.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle>DataFusion Import</CardTitle>
        <CardDescription>
          Import data from your DataFusion account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Available Data Sources</h3>
          <p className="text-sm text-muted-foreground">
            Select which data you want to import from DataFusion.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button
          className="w-full justify-between"
          onClick={handleImportInvoices}
          disabled={isImportingInvoices}
        >
          <span>Import Invoice Data</span>
          {isImportingInvoices ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </Button>

        <Button
          className="w-full justify-between"
          onClick={handleImportClients}
          disabled={isImportingClients}
        >
          <span>Import Regional Data</span>
          {isImportingClients ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </Button>

        <Button
          className="w-full justify-between"
          onClick={handleImportItems}
          disabled={isImportingItems}
        >
          <span>Import Industry Data</span>
          {isImportingItems ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
