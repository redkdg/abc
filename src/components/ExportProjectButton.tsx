import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const ExportProjectButton = () => {
  const { t } = useLanguage();

  const handleExport = () => {
    // Create a URL to download the project from GitHub
    const githubUrl =
      "https://github.com/TempoLabsAI/invoice-generator-template/archive/refs/heads/main.zip";

    // Create a download link
    const link = document.createElement("a");
    link.href = githubUrl;
    link.download = "invoice-generator.zip";
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download size={16} />
      {t("downloadProject")}
    </Button>
  );
};

export default ExportProjectButton;
