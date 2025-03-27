import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import AnalyticsOverview from "@/components/dashboard/AnalyticsOverview";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import QuickActions from "@/components/dashboard/QuickActions";
import { useLanguage } from "@/lib/LanguageContext";

interface DashboardProps {
  onCreateInvoice: () => void;
  onViewInvoice: (id: string) => void;
}

const Dashboard = ({ onCreateInvoice, onViewInvoice }: DashboardProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("dashboard")}</h1>
        <Button className="gap-2" onClick={onCreateInvoice}>
          <PlusCircle size={18} />
          <span>{t("newInvoice")}</span>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="invoices">{t("invoices")}</TabsTrigger>
          <TabsTrigger value="clients">{t("clients")}</TabsTrigger>
          <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentInvoices onViewInvoice={onViewInvoice} />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {t("invoiceReports")}
            </h2>
            <p className="text-muted-foreground">
              {t("invoiceReportsDescription")}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{t("clientReports")}</h2>
            <p className="text-muted-foreground">
              {t("clientReportsDescription")}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {t("financialReports")}
            </h2>
            <p className="text-muted-foreground">
              {t("financialReportsDescription")}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
