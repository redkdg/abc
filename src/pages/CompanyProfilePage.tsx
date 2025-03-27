import React from "react";
import CompanyProfile from "@/components/company/CompanyProfile";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/LanguageContext";

interface CompanyProfilePageProps {
  company: any;
  setCompany: React.Dispatch<React.SetStateAction<any>>;
}

const CompanyProfilePage = ({
  company,
  setCompany,
}: CompanyProfilePageProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSaveCompany = (updatedCompany: any) => {
    setCompany(updatedCompany);
    toast({
      title: t("profileUpdated"),
      description: t("profileUpdatedDescription"),
    });
  };

  return <CompanyProfile company={company} onSave={handleSaveCompany} />;
};

export default CompanyProfilePage;
