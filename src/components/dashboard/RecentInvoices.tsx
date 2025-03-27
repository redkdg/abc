import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Download, MoreHorizontal, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

interface RecentInvoicesProps {
  invoices?: Invoice[];
  title?: string;
  showSearch?: boolean;
}

const statusColorMap = {
  paid: "bg-green-100 text-green-800 hover:bg-green-200",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  overdue: "bg-red-100 text-red-800 hover:bg-red-200",
};

const RecentInvoices = ({
  invoices = [
    {
      id: "1",
      invoiceNumber: "INV-001",
      client: "Acme Corp",
      date: "2023-05-15",
      amount: 1250.0,
      status: "paid",
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      client: "Globex Inc",
      date: "2023-05-20",
      amount: 850.5,
      status: "pending",
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      client: "Wayne Enterprises",
      date: "2023-05-10",
      amount: 3200.75,
      status: "overdue",
    },
    {
      id: "4",
      invoiceNumber: "INV-004",
      client: "Stark Industries",
      date: "2023-05-25",
      amount: 1750.25,
      status: "paid",
    },
    {
      id: "5",
      invoiceNumber: "INV-005",
      client: "Umbrella Corp",
      date: "2023-05-28",
      amount: 920.0,
      status: "pending",
    },
  ],
  title = "Recent Invoices",
  showSearch = true,
}: RecentInvoicesProps) => {
  const { t } = useLanguage();
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("recentInvoices")}
        </h2>
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchInvoices")}
              className="pl-9 pr-4 py-2 text-sm border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>{t("recentInvoices")}</TableCaption>
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
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusColorMap[invoice.status])}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title={t("viewInvoice")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title={t("downloadInvoice")}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title={t("moreOptions")}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-auto pt-4">
        <Button variant="outline" size="sm">
          {t("viewAllInvoices")}
        </Button>
        <div className="text-sm text-gray-500">
          {t("showing")} {invoices.length} {t("of")} {invoices.length}{" "}
          {t("invoices")}
        </div>
      </div>
    </div>
  );
};

export default RecentInvoices;
