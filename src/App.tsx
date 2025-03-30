import { Suspense, useState, useEffect } from "react";
import {
  getInvoices,
  saveInvoices,
  getCompany,
  saveCompany,
  getClients,
  saveClients,
  getItems,
  saveItems,
  getSelectedTemplate,
  saveSelectedTemplate,
} from "./lib/storage";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LanguageProvider from "./lib/LanguageContext";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import InvoicesPage from "./pages/InvoicesPage";
import ClientsPage from "./pages/ClientsPage";
import ItemsPage from "./pages/ItemsPage";
import TemplatesPage from "./pages/TemplatesPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";

function App() {
  // Default data for the app
  const defaultInvoices = [
    {
      id: "invoice-1",
      invoiceNumber: "INV-001",
      client: "Acme Corp",
      date: "2023-05-15",
      issueDate: "2023-05-15",
      dueDate: "2023-06-15",
      amount: 1250.0,
      subtotal: 1136.36,
      tax: 113.64,
      total: 1250.0,
      status: "paid",
      items: [
        {
          description: "Website Design",
          quantity: 1,
          rate: 1000,
          amount: 1000,
        },
        {
          description: "Logo Design",
          quantity: 1,
          rate: 136.36,
          amount: 136.36,
        },
      ],
      notes: "Thank you for your business!",
      terms: "Payment due within 30 days",
    },
    {
      id: "invoice-2",
      invoiceNumber: "INV-002",
      client: "Globex Inc",
      date: "2023-05-20",
      issueDate: "2023-05-20",
      dueDate: "2023-06-20",
      amount: 850.5,
      subtotal: 773.18,
      tax: 77.32,
      total: 850.5,
      status: "pending",
      items: [
        {
          description: "Monthly Maintenance",
          quantity: 1,
          rate: 500,
          amount: 500,
        },
        {
          description: "Content Updates",
          quantity: 3,
          rate: 91.06,
          amount: 273.18,
        },
      ],
      notes: "",
      terms: "Payment due within 30 days",
    },
    {
      id: "invoice-3",
      invoiceNumber: "INV-003",
      client: "Wayne Enterprises",
      date: "2023-05-10",
      issueDate: "2023-05-10",
      dueDate: "2023-06-10",
      amount: 3200.75,
      subtotal: 2909.77,
      tax: 290.98,
      total: 3200.75,
      status: "overdue",
      items: [
        {
          description: "E-commerce Development",
          quantity: 1,
          rate: 2500,
          amount: 2500,
        },
        {
          description: "Payment Gateway Integration",
          quantity: 1,
          rate: 409.77,
          amount: 409.77,
        },
      ],
      notes: "Please pay immediately",
      terms: "Payment due within 30 days",
    },
  ];

  // Load data from localStorage or use defaults
  const [invoices, setInvoices] = useState<any[]>([]);

  const defaultClients = [
    {
      id: "client-1",
      name: "Acme Corp",
      email: "contact@acme.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, USA",
      invoiceCount: 5,
    },
    {
      id: "client-2",
      name: "Globex Inc",
      email: "info@globex.com",
      phone: "(555) 987-6543",
      address: "456 Business Ave, Commerce City, USA",
      invoiceCount: 3,
    },
    {
      id: "client-3",
      name: "Wayne Enterprises",
      email: "contact@wayne.com",
      phone: "(555) 789-0123",
      address: "789 Corporate Blvd, Gotham, USA",
      invoiceCount: 7,
    },
  ];

  const [clients, setClients] = useState<any[]>([]);

  const defaultItems = [
    {
      id: "item-1",
      name: "Website Design",
      description: "Custom website design with responsive layout",
      price: 1000,
      type: "service",
    },
    {
      id: "item-2",
      name: "Logo Design",
      description: "Professional logo design with multiple revisions",
      price: 500,
      type: "service",
    },
    {
      id: "item-3",
      name: "Hosting (Monthly)",
      description: "Web hosting services including SSL and backups",
      price: 29.99,
      type: "service",
    },
    {
      id: "item-4",
      name: "Custom Software License",
      description: "Annual license for custom software",
      price: 1200,
      type: "product",
    },
  ];

  const [items, setItems] = useState<any[]>([]);

  const templates = [
    {
      id: "template-1",
      name: "Professional",
      description: "Clean and professional invoice template",
      thumbnail:
        "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=400&q=80",
      isDefault: true,
    },
    {
      id: "template-2",
      name: "Modern",
      description: "Sleek and modern design with accent colors",
      thumbnail:
        "https://images.unsplash.com/photo-1586282023358-7c1c6bc5c0b4?w=400&q=80",
    },
    {
      id: "template-3",
      name: "Classic",
      description: "Traditional invoice layout with serif fonts",
      thumbnail:
        "https://images.unsplash.com/photo-1586282023699-7ea89b044ce9?w=400&q=80",
    },
    {
      id: "template-4",
      name: "Minimalist",
      description: "Simple and clean design with minimal elements",
      thumbnail:
        "https://images.unsplash.com/photo-1586282023788-d80e516ae59a?w=400&q=80",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState("");

  const defaultCompany = {
    name: "InvoiceGen",
    email: "contact@invoicegen.com",
    phone: "+1 (555) 123-4567",
    website: "www.invoicegen.com",
    address: "123 Business Street, Suite 100, New York, NY 10001",
    taxId: "12-3456789",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=InvoiceGen",
  };

  const [company, setCompany] = useState(defaultCompany);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedInvoices = getInvoices();
    const storedClients = getClients();
    const storedItems = getItems();
    const storedCompany = getCompany();
    const storedTemplate = getSelectedTemplate();

    setInvoices(storedInvoices.length > 0 ? storedInvoices : defaultInvoices);
    setClients(storedClients.length > 0 ? storedClients : defaultClients);
    setItems(storedItems.length > 0 ? storedItems : defaultItems);
    setCompany(storedCompany || defaultCompany);
    setSelectedTemplate(storedTemplate);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (invoices.length > 0) saveInvoices(invoices);
  }, [invoices]);

  useEffect(() => {
    if (clients.length > 0) saveClients(clients);
  }, [clients]);

  useEffect(() => {
    if (items.length > 0) saveItems(items);
  }, [items]);

  useEffect(() => {
    if (company) saveCompany(company);
  }, [company]);

  useEffect(() => {
    if (selectedTemplate) saveSelectedTemplate(selectedTemplate);
  }, [selectedTemplate]);

  // Update invoice template settings when template changes
  useEffect(() => {
    // This ensures all invoices use the latest template settings
    if (selectedTemplate && invoices.length > 0) {
      const updatedInvoices = invoices.map((invoice) => ({
        ...invoice,
        templateId: selectedTemplate,
      }));
      setInvoices(updatedInvoices);
      saveInvoices(updatedInvoices);
    }
  }, [selectedTemplate]);

  const handleCreateInvoice = () => {
    // Navigate to invoices page with create mode and pass the selected template
    const template = getSelectedTemplate();
    window.location.href = `/invoices?action=create&template=${template || "template-1"}`;
  };

  const handleViewInvoice = (id: string) => {
    // Navigate to invoices page with view mode
    window.location.href = `/invoices?action=view&id=${id}`;
  };

  return (
    <LanguageProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Dashboard
                    onCreateInvoice={handleCreateInvoice}
                    onViewInvoice={handleViewInvoice}
                  />
                </MainLayout>
              }
            />
            <Route
              path="/invoices"
              element={
                <MainLayout>
                  <InvoicesPage invoices={invoices} setInvoices={setInvoices} />
                </MainLayout>
              }
            />
            <Route
              path="/clients"
              element={
                <MainLayout>
                  <ClientsPage clients={clients} setClients={setClients} />
                </MainLayout>
              }
            />
            <Route
              path="/items"
              element={
                <MainLayout>
                  <ItemsPage items={items} setItems={setItems} />
                </MainLayout>
              }
            />
            <Route
              path="/templates"
              element={
                <MainLayout>
                  <TemplatesPage
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                  />
                </MainLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <MainLayout>
                  <CompanyProfilePage
                    company={company}
                    setCompany={setCompany}
                  />
                </MainLayout>
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </LanguageProvider>
  );
}

export default App;
