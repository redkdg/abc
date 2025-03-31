import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useLanguage } from "@/lib/LanguageContext";

const LoginPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {t("invoiceGenerator")}
        </h1>
        <p className="text-gray-600">{t("loginToAccessYourAccount")}</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
