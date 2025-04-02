import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Search,
  Eye,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  FileUp,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { getCurrencySymbol } from "@/lib/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

interface InvoiceListProps {
  invoices: Invoice[];
  onCreateInvoice: () => void;
  onViewInvoice: (id: string) => void;
  onDeleteInvoice: (id: string) => void;
  onOpenGenerator: () => void;
  onStatusChange?: (
    id: string,
    newStatus: "paid" | "pending" | "overdue",
    updatedInvoices: Invoice[],
  ) => void;
}

const statusColorMap = {
  paid: "bg-green-100 text-green-800 hover:bg-green-200",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  overdue: "bg-red-100 text-red-800 hover:bg-red-200",
};

const InvoiceList = ({
  invoices,
  onCreateInvoice,
  onViewInvoice,
  onDeleteInvoice,
  onOpenGenerator,
  onStatusChange,
}: InvoiceListProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const currencySymbol = getCurrencySymbol();

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("invoices")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={onOpenGenerator}>
            <FileUp size={18} />
            <span>{t("advancedGenerator")}</span>
          </Button>
          <Button className="gap-2" onClick={onCreateInvoice}>
            <PlusCircle size={18} />
            <span>{t("newInvoice")}</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("searchInvoices")}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("invoice")}</TableHead>
              <TableHead>{t("client")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead>{t("amount")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    {currencySymbol}
                    {invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        statusColorMap[invoice.status],
                      )}
                    >
                      {t(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title={t("viewInvoice")}
                        onClick={() => onViewInvoice(invoice.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={t("downloadInvoice")}
                        onClick={() => {
                          // In a real app, this would download the invoice
                          alert(t("downloadStarted"));
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            title={t("moreOptions")}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onViewInvoice(invoice.id)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>{t("edit")}</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="cursor-pointer">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "mr-2 capitalize",
                                  statusColorMap[invoice.status],
                                )}
                              >
                                {t(invoice.status)}
                              </Badge>
                              <span>{t("changeStatus")}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  const updatedInvoices = invoices.map((inv) =>
                                    inv.id === invoice.id
                                      ? { ...inv, status: "paid" }
                                      : inv,
                                  );
                                  // In a real app, this would update the database
                                  // For now, we'll just update the local state via the parent component
                                  onStatusChange?.(
                                    invoice.id,
                                    "paid",
                                    updatedInvoices,
                                  );
                                }}
                                className="cursor-pointer"
                              >
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "mr-2 capitalize",
                                    statusColorMap.paid,
                                  )}
                                >
                                  {t("paid")}
                                </Badge>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  const updatedInvoices = invoices.map((inv) =>
                                    inv.id === invoice.id
                                      ? { ...inv, status: "pending" }
                                      : inv,
                                  );
                                  onStatusChange?.(
                                    invoice.id,
                                    "pending",
                                    updatedInvoices,
                                  );
                                }}
                                className="cursor-pointer"
                              >
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "mr-2 capitalize",
                                    statusColorMap.pending,
                                  )}
                                >
                                  {t("pending")}
                                </Badge>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  const updatedInvoices = invoices.map((inv) =>
                                    inv.id === invoice.id
                                      ? { ...inv, status: "overdue" }
                                      : inv,
                                  );
                                  onStatusChange?.(
                                    invoice.id,
                                    "overdue",
                                    updatedInvoices,
                                  );
                                }}
                                className="cursor-pointer"
                              >
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "mr-2 capitalize",
                                    statusColorMap.overdue,
                                  )}
                                >
                                  {t("overdue")}
                                </Badge>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDeleteInvoice(invoice.id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{t("delete")}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  {searchTerm ? t("noInvoicesFound") : t("noInvoicesYet")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceList;
