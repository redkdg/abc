import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useLanguage } from "@/lib/LanguageContext";
import UserMenu from "./UserMenu";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="John Doe" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
        <Toaster />
      </div>
    </div>
  );
};

export default MainLayout;
