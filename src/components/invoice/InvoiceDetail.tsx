import React, { useRef, useState } from "react";
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
import { getTemplateSettings } from "@/lib/storage";

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

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handlePreviewDownload = () => {
    // Show preview dialog
    setShowPreviewDialog(true);
  };

  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    try {
      // Close preview dialog if open
      setShowPreviewDialog(false);

      // Apply any pending styles and wait for them to be rendered
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get template settings if available
      const templateId = invoice.templateId || "template-1";
      const settings = getTemplateSettings(templateId);

      // Apply template settings to the cloned document if available
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: settings?.colors?.background || "#ffffff",
        onclone: (clonedDoc) => {
          // Ensure all styles are applied in the cloned document
          const clonedElement = clonedDoc.getElementById(
            invoiceRef.current?.id || "",
          );
          if (clonedElement) {
            clonedElement.style.width = `${invoiceRef.current?.offsetWidth}px`;

            // Apply template settings if available
            if (settings) {
              // Apply colors
              if (settings.colors) {
                clonedElement.style.backgroundColor =
                  settings.colors.background || "#ffffff";
                clonedElement.style.color = settings.colors.text || "#1f2937";

                // Find header elements and apply primary color
                const headers =
                  clonedElement.querySelectorAll("h1, h2, h3, th");
                headers.forEach((header) => {
                  header.style.color = settings.colors.primary || "#4f46e5";
                });

                // Apply secondary color to specific elements
                const secondaryElements = clonedElement.querySelectorAll(
                  ".text-secondary, tfoot tr",
                );
                secondaryElements.forEach((el) => {
                  el.style.color = settings.colors.secondary || "#f97316";
                });
              }

              // Apply fonts
              if (settings.fonts) {
                clonedElement.style.fontFamily = settings.fonts.body || "Inter";

                const headings = clonedElement.querySelectorAll(
                  "h1, h2, h3, h4, h5, h6",
                );
                headings.forEach((heading) => {
                  heading.style.fontFamily = settings.fonts.heading || "Inter";
                });
              }

              // Apply font sizes
              if (settings.fontSize) {
                clonedElement.style.fontSize = `${settings.fontSize.body || 14}px`;

                const headings = clonedElement.querySelectorAll("h1");
                headings.forEach((heading) => {
                  heading.style.fontSize = `${settings.fontSize.heading || 24}px`;
                });

                const subheadings = clonedElement.querySelectorAll("h2, h3");
                subheadings.forEach((subheading) => {
                  subheading.style.fontSize = `${settings.fontSize.subheading || 18}px`;
                });
              }

              // Apply margins
              if (settings.margins) {
                clonedElement.style.padding = `${settings.margins.top || 40}px ${settings.margins.right || 40}px ${settings.margins.bottom || 40}px ${settings.margins.left || 40}px`;
              }

              // Make sure logo is visible
              const logoImg = clonedElement.querySelector("img");
              if (logoImg) {
                logoImg.crossOrigin = "anonymous";
              }
            }
          }
        },
      });

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

  // Get template settings for display
  const templateId = invoice.templateId || "template-1";
  const templateSettings = getTemplateSettings(templateId);

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

      <Card>
        <CardContent className="p-6">
          <div
            id="invoice-detail"
            ref={invoiceRef}
            className="space-y-8 bg-white p-6"
            style={{
              backgroundColor:
                templateSettings?.colors?.background || "#ffffff",
              color: templateSettings?.colors?.text || "#1f2937",
              fontFamily: templateSettings?.fonts?.body || "Inter",
              fontSize: templateSettings?.fontSize?.body
                ? `${templateSettings.fontSize.body}px`
                : "14px",
              padding: templateSettings?.margins
                ? `${templateSettings.margins.top || 40}px ${templateSettings.margins.right || 40}px ${templateSettings.margins.bottom || 40}px ${templateSettings.margins.left || 40}px`
                : "40px",
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1
                  className="text-2xl font-bold"
                  style={{
                    color: templateSettings?.colors?.primary || "#4f46e5",
                    fontFamily: templateSettings?.fonts?.heading || "Inter",
                    fontSize: templateSettings?.fontSize?.heading
                      ? `${templateSettings.fontSize.heading}px`
                      : "24px",
                  }}
                >
                  {t("invoice")}
                </h1>
                <p className="text-gray-500">
                  {t("invoiceNumber")}: {invoice.invoiceNumber}
                </p>
                <p className="text-gray-500">
                  {t("date")}: {invoice.date}
                </p>
                <p className="text-gray-500">
                  {t("dueDate")}: {invoice.dueDate}
                </p>
                <div className="mt-2">
                  <Badge
                    className={cn(
                      statusColorMap[
                        invoice.status as keyof typeof statusColorMap
                      ],
                    )}
                  >
                    {t(invoice.status)}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                {invoice.companyLogo && (
                  <img
                    src={invoice.companyLogo}
                    alt="Company Logo"
                    className="h-16 mb-2 ml-auto"
                  />
                )}
                <h2
                  className="text-xl font-semibold"
                  style={{
                    color: templateSettings?.colors?.primary || "#4f46e5",
                    fontFamily: templateSettings?.fonts?.heading || "Inter",
                    fontSize: templateSettings?.fontSize?.subheading
                      ? `${templateSettings.fontSize.subheading}px`
                      : "18px",
                  }}
                >
                  {invoice.companyName}
                </h2>
                <p className="text-gray-500">{invoice.companyAddress}</p>
                <p className="text-gray-500">{invoice.companyEmail}</p>
                <p className="text-gray-500">{invoice.companyPhone}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: templateSettings?.colors?.primary || "#4f46e5",
                    fontFamily: templateSettings?.fonts?.heading || "Inter",
                    fontSize: templateSettings?.fontSize?.subheading
                      ? `${templateSettings.fontSize.subheading}px`
                      : "18px",
                  }}
                >
                  {t("billTo")}
                </h3>
                <p className="font-medium">
                  {invoice.client || invoice.clientName}
                </p>
                <p className="text-gray-500">{invoice.clientAddress}</p>
                <p className="text-gray-500">{invoice.clientEmail}</p>
                <p className="text-gray-500">{invoice.clientPhone}</p>
              </div>
              <div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: templateSettings?.colors?.primary || "#4f46e5",
                    fontFamily: templateSettings?.fonts?.heading || "Inter",
                    fontSize: templateSettings?.fontSize?.subheading
                      ? `${templateSettings.fontSize.subheading}px`
                      : "18px",
                  }}
                >
                  {t("paymentDetails")}
                </h3>
                <p className="text-gray-500">
                  <span className="font-medium">{t("paymentMethod")}:</span>{" "}
                  {invoice.paymentMethod || t("notSpecified")}
                </p>
                <p className="text-gray-500">
                  <span className="font-medium">{t("paymentTerms")}:</span>{" "}
                  {invoice.paymentTerms || invoice.terms || t("notSpecified")}
                </p>
              </div>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  color: templateSettings?.colors?.primary || "#4f46e5",
                  fontFamily: templateSettings?.fonts?.heading || "Inter",
                  fontSize: templateSettings?.fontSize?.subheading
                    ? `${templateSettings.fontSize.subheading}px`
                    : "18px",
                }}
              >
                {t("items")}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 text-left">{t("item")}</th>
                      <th className="py-2 text-left">{t("description")}</th>
                      <th className="py-2 text-right">{t("quantity")}</th>
                      <th className="py-2 text-right">{t("price")}</th>
                      <th className="py-2 text-right">{t("amount")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2">{item.name || ""}</td>
                        <td className="py-2">{item.description}</td>
                        <td className="py-2 text-right">{item.quantity}</td>
                        <td className="py-2 text-right">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: invoice.currency || "USD",
                          }).format(item.price || item.rate || 0)}
                        </td>
                        <td className="py-2 text-right">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: invoice.currency || "USD",
                          }).format(
                            item.amount ||
                              item.quantity * (item.price || item.rate || 0),
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-b border-gray-200">
                      <td colSpan={3}></td>
                      <td className="py-2 text-right font-medium">
                        {t("subtotal")}
                      </td>
                      <td className="py-2 text-right">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: invoice.currency || "USD",
                        }).format(invoice.subtotal)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td colSpan={3}></td>
                      <td className="py-2 text-right font-medium">
                        {t("tax")} ({invoice.taxRate || 10}%)
                      </td>
                      <td className="py-2 text-right">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: invoice.currency || "USD",
                        }).format(invoice.taxAmount || invoice.tax || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className="py-2 text-right font-bold">
                        {t("total")}
                      </td>
                      <td className="py-2 text-right font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: invoice.currency || "USD",
                        }).format(invoice.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {invoice.notes && (
              <div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: templateSettings?.colors?.primary || "#4f46e5",
                    fontFamily: templateSettings?.fonts?.heading || "Inter",
                    fontSize: templateSettings?.fontSize?.subheading
                      ? `${templateSettings.fontSize.subheading}px`
                      : "18px",
                  }}
                >
                  {t("notes")}
                </h3>
                <p className="text-gray-600">{invoice.notes}</p>
              </div>
            )}

            <div className="text-center text-gray-500 text-sm mt-8">
              <p>{t("thankYou")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("previewInvoice")}</DialogTitle>
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
            <div className="flex justify-end mb-4">
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                {t("downloadPdf")}
              </Button>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{t("invoice")}</h1>
                  <p className="text-gray-500">
                    {t("invoiceNumber")}: {invoice.invoiceNumber}
                  </p>
                  <p className="text-gray-500">
                    {t("date")}: {invoice.date}
                  </p>
                  <p className="text-gray-500">
                    {t("dueDate")}: {invoice.dueDate}
                  </p>
                  <div className="mt-2">
                    <Badge
                      className={cn(
                        statusColorMap[
                          invoice.status as keyof typeof statusColorMap
                        ],
                      )}
                    >
                      {t(invoice.status)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  {invoice.companyLogo && (
                    <img
                      src={invoice.companyLogo}
                      alt="Company Logo"
                      className="h-16 mb-2 ml-auto"
                    />
                  )}
                  <h2 className="text-xl font-semibold">
                    {invoice.companyName}
                  </h2>
                  <p className="text-gray-500">{invoice.companyAddress}</p>
                  <p className="text-gray-500">{invoice.companyEmail}</p>
                  <p className="text-gray-500">{invoice.companyPhone}</p>
                </div>
              </div>

              {/* Rest of the invoice preview content */}
              {/* This is a simplified version for the preview */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceDetail;
