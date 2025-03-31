import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  PlusCircle,
  Users,
  Package,
  FileText,
  Palette,
  Settings,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useNavigate } from "react-router-dom";

interface QuickActionsProps {
  actions?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }[];
  onCreateInvoice?: () => void;
}

const QuickActions = ({ actions, onCreateInvoice }: QuickActionsProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Use translated actions if none provided
  const translatedDefaultActions = [
    {
      title: t("createNewInvoice"),
      description: t("generateNewInvoice"),
      icon: <PlusCircle size={20} />,
      onClick: () =>
        onCreateInvoice
          ? onCreateInvoice()
          : navigate("/invoices?action=create"),
    },
    {
      title: t("manageClients"),
      description: t("addEditClientInfo"),
      icon: <Users size={20} />,
      onClick: () => navigate("/clients"),
    },
    {
      title: t("itemLibraryAction"),
      description: t("manageProductsServices"),
      icon: <Package size={20} />,
      onClick: () => navigate("/items"),
    },
    {
      title: t("templatesAction"),
      description: t("browseSelectTemplates"),
      icon: <FileText size={20} />,
      onClick: () => navigate("/templates"),
    },
    {
      title: t("customizeBranding"),
      description: t("updateColorsFontsLogo"),
      icon: <Palette size={20} />,
      onClick: () => navigate("/templates?action=customize"),
    },
    {
      title: t("companySettingsAction"),
      description: t("updateCompanyProfile"),
      icon: <Settings size={20} />,
      onClick: () => navigate("/settings"),
    },
  ];

  const actionsToUse = actions || translatedDefaultActions;
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{t("quickActions")}</CardTitle>
        <CardDescription className="text-xs">
          {t("frequentlyUsedActions")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 pt-2">
        {actionsToUse.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex justify-start items-center gap-3 h-auto min-h-10 px-3 py-2 hover:bg-slate-50 transition-colors text-sm"
            onClick={action.onClick}
          >
            <div className="flex-shrink-0 text-primary">{action.icon}</div>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="font-medium truncate w-full">
                {action.title}
              </span>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
