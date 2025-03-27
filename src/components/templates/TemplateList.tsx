import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

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
}

const TemplateList = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: TemplateListProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative aspect-[4/5] bg-gray-100">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
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
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
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
