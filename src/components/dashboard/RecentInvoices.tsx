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
import { useNavigate } from "react-router-dom";

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
  onViewInvoice?: (id: string) => void;
}

const statusColorMap = {
  paid: "bg-green-100 text-green-800 hover:bg-green-200",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  overdue: "bg-red-100 text-red-800 hover:bg-red-200",
};

const RecentInvoices = ({
  invoices = [],
  title = "Recent Invoices",
  showSearch = true,
  onViewInvoice,
}: RecentInvoicesProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleViewInvoice = (id: string) => {
    if (onViewInvoice) {
      onViewInvoice(id);
    } else {
      navigate(`/invoices?action=view&id=${id}`);
    }
  };

  const handleDownloadInvoice = (id: string) => {
    // Navigate to invoice view with download parameter
    navigate(`/invoices?action=view&id=${id}&download=true`);
  };

  const handleViewAll = () => {
    navigate("/invoices");
  };

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
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
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
                        onClick={() => handleViewInvoice(invoice.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={t("downloadInvoice")}
                        onClick={() => handleDownloadInvoice(invoice.id)}
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  {t("noInvoicesYet")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-auto pt-4">
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          {t("viewAllInvoices")}
        </Button>
        <div className="text-sm text-gray-500">
          {invoices.length > 0 ? (
            <>
              {t("showing")} {invoices.length} {t("of")} {invoices.length}{" "}
              {t("invoices")}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecentInvoices;
