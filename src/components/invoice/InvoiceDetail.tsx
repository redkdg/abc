import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  Printer,
  Send,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  getTemplateSettings,
  getUserTemplateSettings,
  getCompany,
  getCurrencySymbol,
} from "@/lib/storage";
import PeppolExportButton from "./PeppolExportButton";
import DataFusionExportButton from "./DataFusionExportButton";

interface InvoiceDetailProps {
  invoice: any;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const statusColorMap = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  overdue: "bg-red-100 text-red-800",
};

const InvoiceDetail = ({
  invoice,
  onBack,
  onEdit,
  onDelete,
}: InvoiceDetailProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [companyData, setCompanyData] = useState<any>(null);
  const [templateSettings, setTemplateSettings] = useState<any>(null);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // Load company data and template settings when invoice changes
  useEffect(() => {
    if (invoice) {
      const company = getCompany();
      if (company) {
        setCompanyData(company);
      }

      // Get template settings for the invoice's template
      const templateId = invoice.templateId || "template-1";
      const settings = getUserTemplateSettings(templateId);
      setTemplateSettings(settings);

      // Get currency symbol
      const symbol = getCurrencySymbol();
      setCurrencySymbol(symbol);
    }
  }, [invoice]);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handlePreviewDownload = () => {
    // Show preview dialog
    setShowPreviewDialog(true);
  };

  const applyTemplateSettings = (element: HTMLElement, settings: any) => {
    if (!settings) return;

    // Apply colors
    if (settings.colors) {
      element.style.backgroundColor = settings.colors.background || "#ffffff";
      element.style.color = settings.colors.text || "#1f2937";

      // Find header elements and apply primary color
      const headers = element.querySelectorAll("h1, h2, h3, th");
      headers.forEach((header) => {
        (header as HTMLElement).style.color =
          settings.colors.primary || "#4f46e5";
      });

      // Apply secondary color to specific elements
      const secondaryElements = element.querySelectorAll(
        ".text-secondary, tfoot tr",
      );
      secondaryElements.forEach((el) => {
        (el as HTMLElement).style.color =
          settings.colors.secondary || "#f97316";
      });
    }

    // Apply fonts
    if (settings.fonts) {
      element.style.fontFamily = settings.fonts.body || "Inter";

      const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
        (heading as HTMLElement).style.fontFamily =
          settings.fonts.heading || "Inter";
      });
    }

    // Apply font sizes
    if (settings.fontSize) {
      element.style.fontSize = `${settings.fontSize.body || 14}px`;

      const headings = element.querySelectorAll("h1");
      headings.forEach((heading) => {
        (heading as HTMLElement).style.fontSize =
          `${settings.fontSize.heading || 24}px`;
      });

      const subheadings = element.querySelectorAll("h2, h3");
      subheadings.forEach((subheading) => {
        (subheading as HTMLElement).style.fontSize =
          `${settings.fontSize.subheading || 18}px`;
      });
    }

    // Apply margins
    if (settings.margins) {
      element.style.padding = `${settings.margins.top || 40}px ${settings.margins.right || 40}px ${settings.margins.bottom || 40}px ${settings.margins.left || 40}px`;
    }

    // Apply layout settings if available
    if (settings.layout) {
      // Handle logo visibility
      const logoElement = element.querySelector(".company-logo");
      if (logoElement) {
        (logoElement as HTMLElement).style.display = settings.layout.showLogo
          ? "block"
          : "none";
      }

      // Make sure logo is visible and has proper cross-origin setting
      const logoImg = element.querySelector("img");
      if (logoImg) {
        (logoImg as HTMLImageElement).crossOrigin = "anonymous";
      }

      // Apply invoice details position
      if (
        settings.layout.invoiceDetailsPosition === "custom" &&
        settings.layout.invoiceDetailsCustomPosition
      ) {
        const invoiceDetailsElement = element.querySelector(".invoice-details");
        if (invoiceDetailsElement) {
          (invoiceDetailsElement as HTMLElement).style.position = "absolute";
          (invoiceDetailsElement as HTMLElement).style.left =
            `${settings.layout.invoiceDetailsCustomPosition.x}%`;
          (invoiceDetailsElement as HTMLElement).style.top =
            `${settings.layout.invoiceDetailsCustomPosition.y}%`;
          (invoiceDetailsElement as HTMLElement).style.transform =
            "translate(-50%, -50%)";
          (invoiceDetailsElement as HTMLElement).style.background = "white";
          (invoiceDetailsElement as HTMLElement).style.padding = "8px";
          (invoiceDetailsElement as HTMLElement).style.borderRadius = "4px";
          (invoiceDetailsElement as HTMLElement).style.boxShadow =
            "0 1px 3px rgba(0,0,0,0.1)";
          (invoiceDetailsElement as HTMLElement).style.zIndex = "10";
        }
      }
    }
  };

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    try {
      // Close preview dialog if open
      setShowPreviewDialog(false);

      // Apply any pending styles and wait for them to be rendered
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get template settings if available
      const templateId = invoice.templateId || "template-1";
      const settings = getUserTemplateSettings(templateId);

      // Create a clone of the invoice element to apply styles without affecting the UI
      const invoiceClone = invoiceRef.current.cloneNode(true) as HTMLElement;
      document.body.appendChild(invoiceClone);
      invoiceClone.style.position = "absolute";
      invoiceClone.style.left = "-9999px";
      invoiceClone.style.width = `${invoiceRef.current.offsetWidth}px`;

      // Apply template settings to the cloned element
      applyTemplateSettings(invoiceClone, settings);

      // Make sure all currency symbols are correct
      const currencyElements =
        invoiceClone.querySelectorAll(".currency-symbol");
      currencyElements.forEach((element) => {
        element.textContent = currencySymbol;
      });

      // Replace all direct currency symbols in text nodes
      const replaceTextCurrency = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Replace any currency symbols with the correct one
          node.textContent =
            node.textContent?.replace(/[$€£¥₹]/g, currencySymbol) || "";
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(replaceTextCurrency);
        }
      };
      replaceTextCurrency(invoiceClone);

      // Apply template settings to the cloned document if available
      const canvas = await html2canvas(invoiceClone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: settings?.colors?.background || "#ffffff",
      });

      // Remove the clone after capturing
      document.body.removeChild(invoiceClone);

      // Create PDF from canvas
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);

      toast({
        title: t("invoiceDownloaded"),
        description: t("invoiceDownloadedDesc"),
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: t("errorGeneratingPdf"),
        description: t("errorGeneratingPdfDesc"),
        variant: "destructive",
      });
    }
  };

  const handleSendEmail = () => {
    // Implement email sending functionality
    toast({
      title: t("emailSent"),
      description: t("emailSentDesc"),
    });
  };

  // Merge company data with invoice data
  const mergedInvoiceData = {
    ...invoice,
    companyName: invoice.companyName || companyData?.name,
    companyAddress: invoice.companyAddress || companyData?.address,
    companyEmail: invoice.companyEmail || companyData?.email,
    companyPhone: invoice.companyPhone || companyData?.phone,
    companyLogo: invoice.companyLogo || companyData?.logo,
  };

  // Determine the layout for invoice details
  const invoiceDetailsPosition =
    templateSettings?.layout?.invoiceDetailsPosition || "top-right";
  const isCustomPosition = invoiceDetailsPosition === "custom";
  const customPosition = templateSettings?.layout
    ?.invoiceDetailsCustomPosition || { x: 50, y: 50 };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handlePreviewDownload}
          >
            <Download className="h-4 w-4" />
            {t("download")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            {t("print")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleSendEmail}
          >
            <Send className="h-4 w-4" />
            {t("send")}
          </Button>
          {/* Peppol Export Button */}
          {invoice.client && (
            <PeppolExportButton
              invoice={invoice}
              client={invoice.client}
              variant="outline"
              size="sm"
            />
          )}
          {/* DataFusion Export Button */}
          <DataFusionExportButton
            invoice={invoice}
            variant="outline"
            size="sm"
          />
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
            {t("edit")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            {t("delete")}
          </Button>
        </div>
      </div>

      {/* Invoice Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("invoicePreview")}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setShowPreviewDialog(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="p-4">
            <div
              ref={invoiceRef}
              id="invoice-preview"
              className="p-8 bg-white rounded-lg shadow-sm relative"
              style={{
                backgroundColor:
                  templateSettings?.colors?.background || "#ffffff",
                color: templateSettings?.colors?.text || "#1f2937",
                fontFamily: templateSettings?.fonts?.body || "Inter",
              }}
            >
              {/* Company Logo and Info */}
              <div className="flex justify-between mb-8">
                <div>
                  {mergedInvoiceData.companyLogo && (
                    <img
                      src={mergedInvoiceData.companyLogo}
                      alt="Company Logo"
                      className="company-logo h-16 mb-2"
                      style={{
                        display:
                          templateSettings?.layout?.showLogo === false
                            ? "none"
                            : "block",
                      }}
                    />
                  )}
                  <h1
                    className="text-2xl font-bold"
                    style={{
                      color: templateSettings?.colors?.primary || "#4f46e5",
                      fontFamily: templateSettings?.fonts?.heading || "Inter",
                      fontSize: `${templateSettings?.fontSize?.heading || 24}px`,
                    }}
                  >
                    {mergedInvoiceData.companyName || "Your Company"}
                  </h1>
                  <p>{mergedInvoiceData.companyAddress || "Company Address"}</p>
                  <p>
                    {mergedInvoiceData.companyEmail || "company@example.com"}
                  </p>
                  <p>{mergedInvoiceData.companyPhone || "+1 (555) 123-4567"}</p>
                </div>

                {/* Invoice Details - only show here if position is top-right */}
                {invoiceDetailsPosition === "top-right" && (
                  <div className="text-right invoice-details">
                    <h2
                      className="text-xl font-bold mb-2"
                      style={{
                        color: templateSettings?.colors?.primary || "#4f46e5",
                        fontFamily: templateSettings?.fonts?.heading || "Inter",
                        fontSize: `${templateSettings?.fontSize?.subheading || 18}px`,
                      }}
                    >
                      {t("invoice")}
                    </h2>
                    <p>
                      <span className="font-semibold">
                        {t("invoiceNumber")}:
                      </span>{" "}
                      {mergedInvoiceData.invoiceNumber || "INV-001"}
                    </p>
                    <p>
                      <span className="font-semibold">{t("date")}:</span>{" "}
                      {mergedInvoiceData.date ||
                        new Date().toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">{t("dueDate")}:</span>{" "}
                      {mergedInvoiceData.dueDate ||
                        new Date(
                          new Date().setDate(new Date().getDate() + 30),
                        ).toLocaleDateString()}
                    </p>
                    <Badge
                      className={cn(
                        "mt-2",
                        statusColorMap[
                          mergedInvoiceData.status as keyof typeof statusColorMap
                        ] || statusColorMap.pending,
                      )}
                    >
                      {mergedInvoiceData.status || "pending"}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Client Info */}
              <div className="mb-8">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: templateSettings?.colors?.primary || "#4f46e5",
                    fontFamily: templateSettings?.fonts?.heading || "Inter",
                    fontSize: `${templateSettings?.fontSize?.subheading || 18}px`,
                  }}
                >
                  {t("billTo")}
                </h3>
                <p className="font-medium">
                  {mergedInvoiceData.clientName || "Client Name"}
                </p>
                <p>{mergedInvoiceData.clientAddress || "Client Address"}</p>
                <p>{mergedInvoiceData.clientEmail || "client@example.com"}</p>
                <p>{mergedInvoiceData.clientPhone || "+1 (555) 987-6543"}</p>
              </div>

              {/* Invoice Details - if position is bottom or custom */}
              {(invoiceDetailsPosition === "bottom" || isCustomPosition) && (
                <div
                  className="invoice-details"
                  style={
                    isCustomPosition
                      ? {
                          position: "absolute",
                          left: `${customPosition.x}%`,
                          top: `${customPosition.y}%`,
                          transform: "translate(-50%, -50%)",
                          background: "white",
                          padding: "8px",
                          borderRadius: "4px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          zIndex: "10",
                        }
                      : { marginBottom: "20px" }
                  }
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                      color: templateSettings?.colors?.primary || "#4f46e5",
                      fontFamily: templateSettings?.fonts?.heading || "Inter",
                      fontSize: `${templateSettings?.fontSize?.subheading || 18}px`,
                    }}
                  >
                    {t("invoiceDetails")}
                  </h3>
                  <p>
                    <span className="font-semibold">{t("invoiceNumber")}:</span>{" "}
                    {mergedInvoiceData.invoiceNumber || "INV-001"}
                  </p>
                  <p>
                    <span className="font-semibold">{t("date")}:</span>{" "}
                    {mergedInvoiceData.date || new Date().toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">{t("dueDate")}:</span>{" "}
                    {mergedInvoiceData.dueDate ||
                      new Date(
                        new Date().setDate(new Date().getDate() + 30),
                      ).toLocaleDateString()}
                  </p>
                  <Badge
                    className={cn(
                      "mt-2",
                      statusColorMap[
                        mergedInvoiceData.status as keyof typeof statusColorMap
                      ] || statusColorMap.pending,
                    )}
                  >
                    {mergedInvoiceData.status || "pending"}
                  </Badge>
                </div>
              )}

              {/* Invoice Items */}
              <div className="mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr
                      className="border-b"
                      style={{
                        color: templateSettings?.colors?.primary || "#4f46e5",
                      }}
                    >
                      <th className="py-2 text-left">{t("item")}</th>
                      <th className="py-2 text-left">{t("description")}</th>
                      <th className="py-2 text-right">{t("quantity")}</th>
                      <th className="py-2 text-right">{t("price")}</th>
                      <th className="py-2 text-right">{t("amount")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mergedInvoiceData.items?.length > 0 ? (
                      mergedInvoiceData.items.map(
                        (item: any, index: number) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.description}</td>
                            <td className="py-2 text-right">{item.quantity}</td>
                            <td className="py-2 text-right">
                              <span className="currency-symbol">
                                {currencySymbol}
                              </span>
                              {parseFloat(item.price).toFixed(2)}
                            </td>
                            <td className="py-2 text-right">
                              <span className="currency-symbol">
                                {currencySymbol}
                              </span>
                              {(item.quantity * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ),
                      )
                    ) : (
                      <tr className="border-b">
                        <td className="py-2">Sample Item</td>
                        <td className="py-2">Description of the item</td>
                        <td className="py-2 text-right">1</td>
                        <td className="py-2 text-right">
                          <span className="currency-symbol">
                            {currencySymbol}
                          </span>
                          100.00
                        </td>
                        <td className="py-2 text-right">
                          <span className="currency-symbol">
                            {currencySymbol}
                          </span>
                          100.00
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot
                    style={{
                      color: templateSettings?.colors?.secondary || "#f97316",
                    }}
                  >
                    <tr>
                      <td colSpan={3}></td>
                      <td className="py-2 text-right font-semibold">
                        {t("subtotal")}:
                      </td>
                      <td className="py-2 text-right">
                        <span className="currency-symbol">
                          {currencySymbol}
                        </span>
                        {mergedInvoiceData.items?.length > 0
                          ? mergedInvoiceData.items
                              .reduce(
                                (sum: number, item: any) =>
                                  sum + item.quantity * item.price,
                                0,
                              )
                              .toFixed(2)
                          : "100.00"}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className="py-2 text-right font-semibold">
                        {t("tax")} ({mergedInvoiceData.taxRate || 10}%):
                      </td>
                      <td className="py-2 text-right">
                        <span className="currency-symbol">
                          {currencySymbol}
                        </span>
                        {mergedInvoiceData.items?.length > 0
                          ? (
                              (mergedInvoiceData.items.reduce(
                                (sum: number, item: any) =>
                                  sum + item.quantity * item.price,
                                0,
                              ) *
                                (mergedInvoiceData.taxRate || 10)) /
                              100
                            ).toFixed(2)
                          : "10.00"}
                      </td>
                    </tr>
                    <tr className="font-bold">
                      <td colSpan={3}></td>
                      <td className="py-2 text-right">{t("total")}:</td>
                      <td className="py-2 text-right">
                        <span className="currency-symbol">
                          {currencySymbol}
                        </span>
                        {mergedInvoiceData.items?.length > 0
                          ? (
                              mergedInvoiceData.items.reduce(
                                (sum: number, item: any) =>
                                  sum + item.quantity * item.price,
                                0,
                              ) *
                              (1 + (mergedInvoiceData.taxRate || 10) / 100)
                            ).toFixed(2)
                          : "110.00"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Notes */}
              <div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: templateSettings?.colors?.primary || "#4f46e5",
                    fontFamily: templateSettings?.fonts?.heading || "Inter",
                    fontSize: `${templateSettings?.fontSize?.subheading || 18}px`,
                  }}
                >
                  {t("notes")}
                </h3>
                <p className="text-sm text-gray-600">
                  {mergedInvoiceData.notes || "No notes provided."}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              {t("downloadPDF")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceDetail;
