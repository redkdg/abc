import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  DollarSign,
  FileText,
  PieChart,
  RefreshCw,
  Users,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface AnalyticsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const AnalyticsCard = ({
  title = "Metric",
  value = "$0",
  description = "No data available",
  icon = <DollarSign className="h-4 w-4" />,
  trend,
  className,
}: AnalyticsCardProps) => {
  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-2 flex items-center text-xs">
          {trend && (
            <span
              className={cn(
                "mr-1 flex items-center",
                trend.isPositive ? "text-green-500" : "text-red-500",
              )}
            >
              {trend.isPositive ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {Math.abs(trend.value)}%
            </span>
          )}
          <span className="text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface AnalyticsOverviewProps {
  data?: {
    totalRevenue: number;
    outstandingInvoices: number;
    paidInvoices: number;
    overdueInvoices: number;
    averagePaymentTime: number;
    clientCount: number;
    invoiceCount: number;
    conversionRate: number;
  };
}

const AnalyticsOverview = ({ data }: AnalyticsOverviewProps) => {
  const { t } = useLanguage();

  // Default mock data if none provided
  const analytics = data || {
    totalRevenue: 24580,
    outstandingInvoices: 12450,
    paidInvoices: 18750,
    overdueInvoices: 3200,
    averagePaymentTime: 14,
    clientCount: 24,
    invoiceCount: 156,
    conversionRate: 68,
  };

  return (
    <div className="bg-background p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{t("analyticsOverview")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title={t("totalRevenue")}
          value={`$${analytics.totalRevenue.toLocaleString()}`}
          description={t("last30Days")}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <AnalyticsCard
          title={t("outstandingInvoices")}
          value={`$${analytics.outstandingInvoices.toLocaleString()}`}
          description={t("awaitingPayment")}
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 5, isPositive: false }}
        />
        <AnalyticsCard
          title={t("paidInvoices")}
          value={`$${analytics.paidInvoices.toLocaleString()}`}
          description={t("last30Days")}
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <AnalyticsCard
          title={t("overdueInvoices")}
          value={`$${analytics.overdueInvoices.toLocaleString()}`}
          description={t("needsAttention")}
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 2, isPositive: false }}
        />
        <AnalyticsCard
          title={t("averagePaymentTime")}
          value={`${analytics.averagePaymentTime} ${t("days")}`}
          description={t("fromInvoiceSent")}
          icon={<RefreshCw className="h-4 w-4" />}
          trend={{ value: 3, isPositive: true }}
        />
        <AnalyticsCard
          title={t("activeClients")}
          value={analytics.clientCount.toString()}
          description={t("totalClientBase")}
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 4, isPositive: true }}
        />
        <AnalyticsCard
          title={t("totalInvoices")}
          value={analytics.invoiceCount.toString()}
          description={t("allTime")}
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 7, isPositive: true }}
        />
        <AnalyticsCard
          title={t("conversionRate")}
          value={`${analytics.conversionRate}%`}
          description={t("invoicesPaidOnTime")}
          icon={<PieChart className="h-4 w-4" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>
    </div>
  );
};

export default AnalyticsOverview;
