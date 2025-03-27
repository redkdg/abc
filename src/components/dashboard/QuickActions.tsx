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

interface QuickActionsProps {
  actions?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }[];
}

const QuickActions = ({ actions }: QuickActionsProps) => {
  const { t } = useLanguage();

  // Use translated actions if none provided
  const translatedDefaultActions = [
    {
      title: t("createNewInvoice"),
      description: t("generateNewInvoice"),
      icon: <PlusCircle size={20} />,
      onClick: () => console.log("Create invoice clicked"),
    },
    {
      title: t("manageClients"),
      description: t("addEditClientInfo"),
      icon: <Users size={20} />,
      onClick: () => console.log("Manage clients clicked"),
    },
    {
      title: t("itemLibraryAction"),
      description: t("manageProductsServices"),
      icon: <Package size={20} />,
      onClick: () => console.log("Item library clicked"),
    },
    {
      title: t("templatesAction"),
      description: t("browseSelectTemplates"),
      icon: <FileText size={20} />,
      onClick: () => console.log("Templates clicked"),
    },
    {
      title: t("customizeBranding"),
      description: t("updateColorsFontsLogo"),
      icon: <Palette size={20} />,
      onClick: () => console.log("Customize branding clicked"),
    },
    {
      title: t("companySettingsAction"),
      description: t("updateCompanyProfile"),
      icon: <Settings size={20} />,
      onClick: () => console.log("Company settings clicked"),
    },
  ];

  const actionsToUse = actions || translatedDefaultActions;
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{t("quickActions")}</CardTitle>
        <CardDescription>{t("frequentlyUsedActions")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {actionsToUse.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex justify-start items-center gap-3 h-14 px-4 hover:bg-slate-50 transition-colors"
            onClick={action.onClick}
          >
            <div className="flex-shrink-0 text-primary">{action.icon}</div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{action.title}</span>
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

const defaultActions = [
  {
    title: "Create New Invoice",
    description: "Generate a new invoice for a client",
    icon: <PlusCircle size={20} />,
    onClick: () => console.log("Create invoice clicked"),
  },
  {
    title: "Manage Clients",
    description: "Add or edit client information",
    icon: <Users size={20} />,
    onClick: () => console.log("Manage clients clicked"),
  },
  {
    title: "Item Library",
    description: "Manage your products and services",
    icon: <Package size={20} />,
    onClick: () => console.log("Item library clicked"),
  },
  {
    title: "Templates",
    description: "Browse and select invoice templates",
    icon: <FileText size={20} />,
    onClick: () => console.log("Templates clicked"),
  },
  {
    title: "Customize Branding",
    description: "Update colors, fonts and logo",
    icon: <Palette size={20} />,
    onClick: () => console.log("Customize branding clicked"),
  },
  {
    title: "Company Settings",
    description: "Update your company profile",
    icon: <Settings size={20} />,
    onClick: () => console.log("Company settings clicked"),
  },
];

export default QuickActions;
