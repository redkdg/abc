import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Check,
  Settings,
  FileText,
  Layout,
  Palette,
  Grid,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isDefault?: boolean;
}

interface TemplateListProps {
  templates: Template[];
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
  onCustomizeTemplate?: (id: string) => void;
}

const TemplateList = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onCustomizeTemplate,
}: TemplateListProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectTemplate = (id: string) => {
    onSelectTemplate(id);
    toast({
      title: t("templateSelected"),
      description: t("templateSelectedDescription"),
    });
  };

  // Template icons based on template ID
  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case "template-1":
        return <FileText className="h-16 w-16 text-primary" />;
      case "template-2":
        return <Palette className="h-16 w-16 text-indigo-500" />;
      case "template-3":
        return <Layout className="h-16 w-16 text-amber-600" />;
      case "template-4":
        return <Grid className="h-16 w-16 text-emerald-600" />;
      default:
        return <FileText className="h-16 w-16 text-primary" />;
    }
  };

  // Template color schemes
  const getTemplateColorScheme = (templateId: string) => {
    switch (templateId) {
      case "template-1":
        return "bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200";
      case "template-2":
        return "bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200";
      case "template-3":
        return "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200";
      case "template-4":
        return "bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200";
      default:
        return "bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("templates")}</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("searchTemplates")}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:shadow-md"}`}
          >
            <div
              className={`relative aspect-[4/5] ${getTemplateColorScheme(template.id)} flex items-center justify-center`}
            >
              {getTemplateIcon(template.id)}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              {template.isDefault && (
                <div className="absolute top-2 left-2 bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">
                  {t("default")}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-2 text-center">
                <h3 className="font-semibold">{template.name}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
              <div className="flex justify-between mt-4">
                <Button
                  variant={
                    selectedTemplate === template.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      {t("selected")}
                    </>
                  ) : (
                    t("selectTemplate")
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onCustomizeTemplate
                      ? onCustomizeTemplate(template.id)
                      : null
                  }
                  className="flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  {t("customize")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {searchTerm ? t("noTemplatesFound") : t("noTemplatesYet")}
        </div>
      )}
    </div>
  );
};

export default TemplateList;
