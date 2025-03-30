import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import AnalyticsOverview from "@/components/dashboard/AnalyticsOverview";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import QuickActions from "@/components/dashboard/QuickActions";
import { useLanguage } from "@/lib/LanguageContext";
import { getInvoices, getClients } from "@/lib/storage";

interface DashboardProps {
  onCreateInvoice: () => void;
  onViewInvoice: (id: string) => void;
}

const Dashboard = ({ onCreateInvoice, onViewInvoice }: DashboardProps) => {
  const { t } = useLanguage();
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    outstandingInvoices: 0,
    paidInvoices: 0,
    overdueInvoices: 0,
    invoices: [],
    activeClients: 0,
    conversionRate: 0,
  });

  // Load real data from storage
  useEffect(() => {
    const invoices = getInvoices();
    const clients = getClients();

    // Calculate dashboard metrics from real invoice data
    const totalRevenue = invoices.reduce(
      (sum, inv) => sum + (inv.total || 0),
      0,
    );

    // Get invoice counts by status
    const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;
    const pendingInvoices = invoices.filter(
      (inv) => inv.status === "pending",
    ).length;
    const overdueInvoices = invoices.filter(
      (inv) => inv.status === "overdue",
    ).length;

    // Calculate active clients (clients with at least one invoice)
    // If client doesn't have invoiceCount property, check if they have any invoices
    const activeClients = clients.filter((client) => {
      if (client.invoiceCount !== undefined) return client.invoiceCount > 0;
      // Alternative calculation if invoiceCount is not available
      const clientInvoices = invoices.filter(
        (inv) => inv.clientId === client.id || inv.client === client.name,
      );
      return clientInvoices.length > 0;
    }).length;

    // Calculate conversion rate (paid invoices / total invoices)
    const conversionRate =
      invoices.length > 0
        ? Math.round((paidInvoices / invoices.length) * 100)
        : 0;

    // Sort invoices by date (newest first) for the recent invoices list
    const sortedInvoices = [...invoices].sort((a, b) => {
      const dateA = new Date(a.issueDate || a.date || 0);
      const dateB = new Date(b.issueDate || b.date || 0);
      return dateB.getTime() - dateA.getTime();
    });

    setDashboardData({
      totalRevenue,
      outstandingInvoices: pendingInvoices + overdueInvoices,
      paidInvoices,
      overdueInvoices,
      invoices: sortedInvoices,
      activeClients,
      conversionRate,
    });
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
        <Button onClick={onCreateInvoice}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("newInvoice")}
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AnalyticsOverview
                totalRevenue={dashboardData.totalRevenue}
                outstandingInvoices={dashboardData.outstandingInvoices}
                paidInvoices={dashboardData.paidInvoices}
                overdueInvoices={dashboardData.overdueInvoices}
                activeClients={dashboardData.activeClients}
                conversionRate={dashboardData.conversionRate}
              />
            </div>
            <div>
              <QuickActions onCreateInvoice={onCreateInvoice} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <RecentInvoices
              invoices={dashboardData.invoices.slice(0, 5)}
              onViewInvoice={onViewInvoice}
            />
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t("invoiceReports")}
              </h2>
              <p className="text-muted-foreground">
                {t("invoiceReportsDescription")}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t("clientReports")}
              </h2>
              <p className="text-muted-foreground">
                {t("clientReportsDescription")}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t("financialReports")}
              </h2>
              <p className="text-muted-foreground">
                {t("financialReportsDescription")}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
