import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  Users,
  Package,
  Palette,
  Settings,
  LogOut,
  FileSpreadsheet,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/LanguageContext";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ to, icon, label, active = false }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <span className="text-current">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">InvoiceGen</h1>
        </div>
      </div>

      <Separator />

      <div className="flex-1 py-4 px-3 space-y-1">
        <SidebarLink
          to="/"
          icon={<Home size={20} />}
          label={t("dashboard")}
          active={currentPath === "/"}
        />
        <SidebarLink
          to="/invoices"
          icon={<FileText size={20} />}
          label={t("invoices")}
          active={currentPath.startsWith("/invoices")}
        />
        <SidebarLink
          to="/clients"
          icon={<Users size={20} />}
          label={t("clients")}
          active={currentPath.startsWith("/clients")}
        />
        <SidebarLink
          to="/items"
          icon={<Package size={20} />}
          label={t("itemLibrary")}
          active={currentPath.startsWith("/items")}
        />
        <SidebarLink
          to="/templates"
          icon={<Palette size={20} />}
          label={t("templates")}
          active={currentPath.startsWith("/templates")}
        />
      </div>

      <div className="mt-auto py-4 px-3 space-y-1">
        <SidebarLink
          to="/settings"
          icon={<Settings size={20} />}
          label={t("companyProfile")}
          active={currentPath.startsWith("/settings")}
        />
        <SidebarLink
          to="/logout"
          icon={<LogOut size={20} />}
          label={t("logout")}
          active={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
