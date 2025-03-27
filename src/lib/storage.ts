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
