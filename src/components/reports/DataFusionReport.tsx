import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAggregatedInvoiceData,
  getIndustryBreakdownData,
  getApiKey,
} from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";
import { Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DataFusionReport() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("day");
  const [dimension, setDimension] = useState("industry");
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiKeyConfigured = !!getApiKey();

  const fetchData = async () => {
    if (!apiKeyConfigured) {
      setError(
        "API key not configured. Please set up your DataFusion API key in Settings.",
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await getAggregatedInvoiceData(timeframe, dimension);
      setData(result);
    } catch (err) {
      setError("Failed to fetch data from DataFusion API");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeframe, dimension]);

  if (!apiKeyConfigured) {
    return (
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>DataFusion Integration</CardTitle>
          <CardDescription>Connect to your DataFusion account</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>API Key Required</AlertTitle>
            <AlertDescription>
              Please configure your DataFusion API key in the Settings page to
              view this report.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>DataFusion Integration</CardTitle>
          <CardDescription>
            Data imported from your DataFusion account
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dimension} onValueChange={setDimension}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Dimension" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="industry">Industry</SelectItem>
              <SelectItem value="region">Region</SelectItem>
              <SelectItem value="source">Source</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={fetchData}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No data available for the selected criteria
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-2 px-4 text-left font-medium">
                      Metric Type
                    </th>
                    <th className="py-2 px-4 text-left font-medium">
                      Dimension
                    </th>
                    <th className="py-2 px-4 text-left font-medium">Value</th>
                    <th className="py-2 px-4 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{item.metricType}</td>
                      <td className="py-2 px-4">{item.dimensionValue}</td>
                      <td className="py-2 px-4">{item.metricValue}</td>
                      <td className="py-2 px-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-muted-foreground">
              Data sourced from DataFusion API. Last updated:{" "}
              {new Date().toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
