// Local storage utility functions

// User profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Get user from local storage
export const getUser = (): UserProfile | null => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

// Save user to local storage
export const saveUser = (user: UserProfile): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get invoices from local storage
export const getInvoices = (): any[] => {
  const invoicesData = localStorage.getItem("invoices");
  return invoicesData ? JSON.parse(invoicesData) : [];
};

// Save invoices to local storage
export const saveInvoices = (invoices: any[]): void => {
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

// Get company profile from local storage
export const getCompany = (): any => {
  const companyData = localStorage.getItem("company");
  return companyData ? JSON.parse(companyData) : null;
};

// Save company profile to local storage
export const saveCompany = (company: any): void => {
  localStorage.setItem("company", JSON.stringify(company));
};

// Get selected template from local storage
export const getSelectedTemplate = (): string => {
  return localStorage.getItem("selectedTemplate") || "template-1";
};

// Save selected template to local storage
export const saveSelectedTemplate = (templateId: string): void => {
  localStorage.setItem("selectedTemplate", templateId);
};

// Template settings
export interface TemplateSettings {
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  fontSize: {
    heading: number;
    subheading: number;
    body: number;
  };
  layout: {
    logoPosition: string;
    companyInfoPosition: string;
    clientInfoPosition: string;
    showHeader: boolean;
    showFooter: boolean;
  };
}

// Get template settings from local storage
export const getTemplateSettings = (
  templateId: string,
): TemplateSettings | null => {
  const settingsData = localStorage.getItem(`template-settings-${templateId}`);
  if (settingsData) {
    return JSON.parse(settingsData);
  }

  // Return default settings if none exist
  return {
    margins: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    },
    colors: {
      primary: "#4f46e5",
      secondary: "#f97316",
      background: "#ffffff",
      text: "#1f2937",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    fontSize: {
      heading: 24,
      subheading: 18,
      body: 14,
    },
    layout: {
      logoPosition: "top-left",
      companyInfoPosition: "top-left",
      clientInfoPosition: "top-right",
      invoiceDetailsPosition: "top-right",
      showHeader: true,
      showFooter: true,
      showLogo: true,
    },
  };
};

// Save template settings to local storage
export const saveTemplateSettings = (
  templateId: string,
  settings: TemplateSettings,
): void => {
  localStorage.setItem(
    `template-settings-${templateId}`,
    JSON.stringify(settings),
  );
};

// Get clients from local storage
export const getClients = (): any[] => {
  const clientsData = localStorage.getItem("clients");
  return clientsData ? JSON.parse(clientsData) : [];
};

// Save clients to local storage
export const saveClients = (clients: any[]): void => {
  localStorage.setItem("clients", JSON.stringify(clients));
};

// Get items from local storage
export const getItems = (): any[] => {
  const itemsData = localStorage.getItem("items");
  return itemsData ? JSON.parse(itemsData) : [];
};

// Save items to local storage
export const saveItems = (items: any[]): void => {
  localStorage.setItem("items", JSON.stringify(items));
};
