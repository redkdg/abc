import React, { useState, useEffect } from "react";
import TemplateList from "@/components/templates/TemplateList";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/LanguageContext";
import { saveSelectedTemplate } from "@/lib/storage";

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

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    // Save to localStorage
    saveSelectedTemplate(id);
    toast({
      title: t("templateSelected"),
      description: t("templateSelectedDescription"),
    });
  };

  return (
    <TemplateList
      templates={templates}
      selectedTemplate={selectedTemplate}
      onSelectTemplate={handleSelectTemplate}
    />
  );
};

export default TemplatesPage;
