import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getIndustryBreakdownData, getApiKey } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";
import { Loader2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function DataFusionWidget() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiKeyConfigured = !!getApiKey();

  useEffect(() => {
    if (apiKeyConfigured) {
      fetchData();
    }
  }, [apiKeyConfigured]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getIndustryBreakdownData();
      setData(result.slice(0, 3)); // Only show top 3 industries
    } catch (err) {
      setError("Failed to fetch data from DataFusion API");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!apiKeyConfigured) {
    return (
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>DataFusion Integration</CardTitle>
          <CardDescription>Connect to your external data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              Connect your DataFusion account to see industry data
            </p>
            <Button asChild>
              <Link to="/settings">Configure API Key</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Industry Insights</CardTitle>
          <CardDescription>Data from DataFusion API</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/settings">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            <p>{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <p>No industry data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((industry, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div>
                  <p className="font-medium">{industry.industry}</p>
                  <p className="text-sm text-muted-foreground">
                    {industry.invoiceCount} invoices
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${industry.totalValue.toLocaleString()}
                  </p>
                  <div className="flex items-center text-sm">
                    <span
                      className={
                        industry.trend.direction === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {industry.trend.direction === "up" ? "+" : "-"}
                      {industry.trend.value}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
