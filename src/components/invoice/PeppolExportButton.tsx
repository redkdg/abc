import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { preparePeppolInvoiceData } from "@/lib/peppol";
import { getCompany } from "@/lib/storage";

interface PeppolExportButtonProps {
  invoice: any;
  client: any;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const PeppolExportButton = ({
  invoice,
  client,
  variant = "outline",
  size = "sm",
}: PeppolExportButtonProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const company = getCompany();

  const handleExport = () => {
    try {
      // Prepare Peppol-compliant data
      const peppolData = preparePeppolInvoiceData(invoice, company, client);

      // Convert to XML string (simplified version - in a real app you'd use a proper XML library)
      const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>${peppolData.customizationID}</cbc:CustomizationID>
  <cbc:ProfileID>${peppolData.profileID}</cbc:ProfileID>
  <cbc:ID>${peppolData.id}</cbc:ID>
  <cbc:IssueDate>${peppolData.issueDate}</cbc:IssueDate>
  <cbc:DueDate>${peppolData.dueDate}</cbc:DueDate>
  <cbc:InvoiceTypeCode>${peppolData.invoiceTypeCode}</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>${peppolData.documentCurrencyCode}</cbc:DocumentCurrencyCode>
  <!-- More XML elements would be added here in a complete implementation -->
</Invoice>`;

      // Create a blob and download it
      const blob = new Blob([xmlString], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoice.invoiceNumber}_peppol.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: t("peppolExportSuccess"),
        description: t("peppolExportSuccessDescription"),
      });
    } catch (error) {
      console.error("Error exporting Peppol XML:", error);
      toast({
        title: t("peppolExportError"),
        description: t("peppolExportErrorDescription"),
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className="flex items-center gap-1"
      onClick={handleExport}
      title={t("exportPeppol")}
    >
      <Download className="h-4 w-4" />
      {t("exportPeppol")}
    </Button>
  );
};

export default PeppolExportButton;
