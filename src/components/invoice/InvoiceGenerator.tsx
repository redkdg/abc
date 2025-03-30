import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Eye, Download, Save } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  getCompany,
  getSelectedTemplate,
  getTemplateSettings,
  getClients,
  getItems,
} from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  items: LineItem[];
  notes: string;
  terms: string;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  status: "pending" | "paid" | "overdue";
  templateId?: string;
}

interface InvoiceGeneratorProps {
  onSave?: (invoice: any) => void;
  onCancel?: () => void;
}

const InvoiceGenerator = ({ onSave, onCancel }: InvoiceGeneratorProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const invoicePreviewRef = useRef<HTMLDivElement>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [savedClients, setSavedClients] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<any[]>([]);

  const [invoice, setInvoice] = useState<InvoiceData>({
    id: Date.now().toString(),
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    client: "",
    clientAddress: "",
    clientEmail: "",
    clientPhone: "",
    companyName: "InvoiceGen",
    companyAddress: "123 Business Street, Suite 100, New York, NY 10001",
    companyEmail: "contact@invoicegen.com",
    companyPhone: "+1 (555) 123-4567",
    items: [
      {
        id: "1",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ],
    notes: "",
    terms: "Payment due within 30 days",
    subtotal: 0,
    tax: 0,
    taxRate: 10,
    total: 0,
    status: "pending",
  });

  // Load company data, selected template, clients and items on component mount
  useEffect(() => {
    const company = getCompany();
    const template = getSelectedTemplate();
    const clients = getClients();
    const items = getItems();

    if (company) {
      setCompanyData(company);
      setInvoice((prev) => ({
        ...prev,
        companyName: company.name,
        companyAddress: company.address,
        companyEmail: company.email,
        companyPhone: company.phone,
      }));
    }

    if (template) {
      setSelectedTemplateId(template);
      setInvoice((prev) => ({
        ...prev,
        templateId: template,
      }));
    }

    if (clients && clients.length > 0) {
      setSavedClients(clients);
    }

    if (items && items.length > 0) {
      setSavedItems(items);
    }
  }, []);

  // Calculate totals whenever items or tax rate changes
  useEffect(() => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (invoice.taxRate / 100);
    const total = subtotal + tax;

    setInvoice((prev) => ({
      ...prev,
      subtotal,
      tax,
      total,
    }));
  }, [invoice.items, invoice.taxRate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClientChange = (value: string) => {
    // Find the client details from saved clients
    const clientDetails = savedClients.find(
      (client) => client.name === value || client === value,
    );

    if (clientDetails && typeof clientDetails === "object") {
      setInvoice((prev) => ({
        ...prev,
        client: value,
        clientAddress: clientDetails.address || "",
        clientEmail: clientDetails.email || "",
        clientPhone: clientDetails.phone || "",
      }));
    } else {
      setInvoice((prev) => ({
        ...prev,
        client: value,
      }));
    }
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taxRate = parseFloat(e.target.value) || 0;
    setInvoice((prev) => ({
      ...prev,
      taxRate,
    }));
  };

  const addLineItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now().toString(),
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
    }));
  };

  const addSavedItem = (item: any) => {
    const newItem = {
      id: Date.now().toString(),
      description: item.description || item.name,
      quantity: 1,
      rate: item.price || item.rate || 0,
      amount: item.price || item.rate || 0,
    };

    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeLineItem = (id: string) => {
    if (invoice.items.length <= 1) return;

    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleItemChange = (
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) => {
    setInvoice((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }

          return updatedItem;
        }
        return item;
      });

      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const saveInvoice = () => {
    // Prepare the invoice with amount field for dashboard tracking
    const finalInvoice = {
      ...invoice,
      date: invoice.date,
      status: "pending",
      amount: invoice.total, // Add amount field for consistency with other invoices
      templateId: selectedTemplateId || getSelectedTemplate() || "template-1", // Ensure template ID is saved
    };

    if (onSave) {
      onSave(finalInvoice);
      return;
    }

    // Get existing invoices from localStorage
    const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");

    // Add the current invoice
    savedInvoices.push(finalInvoice);

    // Save back to localStorage
    localStorage.setItem("invoices", JSON.stringify(savedInvoices));

    // Generate a new invoice ID and number for the next invoice
    setInvoice((prev) => ({
      ...prev,
      id: Date.now().toString(),
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
    }));

    // Show toast notification with client name if available
    if (invoice.client) {
      toast({
        title: t("invoiceSaved"),
        description: t("invoiceSavedForClient").replace(
          "{client}",
          invoice.client,
        ),
        variant: "default",
      });
    } else {
      toast({
        title: t("invoiceSaved"),
        description: t("invoiceSavedDescription"),
        variant: "default",
      });
    }
  };

  const generatePDF = async () => {
    if (!invoicePreviewRef.current) return;

    try {
      // Apply any pending styles and wait for them to be rendered
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get template settings if available
      const templateId =
        invoice.templateId ||
        selectedTemplateId ||
        getSelectedTemplate() ||
        "template-1";

      // Use the getTemplateSettings function to get settings
      const settings = getTemplateSettings(templateId);

      // Use html2canvas to capture the invoice preview with template settings
      const canvas = await html2canvas(invoicePreviewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: settings?.colors?.background || "#ffffff",
        onclone: (clonedDoc) => {
          // Ensure all styles are applied in the cloned document
          const clonedElement = clonedDoc.getElementById(
            invoicePreviewRef.current?.id || "",
          );
          if (clonedElement) {
            clonedElement.style.width = `${invoicePreviewRef.current?.offsetWidth}px`;

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
                logoImg.style.maxHeight = "64px";
                logoImg.style.maxWidth = "200px";
              }
            }
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF with jsPDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();

      // Calculate dimensions to maintain aspect ratio
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Add language-specific filename
      const invoiceText = t("invoice");
      pdf.save(`${invoiceText}_${invoice.invoiceNumber}.pdf`);

      // Show success notification
      toast({
        title: t("pdfGenerated"),
        description: t("pdfGeneratedDescription"),
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: t("errorGeneratingPDF"),
        description: String(error),
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setInvoice({
      id: Date.now().toString(),
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      client: "",
      clientAddress: "",
      clientEmail: "",
      clientPhone: "",
      companyName: companyData?.name || "InvoiceGen",
      companyAddress:
        companyData?.address ||
        "123 Business Street, Suite 100, New York, NY 10001",
      companyEmail: companyData?.email || "contact@invoicegen.com",
      companyPhone: companyData?.phone || "+1 (555) 123-4567",
      items: [
        {
          id: "1",
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
      notes: "",
      terms: "Payment due within 30 days",
      subtotal: 0,
      tax: 0,
      taxRate: 10,
      total: 0,
      status: "pending",
      templateId: selectedTemplateId || getSelectedTemplate() || "template-1", // Preserve template ID on reset
    });
  };

  // Get template settings for the preview
  const getTemplateSettingsForPreview = () => {
    const templateId =
      invoice.templateId ||
      selectedTemplateId ||
      getSelectedTemplate() ||
      "template-1";
    return getTemplateSettings(templateId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("createNewInvoice")}</h1>
        <div className="flex gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              {t("cancel")}
            </Button>
          )}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Eye size={16} />
                {t("preview")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t("invoicePreview")}</DialogTitle>
              </DialogHeader>
              <div
                id="invoice-preview"
                ref={invoicePreviewRef}
                className="bg-white p-6 rounded-lg"
              >
                {/* Get template settings */}
                {(() => {
                  // Get company data
                  const companyData = getCompany() || {};
                  const settings = getTemplateSettingsForPreview();

                  // Default layout if no settings found
                  const layout = settings?.layout || {
                    logoPosition: "top-left",
                    companyInfoPosition: "top-left",
                    clientInfoPosition: "top-right",
                    invoiceDetailsPosition: "top-right",
                    invoiceDetailsCustomPosition: { x: 50, y: 50 },
                    showLogo: true,
                  };

                  return (
                    <>
                      {/* Logo Section */}
                      {layout.showLogo && (
                        <div
                          className={`flex ${layout.logoPosition === "top-center" ? "justify-center" : layout.logoPosition === "top-right" ? "justify-end" : "justify-start"} mb-6`}
                        >
                          <div className="h-16 w-auto">
                            <img
                              src={
                                companyData?.logo ||
                                "https://api.dicebear.com/7.x/initials/svg?seed=InvoiceGen"
                              }
                              alt="Company Logo"
                              className="h-full w-auto object-contain"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-8">
                        {/* Company Info */}
                        <div
                          className={
                            layout.companyInfoPosition === "top-right"
                              ? "order-2"
                              : "order-1"
                          }
                        >
                          <h2 className="text-xl font-bold">
                            {invoice.companyName}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {invoice.companyAddress}
                          </p>
                          <p className="text-sm text-gray-600">
                            {invoice.companyEmail}
                          </p>
                          <p className="text-sm text-gray-600">
                            {invoice.companyPhone}
                          </p>
                        </div>

                        {/* Invoice Details */}
                        {layout.invoiceDetailsPosition === "top-right" && (
                          <div className="text-right">
                            <h1 className="text-2xl font-bold text-gray-800">
                              {t("invoice")}
                            </h1>
                            <p className="text-lg"># {invoice.invoiceNumber}</p>
                            <p className="text-sm text-gray-600">
                              {t("date")}: {invoice.date}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t("dueDate")}: {invoice.dueDate}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}

                {/* Client Info and Invoice Details (if bottom) */}
                {(() => {
                  const settings = getTemplateSettingsForPreview();

                  // Default layout if no settings found
                  const layout = settings?.layout || {
                    logoPosition: "top-left",
                    companyInfoPosition: "top-left",
                    clientInfoPosition: "top-right",
                    invoiceDetailsPosition: "top-right",
                    invoiceDetailsCustomPosition: { x: 50, y: 50 },
                    showLogo: true,
                  };

                  return (
                    <>
                      <div
                        className={`grid ${layout.clientInfoPosition === "bottom" ? "grid-cols-1" : "grid-cols-2"} gap-8 mb-8`}
                      >
                        {/* Client Info */}
                        <div
                          className={
                            layout.clientInfoPosition === "top-left"
                              ? "order-1"
                              : "order-2"
                          }
                        >
                          <h3 className="font-semibold mb-2">{t("billTo")}</h3>
                          <p className="font-medium">{invoice.client}</p>
                          <p className="text-sm text-gray-600">
                            {invoice.clientAddress}
                          </p>
                          <p className="text-sm text-gray-600">
                            {invoice.clientEmail}
                          </p>
                          <p className="text-sm text-gray-600">
                            {invoice.clientPhone}
                          </p>
                        </div>

                        {/* Invoice Details (if bottom or custom position) */}
                        {(layout.invoiceDetailsPosition === "bottom" ||
                          layout.invoiceDetailsPosition === "custom") && (
                          <div
                            className={
                              layout.invoiceDetailsPosition === "custom"
                                ? "absolute"
                                : layout.clientInfoPosition === "bottom"
                                  ? "mt-4"
                                  : ""
                            }
                            style={
                              layout.invoiceDetailsPosition === "custom"
                                ? {
                                    left: `${layout.invoiceDetailsCustomPosition?.x || 50}%`,
                                    top: `${layout.invoiceDetailsCustomPosition?.y || 50}%`,
                                    transform: "translate(-50%, -50%)",
                                    background: "white",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    zIndex: 10,
                                  }
                                : {}
                            }
                          >
                            <h3 className="font-semibold mb-2">
                              {t("invoiceDetails")}
                            </h3>
                            <p className="font-medium">
                              {t("invoice")} # {invoice.invoiceNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t("date")}: {invoice.date}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t("dueDate")}: {invoice.dueDate}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t("status")}: {t("draft")}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("description")}</TableHead>
                      <TableHead className="text-right">
                        {t("quantity")}
                      </TableHead>
                      <TableHead className="text-right">{t("rate")}</TableHead>
                      <TableHead className="text-right">
                        {t("amount")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.rate.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-8 flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-2">
                      <span>{t("subtotal")}</span>
                      <span>${invoice.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>
                        {t("tax")} ({invoice.taxRate}%)
                      </span>
                      <span>${invoice.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold border-t">
                      <span>{t("total")}</span>
                      <span>${invoice.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {(invoice.notes || invoice.terms) && (
                  <div className="mt-8 pt-4 border-t">
                    {invoice.notes && (
                      <div className="mb-4">
                        <h3 className="font-semibold mb-1">{t("notes")}</h3>
                        <p className="text-sm text-gray-600">{invoice.notes}</p>
                      </div>
                    )}
                    {invoice.terms && (
                      <div>
                        <h3 className="font-semibold mb-1">{t("terms")}</h3>
                        <p className="text-sm text-gray-600">{invoice.terms}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={generatePDF}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  {t("downloadPDF")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={saveInvoice} className="flex items-center gap-2">
            <Save size={16} />
            {t("saveInvoice")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("companyInformation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">{t("companyName")}</Label>
              <Input
                id="companyName"
                name="companyName"
                value={invoice.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="companyAddress">{t("address")}</Label>
              <Input
                id="companyAddress"
                name="companyAddress"
                value={invoice.companyAddress}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="companyEmail">{t("email")}</Label>
              <Input
                id="companyEmail"
                name="companyEmail"
                type="email"
                value={invoice.companyEmail}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="companyPhone">{t("phone")}</Label>
              <Input
                id="companyPhone"
                name="companyPhone"
                value={invoice.companyPhone}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("clientInformation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="client">{t("clientName")}</Label>
              {savedClients.length > 0 ? (
                <Select
                  value={invoice.client}
                  onValueChange={handleClientChange}
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder={t("selectClient")} />
                  </SelectTrigger>
                  <SelectContent>
                    {savedClients.map((client) => (
                      <SelectItem
                        key={client.id || client.name || client}
                        value={client.name || client}
                      >
                        {client.name || client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="client"
                  name="client"
                  value={invoice.client}
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div>
              <Label htmlFor="clientAddress">{t("address")}</Label>
              <Input
                id="clientAddress"
                name="clientAddress"
                value={invoice.clientAddress}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">{t("email")}</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                value={invoice.clientEmail}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="clientPhone">{t("phone")}</Label>
              <Input
                id="clientPhone"
                name="clientPhone"
                value={invoice.clientPhone}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("invoiceDetails")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">{t("invoiceNumber")}</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="date">{t("date")}</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={invoice.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">{t("dueDate")}</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("items")}</CardTitle>
          <div className="flex gap-2">
            {savedItems.length > 0 && (
              <Select
                onValueChange={(value) => {
                  const item = savedItems.find(
                    (item) => item.id === value || item.name === value,
                  );
                  if (item) addSavedItem(item);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={t("addSavedItem")} />
                </SelectTrigger>
                <SelectContent>
                  {savedItems.map((item) => (
                    <SelectItem
                      key={item.id || item.name}
                      value={item.id || item.name}
                    >
                      {item.name || item.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={addLineItem}
            >
              <Plus size={16} />
              {t("addItem")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">{t("description")}</TableHead>
                <TableHead className="text-right">{t("quantity")}</TableHead>
                <TableHead className="text-right">{t("rate")}</TableHead>
                <TableHead className="text-right">{t("amount")}</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      placeholder={t("itemDescription")}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-20 ml-auto"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "rate",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-24 ml-auto"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLineItem(item.id)}
                      disabled={invoice.items.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <Label>{t("subtotal")}</Label>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="taxRate">{t("tax")}</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    value={invoice.taxRate}
                    onChange={handleTaxRateChange}
                    className="w-16 h-8"
                  />
                  <span>%</span>
                </div>
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("additionalInfo")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes">{t("notes")}</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder={t("notesPlaceholder")}
              value={invoice.notes}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="terms">{t("terms")}</Label>
            <Textarea
              id="terms"
              name="terms"
              value={invoice.terms}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleReset}>
          {t("reset")}
        </Button>
        <Button onClick={saveInvoice} className="flex items-center gap-2">
          <Save size={16} />
          {t("saveInvoice")}
        </Button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
