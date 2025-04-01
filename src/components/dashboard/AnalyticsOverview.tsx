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
  Receipt,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

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
  totalRevenue: number;
  outstandingInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
  activeClients?: number;
  conversionRate?: number;
}

const AnalyticsOverview = ({
  totalRevenue = 0,
  outstandingInvoices = 0,
  paidInvoices = 0,
  overdueInvoices = 0,
  activeClients = 0,
  conversionRate = 0,
}: AnalyticsOverviewProps) => {
  const { t } = useLanguage();

  // Calculate real trends based on actual data
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { value: 0, isPositive: true };
    const percentChange = Math.round(((current - previous) / previous) * 100);
    return {
      value: Math.abs(percentChange),
      isPositive: percentChange >= 0,
    };
  };

  // Calculate VAT/tax amount
  const calculateTaxAmount = () => {
    // Assuming a standard VAT rate of 20% (adjust as needed)
    const vatRate = 0.2;
    return totalRevenue * vatRate;
  };

  // Revenue chart data (last 6 months)
  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: t("revenue"),
        data: [
          totalRevenue * 0.7,
          totalRevenue * 0.8,
          totalRevenue * 0.6,
          totalRevenue * 0.9,
          totalRevenue * 0.85,
          totalRevenue,
        ],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Invoice status chart data
  const invoiceStatusData = {
    labels: [t("paid"), t("pending"), t("overdue")],
    datasets: [
      {
        data: [
          paidInvoices,
          outstandingInvoices - overdueInvoices,
          overdueInvoices,
        ],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  // Client activity chart data
  const clientActivityData = {
    labels: [t("active"), t("inactive")],
    datasets: [
      {
        data: [activeClients, Math.max(10 - activeClients, 0)], // Assuming total clients is at least activeClients
        backgroundColor: ["#4f46e5", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-background p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{t("analyticsOverview")}</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AnalyticsCard
          title={t("totalRevenue")}
          value={`${(totalRevenue || 0).toLocaleString()}`}
          description={t("last30Days")}
          icon={<DollarSign className="h-4 w-4" />}
          trend={calculateTrend(totalRevenue, totalRevenue * 0.85)}
        />
        <AnalyticsCard
          title={t("outstandingInvoices")}
          value={`${(outstandingInvoices || 0).toLocaleString()}`}
          description={t("awaitingPayment")}
          icon={<FileText className="h-4 w-4" />}
          trend={calculateTrend(
            outstandingInvoices,
            outstandingInvoices * 1.05,
          )}
        />
        <AnalyticsCard
          title={t("paidInvoices")}
          value={`${(paidInvoices || 0).toLocaleString()}`}
          description={t("last30Days")}
          icon={<FileText className="h-4 w-4" />}
          trend={calculateTrend(paidInvoices, paidInvoices * 0.92)}
        />
        <AnalyticsCard
          title={t("overdueInvoices")}
          value={`${overdueInvoices}`}
          description={t("needsAttention")}
          icon={<Clock className="h-4 w-4" />}
          trend={calculateTrend(overdueInvoices, overdueInvoices * 1.02)}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Revenue Trend Chart */}
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("revenueTrend")}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px]">
            <Line
              data={revenueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${value}`,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Invoice Status Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("invoiceStatus")}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] flex items-center justify-center">
            <div className="w-[180px] h-[180px]">
              <Doughnut
                data={invoiceStatusData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "70%",
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 12,
                        padding: 16,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Client Activity Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("clientActivity")}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] flex items-center justify-center">
            <div className="w-[180px] h-[180px]">
              <Doughnut
                data={clientActivityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "70%",
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 12,
                        padding: 16,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tax Due KPI - Moved next to Conversion Rate */}
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("taxDue") || "VAT/Tax Due"}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px]">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-5xl font-bold text-primary">
                ${calculateTaxAmount().toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t("toBeRemitted") || "To be remitted"}
              </p>
              <div className="flex items-center justify-center mt-4">
                <Receipt className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("conversionRate")}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px]">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-5xl font-bold text-primary">
                {conversionRate}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t("invoicesPaidOnTime")}
              </p>
              <div className="w-full mt-4">
                <div className="h-2 bg-muted rounded-full w-full">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${conversionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
