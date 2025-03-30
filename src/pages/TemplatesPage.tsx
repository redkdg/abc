import React, { useState, useEffect } from "react";
import TemplateList from "@/components/templates/TemplateList";
import TemplateCustomizer from "@/components/templates/TemplateCustomizer";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/LanguageContext";
import { saveSelectedTemplate } from "@/lib/storage";
import { useSearchParams } from "react-router-dom";

interface TemplatesPageProps {
  templates: any[];
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const TemplatesPage = ({
  templates,
  selectedTemplate,
  setSelectedTemplate,
}: TemplatesPageProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [customizingTemplate, setCustomizingTemplate] = useState<string | null>(
    null,
  );

  // Check if we should show the customizer based on URL params
  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "customize" && selectedTemplate) {
      setCustomizingTemplate(selectedTemplate);
    }
  }, [searchParams, selectedTemplate]);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    // Save to localStorage
    saveSelectedTemplate(id);
    toast({
      title: t("templateSelected"),
      description: t("templateSelectedDescription"),
    });
  };

  const handleCustomizeTemplate = (templateId: string) => {
    setCustomizingTemplate(templateId);
  };

  if (customizingTemplate) {
    return (
      <div className="container mx-auto py-6">
        <TemplateCustomizer
          templateId={customizingTemplate}
          onSave={() => setCustomizingTemplate(null)}
          onCancel={() => setCustomizingTemplate(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <TemplateList
        templates={templates}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={handleSelectTemplate}
        onCustomizeTemplate={handleCustomizeTemplate}
      />
    </div>
  );
};

export default TemplatesPage;
