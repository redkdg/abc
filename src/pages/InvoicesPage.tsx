import React, { useState } from "react";
import InvoiceList from "@/components/invoice/InvoiceList";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceDetail from "@/components/invoice/InvoiceDetail";
import InvoiceGenerator from "@/components/invoice/InvoiceGenerator";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

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

  const handleSaveInvoice = (invoice: any) => {
    // Check if we're updating an existing invoice
    if (selectedInvoice) {
      setInvoices(
        invoices.map((inv) => (inv.id === selectedInvoice.id ? invoice : inv)),
      );
      toast({
        title: t("invoiceUpdated"),
        description: t("invoiceUpdatedDescription"),
      });
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
    }
    setView("list");
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
    toast({
      title: t("invoiceDeleted"),
      description: t("invoiceDeletedDescription"),
    });
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
