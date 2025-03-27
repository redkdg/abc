import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Printer, Send, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    try {
      const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(t("errorGeneratingPDF"));
    }
  };

  const handleSend = () => {
    // In a real app, this would open an email dialog
    alert(t("emailSent"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        {t("back")}
      </Button>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {t("invoice")} {invoice.invoiceNumber}
          </h1>
          <Badge
            variant="outline"
            className={cn("capitalize text-sm", statusColorMap[invoice.status])}
          >
            {t(invoice.status)}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onEdit}
          >
            <Edit size={16} />
            {t("edit")}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer size={16} />
            {t("print")}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleDownload}
          >
            <Download size={16} />
            {t("download")}
          </Button>
          <Button className="flex items-center gap-2" onClick={handleSend}>
            <Send size={16} />
            {t("send")}
          </Button>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={onDelete}
          >
            <Trash2 size={16} />
            {t("delete")}
          </Button>
        </div>
      </div>

      <div ref={invoiceRef}>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-muted-foreground mb-2">
                  {t("from")}
                </h3>
                <p className="font-bold mb-1">InvoiceGen</p>
                <p>123 Business Street</p>
                <p>Suite 100</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
                <p className="mt-2">contact@invoicegen.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground mb-2">
                  {t("to")}
                </h3>
                <p className="font-bold mb-1">{invoice.client}</p>
                <p>Client Address Line 1</p>
                <p>Client Address Line 2</p>
                <p>City, State Zip</p>
                <p>Country</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 border-t pt-6">
              <div>
                <h3 className="font-semibold text-muted-foreground mb-1">
                  {t("invoiceNumber")}
                </h3>
                <p>{invoice.invoiceNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground mb-1">
                  {t("issueDate")}
                </h3>
                <p>{invoice.issueDate}</p>
              </div>
              <div>
                <h3 className="font-semibold text-muted-foreground mb-1">
                  {t("dueDate")}
                </h3>
                <p>{invoice.dueDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">{t("description")}</th>
                  <th className="text-right py-3">{t("quantity")}</th>
                  <th className="text-right py-3">{t("rate")}</th>
                  <th className="text-right py-3">{t("amount")}</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      {item.description || t("itemDescription")}
                    </td>
                    <td className="text-right py-3">{item.quantity}</td>
                    <td className="text-right py-3">
                      ${Number(item.rate).toFixed(2)}
                    </td>
                    <td className="text-right py-3">
                      ${Number(item.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("tax")} (10%)</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>{t("total")}</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {(invoice.notes || invoice.terms) && (
          <Card>
            <CardContent className="p-6 space-y-4">
              {invoice.notes && (
                <div>
                  <h3 className="font-semibold mb-2">{t("notes")}</h3>
                  <p className="text-muted-foreground">{invoice.notes}</p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h3 className="font-semibold mb-2">{t("terms")}</h3>
                  <p className="text-muted-foreground">{invoice.terms}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetail;
