import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, ArrowLeft, Package } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface InvoiceFormProps {
  invoice?: any;
  onSave: (invoice: any) => void;
  onCancel: () => void;
}

const InvoiceForm = ({
  invoice: existingInvoice,
  onSave,
  onCancel,
}: InvoiceFormProps) => {
  const { t } = useLanguage();
  const [invoice, setInvoice] = useState({
    client: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
    notes: "",
    terms: "Payment due within 30 days",
    subtotal: 0,
    tax: 0,
    total: 0,
    status: "pending",
  });

  // If editing an existing invoice, populate the form
  useEffect(() => {
    if (existingInvoice) {
      setInvoice({
        ...existingInvoice,
        // Ensure all required fields exist
        items: existingInvoice.items || [
          { description: "", quantity: 1, rate: 0, amount: 0 },
        ],
        notes: existingInvoice.notes || "",
        terms: existingInvoice.terms || "Payment due within 30 days",
        subtotal: existingInvoice.subtotal || 0,
        tax: existingInvoice.tax || 0,
        total: existingInvoice.total || 0,
      });
    }
  }, [existingInvoice]);

  const handleClientChange = (value: string) => {
    setInvoice({ ...invoice, client: value });
  };

  const handleDateChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInvoice({ ...invoice, [field]: e.target.value });
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Recalculate amount
    if (field === "quantity" || field === "rate") {
      const quantity =
        field === "quantity" ? Number(value) : Number(newItems[index].quantity);
      const rate =
        field === "rate" ? Number(value) : Number(newItems[index].rate);
      newItems[index].amount = quantity * rate;
    }

    // Update invoice with new items and recalculate totals
    const subtotal = newItems.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );
    const tax = subtotal * 0.1; // 10% tax rate

    setInvoice({
      ...invoice,
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax,
    });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { description: "", quantity: 1, rate: 0, amount: 0 },
      ],
    });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length === 1) return;

    const newItems = invoice.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );
    const tax = subtotal * 0.1;

    setInvoice({
      ...invoice,
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleStatusChange = (value: string) => {
    setInvoice({ ...invoice, status: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If it's a new invoice, generate an invoice number
    const finalInvoice = existingInvoice
      ? invoice
      : {
          ...invoice,
          invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
          date: invoice.issueDate,
          id: existingInvoice?.id || `invoice-${Date.now()}`,
        };

    onSave(finalInvoice);
  };

  // Predefined clients for the demo
  const clients = [
    "Acme Corp",
    "Globex Inc",
    "Wayne Enterprises",
    "Stark Industries",
    "Umbrella Corp",
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeft className="cursor-pointer" onClick={onCancel} />
          {existingInvoice ? t("editInvoice") : t("createInvoice")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="client">{t("client")}</Label>
              <Select value={invoice.client} onValueChange={handleClientChange}>
                <SelectTrigger id="client">
                  <SelectValue placeholder={t("selectClient")} />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">{t("issueDate")}</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={invoice.issueDate}
                  onChange={(e) => handleDateChange("issueDate", e)}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">{t("dueDate")}</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => handleDateChange("dueDate", e)}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>{t("items")}</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
                className="flex items-center gap-1"
              >
                <Plus size={16} /> {t("addItem")}
              </Button>
            </div>

            <div className="space-y-4">
              {invoice.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-5">
                    <Input
                      placeholder={t("description")}
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder={t("quantity")}
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder={t("rate")}
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(index, "rate", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      readOnly
                      value={item.amount}
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      disabled={invoice.items.length === 1}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="notes">{t("notes")}</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={3}
                value={invoice.notes}
                onChange={handleTextChange}
              />
            </div>
            <div>
              <Label htmlFor="terms">{t("terms")}</Label>
              <Textarea
                id="terms"
                name="terms"
                rows={3}
                value={invoice.terms}
                onChange={handleTextChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="status">{t("status")}</Label>
              <Select value={invoice.status} onValueChange={handleStatusChange}>
                <SelectTrigger id="status">
                  <SelectValue placeholder={t("selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t("draft")}</SelectItem>
                  <SelectItem value="pending">{t("pending")}</SelectItem>
                  <SelectItem value="paid">{t("paid")}</SelectItem>
                  <SelectItem value="overdue">{t("overdue")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t("subtotal")}:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("tax")} (10%):</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>{t("total")}:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t("cancel")}
            </Button>
            <Button type="submit">{t("saveInvoice")}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
