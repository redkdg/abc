import React, { useState, useEffect } from "react";
import InvoiceList from "@/components/invoice/InvoiceList";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceDetail from "@/components/invoice/InvoiceDetail";
import InvoiceGenerator from "@/components/invoice/InvoiceGenerator";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { getCompany } from "@/lib/storage";

type View = "list" | "create" | "detail" | "generator";

interface InvoicesPageProps {
  invoices: any[];
  setInvoices: React.Dispatch<React.SetStateAction<any[]>>;
}

const InvoicesPage = ({ invoices, setInvoices }: InvoicesPageProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [view, setView] = useState<View>("list");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);

  // Check URL parameters for actions
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    const id = params.get("id");

    if (action === "create") {
      handleCreateInvoice();
    } else if (action === "view" && id) {
      handleViewInvoice(id);
    }

    // Load company data
    const company = getCompany();
    if (company) {
      setCompanyData(company);
    }
  }, []);

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setView("create");
  };

  const handleOpenGenerator = () => {
    setView("generator");
  };

  const handleViewInvoice = (id: string) => {
    const invoice = invoices.find((inv) => inv.id === id);
    if (invoice) {
      setSelectedInvoice(invoice);
      setView("detail");
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "paid" | "pending" | "overdue",
    updatedInvoices: any[],
  ) => {
    // Import the DataFusion sync function
    const { syncInvoiceToDataFusion, showSyncSuccessToast } = await import(
      "@/lib/datafusion"
    );

    setInvoices(updatedInvoices);

    // Find the updated invoice
    const updatedInvoice = updatedInvoices.find((inv) => inv.id === id);

    // If the status changed invoice is currently selected, update it
    if (selectedInvoice && selectedInvoice.id === id) {
      setSelectedInvoice({
        ...selectedInvoice,
        status: newStatus,
      });
    }

    toast({
      title: t("statusUpdated"),
      description: t("statusUpdatedDescription"),
    });

    // Sync status change to DataFusion
    if (updatedInvoice) {
      const syncSuccess = await syncInvoiceToDataFusion(
        updatedInvoice,
        "update",
      );
      if (syncSuccess) {
        showSyncSuccessToast(updatedInvoice, "update");
      }
    }
  };

  const handleSaveInvoice = async (invoice: any) => {
    // Import the DataFusion sync function
    const { syncInvoiceToDataFusion, showSyncSuccessToast } = await import(
      "@/lib/datafusion"
    );

    // Check if we're updating an existing invoice
    if (selectedInvoice) {
      const updatedInvoice = { ...invoice };
      setInvoices(
        invoices.map((inv) =>
          inv.id === selectedInvoice.id ? updatedInvoice : inv,
        ),
      );
      toast({
        title: t("invoiceUpdated"),
        description: t("invoiceUpdatedDescription"),
      });

      // Automatically sync to DataFusion
      const syncSuccess = await syncInvoiceToDataFusion(
        updatedInvoice,
        "update",
      );
      if (syncSuccess) {
        showSyncSuccessToast(updatedInvoice, "update");
      }
    } else {
      // Add a new invoice with a unique ID
      const newInvoice = {
        ...invoice,
        id: `invoice-${Date.now()}`,
      };
      setInvoices([newInvoice, ...invoices]);
      toast({
        title: t("invoiceCreated"),
        description: t("invoiceCreatedDescription"),
      });

      // Automatically sync to DataFusion
      const syncSuccess = await syncInvoiceToDataFusion(newInvoice, "create");
      if (syncSuccess) {
        showSyncSuccessToast(newInvoice, "create");
      }
    }
    setView("list");
  };

  const handleDeleteInvoice = async (id: string) => {
    // Import the DataFusion sync function
    const { syncInvoiceToDataFusion, showSyncSuccessToast } = await import(
      "@/lib/datafusion"
    );

    // Find the invoice before deleting it
    const invoiceToDelete = invoices.find((inv) => inv.id === id);

    if (invoiceToDelete) {
      // Sync deletion to DataFusion before removing from local state
      const syncSuccess = await syncInvoiceToDataFusion(
        invoiceToDelete,
        "delete",
      );

      // Remove from local state
      setInvoices(invoices.filter((inv) => inv.id !== id));

      toast({
        title: t("invoiceDeleted"),
        description: t("invoiceDeletedDescription"),
      });

      if (syncSuccess) {
        showSyncSuccessToast(invoiceToDelete, "delete");
      }
    }
  };

  const handleCancel = () => {
    setSelectedInvoice(null);
    setView("list");
  };

  return (
    <div>
      {view === "list" && (
        <InvoiceList
          invoices={invoices}
          onCreateInvoice={handleCreateInvoice}
          onViewInvoice={handleViewInvoice}
          onDeleteInvoice={handleDeleteInvoice}
          onOpenGenerator={handleOpenGenerator}
          onStatusChange={handleStatusChange}
        />
      )}

      {view === "create" && (
        <InvoiceForm
          invoice={selectedInvoice}
          onSave={handleSaveInvoice}
          onCancel={handleCancel}
        />
      )}

      {view === "detail" && selectedInvoice && (
        <InvoiceDetail
          invoice={selectedInvoice}
          onBack={handleCancel}
          onEdit={() => setView("create")}
          onDelete={() => {
            handleDeleteInvoice(selectedInvoice.id);
            setView("list");
          }}
        />
      )}

      {view === "generator" && (
        <InvoiceGenerator
          onSave={(invoice) => {
            setInvoices([invoice, ...invoices]);
            toast({
              title: t("invoiceCreated"),
              description: t("invoiceCreatedDescription"),
            });
            setView("list");
          }}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default InvoicesPage;
