export type Language = "en" | "fr" | "nl" | "de" | "es" | "pt" | "yue";

export type TranslationKey =
  | "downloadProject"
  | "advancedGenerator"
  | "preview"
  | "invoicePreview"
  | "downloadPDF"
  | "invoiceSaved"
  | "invoiceSavedForClient"
  | "invoiceSavedDescription"
  | "billTo"
  | "reset"
  | "draft"
  | "selectStatus"
  | "createInvoice"
  | "editInvoice"
  | "invoiceGenerator"
  | "loginToAccessYourAccount"
  | "dashboard"
  | "invoices"
  | "clients"
  | "itemLibrary"
  | "templates"
  | "companyProfile"
  | "settings"
  | "logout"
  | "search"
  | "newInvoice"
  | "overview"
  | "reports"
  | "analyticsOverview"
  | "totalRevenue"
  | "outstandingInvoices"
  | "paidInvoices"
  | "overdueInvoices"
  | "averagePaymentTime"
  | "activeClients"
  | "totalInvoices"
  | "conversionRate"
  | "last30Days"
  | "awaitingPayment"
  | "needsAttention"
  | "fromInvoiceSent"
  | "totalClientBase"
  | "allTime"
  | "invoicesPaidOnTime"
  | "recentInvoices"
  | "searchInvoices"
  | "invoice"
  | "client"
  | "date"
  | "amount"
  | "status"
  | "actions"
  | "viewInvoice"
  | "downloadInvoice"
  | "moreOptions"
  | "viewAllInvoices"
  | "showing"
  | "of"
  | "quickActions"
  | "frequentlyUsedActions"
  | "createNewInvoice"
  | "generateNewInvoice"
  | "manageClients"
  | "addEditClientInfo"
  | "itemLibraryAction"
  | "manageProductsServices"
  | "templatesAction"
  | "browseSelectTemplates"
  | "customizeBranding"
  | "updateColorsFontsLogo"
  | "companySettingsAction"
  | "updateCompanyProfile"
  | "paid"
  | "pending"
  | "overdue"
  | "notifications"
  | "helpResources"
  | "myAccount"
  | "profile"
  | "admin"
  | "loading"
  | "days"
  | "back"
  | "clientInformation"
  | "clientName"
  | "selectClient"
  | "invoiceDetails"
  | "issueDate"
  | "dueDate"
  | "items"
  | "description"
  | "quantity"
  | "rate"
  | "itemDescription"
  | "addItem"
  | "subtotal"
  | "tax"
  | "total"
  | "additionalInfo"
  | "notes"
  | "notesPlaceholder"
  | "terms"
  | "cancel"
  | "saveInvoice"
  | "noInvoicesFound"
  | "noInvoicesYet"
  | "print"
  | "download"
  | "send"
  | "from"
  | "to"
  | "invoiceNumber"
  | "name"
  | "email"
  | "phone"
  | "invoices"
  | "newClient"
  | "searchClients"
  | "editClient"
  | "deleteClient"
  | "address"
  | "save"
  | "clientDeleted"
  | "clientDeletedDescription"
  | "clientUpdated"
  | "clientUpdatedDescription"
  | "clientCreated"
  | "clientCreatedDescription"
  | "newItem"
  | "searchItems"
  | "price"
  | "type"
  | "editItem"
  | "deleteItem"
  | "noItemsFound"
  | "noItemsYet"
  | "product"
  | "service"
  | "itemDeleted"
  | "itemDeletedDescription"
  | "itemUpdated"
  | "itemUpdatedDescription"
  | "itemCreated"
  | "itemCreatedDescription"
  | "searchTemplates"
  | "default"
  | "noTemplatesFound"
  | "noTemplatesYet"
  | "templateSelected"
  | "templateSelectedDescription"
  | "companyInformation"
  | "companyName"
  | "website"
  | "taxId"
  | "uploadLogo"
  | "saveChanges"
  | "profileUpdated"
  | "profileUpdatedDescription"
  | "invoiceReports"
  | "invoiceReportsDescription"
  | "clientReports"
  | "clientReportsDescription"
  | "financialReports"
  | "financialReportsDescription"
  | "invoiceUpdated"
  | "invoiceUpdatedDescription"
  | "invoiceCreated"
  | "invoiceCreatedDescription"
  | "invoiceDeleted"
  | "invoiceDeletedDescription"
  | "customize"
  | "customizeTemplate"
  | "previewTemplate"
  | "layout"
  | "colors"
  | "fonts"
  | "margins"
  | "layoutSettings"
  | "colorSettings"
  | "fontSettings"
  | "marginSettings"
  | "logoPosition"
  | "companyInfoPosition"
  | "clientInfoPosition"
  | "showFooter"
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "left"
  | "right"
  | "bottom"
  | "showLogo"
  | "invoiceDetailsPosition"
  | "invoiceDetails"
  | "active"
  | "inactive"
  | "revenue"
  | "revenueTrend"
  | "invoiceStatus"
  | "clientActivity"
  | "errorGeneratingPDF"
  | "emailSent"
  | "emailSentToClient"
  | "emailSentDescription"
  | "pdfGenerated"
  | "pdfGeneratedDescription"
  | "billTo"
  | "primaryColor"
  | "secondaryColor"
  | "backgroundColor"
  | "textColor"
  | "headingFont"
  | "bodyFont"
  | "headingSize"
  | "bodySize"
  | "topMargin"
  | "rightMargin"
  | "bottomMargin"
  | "leftMargin"
  | "selectTemplate"
  | "templateCustomized"
  | "templateCustomizedDescription"
  | "custom"
  | "dragToPosition"
  | "previewBeforeDownload"
  | "exactPreview"
  | "changeStatus"
  | "statusUpdated"
  | "statusUpdatedDescription"
  | "currency"
  | "currencyNote"
  | "taxDue"
  | "toBeRemitted"
  | "currencySettings"
  | "selectCurrency"
  | "currencySymbol"
  | "currencyUpdated"
  | "currencyUpdatedDescription"
  | "taxSettings"
  | "defaultTaxRate"
  | "taxRateUpdated"
  | "taxRateUpdatedDescription"
  | "taxIncluded"
  | "taxExcluded"
  | "taxCalculation"
  | "taxCalculationDescription"
  | "taxName"
  | "taxNameDescription"
  | "taxNamePlaceholder"
  | "taxIdentifier"
  | "taxIdentifierDescription"
  | "taxIdentifierPlaceholder"
  | "taxSettingsDescription"
  | "taxSettingsUpdated"
  | "taxSettingsUpdatedDescription"
  | "taxRateDescription"
  | "taxRatePlaceholder"
  | "taxRatePercentage"
  | "taxRatePercentageDescription"
  | "taxRatePercentagePlaceholder"
  | "taxRatePercentageRequired"
  | "taxRatePercentageInvalid"
  | "taxRatePercentageMax"
  | "taxRatePercentageMin"
  | "taxRatePercentageDecimal"
  | "taxRatePercentageFormat"
  | "taxRatePercentageFormatDescription"
  | "taxRatePercentageFormatPlaceholder"
  | "taxRatePercentageFormatRequired"
  | "taxRatePercentageFormatInvalid"
  | "taxRatePercentageFormatMax"
  | "taxRatePercentageFormatMin"
  | "taxRatePercentageFormatDecimal"
  | "taxRatePercentageFormatFormat"
  | "taxRatePercentageFormatFormatDescription"
  | "taxRatePercentageFormatFormatPlaceholder"
  | "taxRatePercentageFormatFormatRequired"
  | "taxRatePercentageFormatFormatInvalid"
  | "taxRatePercentageFormatFormatMax"
  | "taxRatePercentageFormatFormatMin"
  | "taxRatePercentageFormatFormatDecimal"
  | "taxRatePercentageFormatFormatFormat"
  | "taxRatePercentageFormatFormatFormatDescription"
  | "taxRatePercentageFormatFormatFormatPlaceholder"
  | "taxRatePercentageFormatFormatFormatRequired"
  | "taxRatePercentageFormatFormatFormatInvalid"
  | "taxRatePercentageFormatFormatFormatMax"
  | "taxRatePercentageFormatFormatFormatMin"
  | "taxRatePercentageFormatFormatFormatDecimal"
  | "taxRatePercentageFormatFormatFormatFormat"
  | "taxRatePercentageFormatFormatFormatFormatDescription"
  | "taxRatePercentageFormatFormatFormatFormatPlaceholder"
  | "taxRatePercentageFormatFormatFormatFormatRequired"
  | "taxRatePercentageFormatFormatFormatFormatInvalid"
  | "taxRatePercentageFormatFormatFormatFormatMax"
  | "taxRatePercentageFormatFormatFormatFormatMin"
  | "taxRatePercentageFormatFormatFormatFormatDecimal"
  | "taxRatePercentageFormatFormatFormatFormatFormat"
  // Peppol related translations
  | "exportPeppol"
  | "peppolExportSuccess"
  | "peppolExportSuccessDescription"
  | "peppolExportError"
  | "peppolExportErrorDescription"
  | "peppolSettings"
  | "peppolComplianceInfo"
  | "belgianVatNumber"
  | "belgianVatNumberFormat"
  | "enterpriseNumber"
  | "enterpriseNumberFormat"
  | "peppolIdentifier"
  | "peppolIdentifierInfo"
  | "generalInformation"
  | "city"
  | "postalCode"
  | "countryCode"
  | "contactName"
  | "invalidVatNumber"
  | "pleaseEnterValidBelgianVatNumber"
  | "invalidEnterpriseNumber"
  | "pleaseEnterValidBelgianEnterpriseNumber"
  // API Integration related translations
  | "apiIntegration"
  | "apiKey"
  | "validateApiKey"
  | "apiKeyValid"
  | "apiKeyInvalid"
  | "apiKeyValidated"
  | "apiKeySaved"
  | "apiKeyCleared"
  | "apiKeyRequired"
  | "apiKeyMissing"
  | "apiDocumentation"
  | "dataImport"
  | "importInvoiceData"
  | "importRegionalData"
  | "importIndustryData"
  | "dataImportSuccess"
  | "dataImportError"
  | "dataFusionIntegration"
  | "connectToDataFusion"
  | "availableDataSources"
  | "selectDataToImport"
  | "timeframe"
  | "dimension"
  | "daily"
  | "weekly"
  | "monthly"
  | "industry"
  | "region"
  | "source"
  | "metricType"
  | "value"
  | "noDataAvailable"
  | "manageYourApplicationSettings"
  | "learnHowToIntegrate"
  | "apiKeyInstructions"
  | "supportedDataTypes"
  | "invoicesImport"
  | "clientsImport"
  | "itemsImport";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    downloadProject: "Download Project",
    advancedGenerator: "Advanced Generator",
    preview: "Preview",
    invoicePreview: "Invoice Preview",
    downloadPDF: "Download PDF",
    invoiceSaved: "Invoice Saved",
    invoiceSavedForClient: "New invoice for {client} was saved successfully",
    invoiceSavedDescription: "Your invoice has been saved successfully",
    billTo: "Bill To",
    reset: "Reset",
    draft: "Draft",
    selectStatus: "Select Status",
    createInvoice: "Create Invoice",
    editInvoice: "Edit Invoice",
    dashboard: "Dashboard",
    invoices: "Invoices",
    clients: "Clients",
    itemLibrary: "Item Library",
    templates: "Templates",
    companyProfile: "Company Profile",
    settings: "Settings",
    logout: "Logout",
    search: "Search...",
    newInvoice: "New Invoice",
    overview: "Overview",
    reports: "Reports",
    analyticsOverview: "Analytics Overview",
    totalRevenue: "Total Revenue",
    outstandingInvoices: "Outstanding Invoices",
    paidInvoices: "Paid Invoices",
    overdueInvoices: "Overdue Invoices",
    averagePaymentTime: "Average Payment Time",
    activeClients: "Active Clients",
    totalInvoices: "Total Invoices",
    conversionRate: "Conversion Rate",
    last30Days: "Last 30 days",
    awaitingPayment: "Awaiting payment",
    needsAttention: "Needs attention",
    fromInvoiceSent: "From invoice sent",
    totalClientBase: "Total client base",
    allTime: "All time",
    invoicesPaidOnTime: "Invoices paid on time",
    recentInvoices: "Recent Invoices",
    searchInvoices: "Search invoices...",
    invoice: "Invoice",
    client: "Client",
    date: "Date",
    amount: "Amount",
    status: "Status",
    actions: "Actions",
    viewInvoice: "View Invoice",
    downloadInvoice: "Download Invoice",
    moreOptions: "More Options",
    viewAllInvoices: "View All Invoices",
    showing: "Showing",
    of: "of",
    quickActions: "Quick Actions",
    frequentlyUsedActions: "Frequently used actions for invoice management",
    createNewInvoice: "Create New Invoice",
    generateNewInvoice: "Generate a new invoice for a client",
    manageClients: "Manage Clients",
    addEditClientInfo: "Add or edit client information",
    itemLibraryAction: "Item Library",
    manageProductsServices: "Manage your products and services",
    templatesAction: "Templates",
    browseSelectTemplates: "Browse and select invoice templates",
    customizeBranding: "Customize Branding",
    updateColorsFontsLogo: "Update colors, fonts and logo",
    companySettingsAction: "Company Settings",
    updateCompanyProfile: "Update your company profile",
    paid: "Paid",
    pending: "Pending",
    overdue: "Overdue",
    notifications: "Notifications",
    helpResources: "Help & Resources",
    myAccount: "My Account",
    profile: "Profile",
    admin: "Admin",
    loading: "Loading...",
    days: "days",
    back: "Back",
    clientInformation: "Client Information",
    clientName: "Client Name",
    selectClient: "Select a client",
    invoiceDetails: "Invoice Details",
    issueDate: "Issue Date",
    dueDate: "Due Date",
    items: "Items",
    description: "Description",
    quantity: "Quantity",
    rate: "Rate",
    itemDescription: "Item description",
    addItem: "Add Item",
    subtotal: "Subtotal",
    tax: "Tax",
    total: "Total",
    additionalInfo: "Additional Information",
    notes: "Notes",
    notesPlaceholder: "Add any notes here...",
    terms: "Terms",
    cancel: "Cancel",
    saveInvoice: "Save Invoice",
    noInvoicesFound: "No invoices found matching your search",
    noInvoicesYet: "No invoices yet. Create your first invoice!",
    print: "Print",
    download: "Download",
    send: "Send",
    from: "From",
    to: "To",
    invoiceNumber: "Invoice Number",
    name: "Name",
    email: "Email",
    phone: "Phone",
    newClient: "New Client",
    searchClients: "Search clients...",
    editClient: "Edit Client",
    deleteClient: "Delete Client",
    address: "Address",
    save: "Save",
    clientDeleted: "Client Deleted",
    clientDeletedDescription: "The client has been successfully deleted",
    clientUpdated: "Client Updated",
    clientUpdatedDescription: "The client information has been updated",
    clientCreated: "Client Created",
    clientCreatedDescription: "The new client has been added successfully",
    newItem: "New Item",
    searchItems: "Search items...",
    price: "Price",
    type: "Type",
    editItem: "Edit Item",
    deleteItem: "Delete Item",
    noItemsFound: "No items found matching your search",
    noItemsYet: "No items yet. Add your first item!",
    product: "Product",
    service: "Service",
    itemDeleted: "Item Deleted",
    itemDeletedDescription: "The item has been successfully deleted",
    itemUpdated: "Item Updated",
    itemUpdatedDescription: "The item information has been updated",
    itemCreated: "Item Created",
    itemCreatedDescription: "The new item has been added successfully",
    searchTemplates: "Search templates...",
    default: "Default",
    noTemplatesFound: "No templates found matching your search",
    noTemplatesYet: "No templates available yet",
    templateSelected: "Template Selected",
    templateSelectedDescription: "Your invoice template has been updated",
    companyInformation: "Company Information",
    companyName: "Company Name",
    website: "Website",
    taxId: "Tax ID / VAT Number",
    uploadLogo: "Upload Logo",
    saveChanges: "Save Changes",
    profileUpdated: "Profile Updated",
    profileUpdatedDescription: "Your company profile has been updated",
    invoiceReports: "Invoice Reports",
    invoiceReportsDescription: "View detailed reports about your invoices",
    clientReports: "Client Reports",
    clientReportsDescription: "View detailed reports about your clients",
    financialReports: "Financial Reports",
    financialReportsDescription:
      "View detailed financial reports and analytics",
    invoiceUpdated: "Invoice Updated",
    invoiceUpdatedDescription: "The invoice has been successfully updated",
    invoiceCreated: "Invoice Created",
    invoiceCreatedDescription: "The new invoice has been created successfully",
    invoiceDeleted: "Invoice Deleted",
    invoiceDeletedDescription: "The invoice has been successfully deleted",
    customize: "Customize",
    customizeTemplate: "Customize Template",
    previewTemplate: "Preview Template",
    layout: "Layout",
    colors: "Colors",
    fonts: "Fonts",
    margins: "Margins",
    layoutSettings: "Layout Settings",
    colorSettings: "Color Settings",
    fontSettings: "Font Settings",
    marginSettings: "Margin Settings",
    logoPosition: "Logo Position",
    companyInfoPosition: "Company Info Position",
    clientInfoPosition: "Client Info Position",
    showFooter: "Show Footer",
    topLeft: "Top Left",
    topCenter: "Top Center",
    topRight: "Top Right",
    left: "Left",
    right: "Right",
    bottom: "Bottom",
    showLogo: "Show Logo",
    invoiceDetailsPosition: "Invoice Details Position",
    invoiceDetails: "Invoice Details",
    active: "Active",
    inactive: "Inactive",
    revenue: "Revenue",
    revenueTrend: "Revenue Trend",
    invoiceStatus: "Invoice Status",
    clientActivity: "Client Activity",
    errorGeneratingPDF: "Error generating PDF",
    emailSent: "Email sent successfully",
    emailSentToClient: "Invoice email sent to {client}",
    emailSentDescription: "Your invoice has been sent successfully",
    pdfGenerated: "PDF Generated",
    pdfGeneratedDescription: "Your invoice PDF has been generated successfully",
    billTo: "Bill To",
    primaryColor: "Primary Color",
    secondaryColor: "Secondary Color",
    backgroundColor: "Background Color",
    textColor: "Text Color",
    headingFont: "Heading Font",
    bodyFont: "Body Font",
    headingSize: "Heading Size",
    bodySize: "Body Size",
    topMargin: "Top Margin",
    rightMargin: "Right Margin",
    bottomMargin: "Bottom Margin",
    leftMargin: "Left Margin",
    selectTemplate: "Select Template",
    templateCustomized: "Template Customized",
    templateCustomizedDescription: "Your template customization has been saved",
    custom: "Custom",
    dragToPosition: "Drag to position",
    previewBeforeDownload: "Preview before download",
    exactPreview:
      "This preview exactly matches how your invoice will look when downloaded",
    changeStatus: "Change Status",
    statusUpdated: "Status Updated",
    statusUpdatedDescription: "Invoice status has been updated successfully",
    currency: "Currency",
    currencyNote: "This currency will be used throughout the application",
    taxDue: "VAT/Tax Due",
    toBeRemitted: "To be remitted",
    currencySettings: "Currency Settings",
    selectCurrency: "Select Currency",
    currencySymbol: "Currency Symbol",
    currencyUpdated: "Currency Updated",
    currencyUpdatedDescription: "Your currency settings have been updated",
    taxSettings: "Tax Settings",
    defaultTaxRate: "Default Tax Rate",
    taxRateUpdated: "Tax Rate Updated",
    taxRateUpdatedDescription: "Your default tax rate has been updated",
    taxIncluded: "Tax Included",
    taxExcluded: "Tax Excluded",
    taxCalculation: "Tax Calculation",
    taxCalculationDescription: "How tax is calculated on your invoices",
    taxName: "Tax Name",
    taxNameDescription: "Name of the tax (e.g. VAT, GST, Sales Tax)",
    taxNamePlaceholder: "VAT",
    taxIdentifier: "Tax Identifier",
    taxIdentifierDescription: "Your tax registration number",
    taxIdentifierPlaceholder: "VAT123456789",
    taxSettingsDescription: "Configure how tax is calculated and displayed",
    taxSettingsUpdated: "Tax Settings Updated",
    taxSettingsUpdatedDescription: "Your tax settings have been updated",
    taxRateDescription: "Default percentage applied to invoices",
    taxRatePlaceholder: "e.g. 20",
    taxRatePercentage: "Tax Rate (%)",
    taxRatePercentageDescription: "Percentage rate for tax calculation",
    taxRatePercentagePlaceholder: "e.g. 20",
    taxRatePercentageRequired: "Tax rate percentage is required",
    taxRatePercentageInvalid: "Tax rate must be a number between 0 and 100",
    taxRatePercentageMax: "Tax rate cannot exceed 100%",
    taxRatePercentageMin: "Tax rate cannot be negative",
    taxRatePercentageDecimal: "Tax rate can have up to 2 decimal places",
    taxRatePercentageFormat: "Tax rate must be a number",
    taxRatePercentageFormatDescription: "Enter a number between 0 and 100",
    taxRatePercentageFormatPlaceholder: "e.g. 20",
    taxRatePercentageFormatRequired: "Tax rate percentage is required",
    taxRatePercentageFormatInvalid:
      "Tax rate must be a number between 0 and 100",
    taxRatePercentageFormatMax: "Tax rate cannot exceed 100%",
    taxRatePercentageFormatMin: "Tax rate cannot be negative",
    taxRatePercentageFormatDecimal: "Tax rate can have up to 2 decimal places",
    taxRatePercentageFormatFormat: "Tax rate must be a number",
    taxRatePercentageFormatFormatDescription:
      "Enter a number between 0 and 100",
    taxRatePercentageFormatFormatPlaceholder: "e.g. 20",
    taxRatePercentageFormatFormatRequired: "Tax rate percentage is required",
    taxRatePercentageFormatFormatInvalid:
      "Tax rate must be a number between 0 and 100",
    taxRatePercentageFormatFormatMax: "Tax rate cannot exceed 100%",
    taxRatePercentageFormatFormatMin: "Tax rate cannot be negative",
    taxRatePercentageFormatFormatDecimal:
      "Tax rate can have up to 2 decimal places",
    taxRatePercentageFormatFormatFormat: "Tax rate must be a number",
    taxRatePercentageFormatFormatFormatDescription:
      "Enter a number between 0 and 100",
    taxRatePercentageFormatFormatFormatPlaceholder: "e.g. 20",
    taxRatePercentageFormatFormatFormatRequired:
      "Tax rate percentage is required",
    taxRatePercentageFormatFormatFormatInvalid:
      "Tax rate must be a number between 0 and 100",
    taxRatePercentageFormatFormatFormatMax: "Tax rate cannot exceed 100%",
    taxRatePercentageFormatFormatFormatMin: "Tax rate cannot be negative",
    taxRatePercentageFormatFormatFormatDecimal:
      "Tax rate can have up to 2 decimal places",
    taxRatePercentageFormatFormatFormatFormat: "Tax rate must be a number",
    taxRatePercentageFormatFormatFormatFormatDescription:
      "Enter a number between 0 and 100",
    taxRatePercentageFormatFormatFormatFormatPlaceholder: "e.g. 20",
    taxRatePercentageFormatFormatFormatFormatRequired:
      "Tax rate percentage is required",
    taxRatePercentageFormatFormatFormatFormatInvalid:
      "Tax rate must be a number between 0 and 100",
    taxRatePercentageFormatFormatFormatFormatMax: "Tax rate cannot exceed 100%",
    taxRatePercentageFormatFormatFormatFormatMin: "Tax rate cannot be negative",
    taxRatePercentageFormatFormatFormatFormatDecimal:
      "Tax rate can have up to 2 decimal places",
    taxRatePercentageFormatFormatFormatFormatFormat:
      "Tax rate must be a number",
    // Peppol related translations
    exportPeppol: "Export Peppol XML",
    peppolExportSuccess: "Peppol Export Successful",
    peppolExportSuccessDescription:
      "The invoice has been exported in Peppol format",
    peppolExportError: "Peppol Export Failed",
    peppolExportErrorDescription:
      "There was an error exporting the invoice to Peppol format",
    peppolSettings: "Peppol Settings",
    peppolComplianceInfo:
      "Peppol is a European e-invoicing standard required for business-to-government invoicing in Belgium. Complete these fields to ensure your invoices are Peppol compliant.",
    belgianVatNumber: "Belgian VAT Number",
    belgianVatNumberFormat:
      "Format: BE followed by 10 digits (e.g., BE0123456789)",
    enterpriseNumber: "Enterprise Number (KBO/BCE)",
    enterpriseNumberFormat: "Format: 10 digits (e.g., 0123456789)",
    peppolIdentifier: "Peppol Identifier",
    peppolIdentifierInfo:
      "Your Peppol Electronic Address Identifier (EAS). Format: 0088",
    generalInformation: "General Information",
    city: "City",
    postalCode: "Postal Code",
    countryCode: "Country Code",
    contactName: "Contact Name",
    invalidVatNumber: "Invalid VAT Number",
    pleaseEnterValidBelgianVatNumber: "Please enter a valid Belgian VAT number",
    invalidEnterpriseNumber: "Invalid Enterprise Number",
    pleaseEnterValidBelgianEnterpriseNumber:
      "Please enter a valid Belgian enterprise number",
    // API Integration related translations
    apiIntegration: "API Integration",
    apiKey: "API Key",
    validateApiKey: "Validate",
    apiKeyValid: "API key is valid",
    apiKeyInvalid: "API key is invalid",
    apiKeyValidated: "Your API key has been validated successfully",
    apiKeySaved: "Your API key has been saved successfully",
    apiKeyCleared: "Your API key has been removed",
    apiKeyRequired: "API Key Required",
    apiKeyMissing: "Please configure your API key in settings",
    apiDocumentation: "API Documentation",
    dataImport: "Data Import",
    importInvoiceData: "Import Invoice Data",
    importRegionalData: "Import Regional Data",
    importIndustryData: "Import Industry Data",
    dataImportSuccess: "Data Imported Successfully",
    dataImportError: "Data Import Failed",
    dataFusionIntegration: "DataFusion Integration",
    connectToDataFusion: "Connect to your DataFusion account",
    availableDataSources: "Available Data Sources",
    selectDataToImport: "Select which data you want to import from DataFusion",
    timeframe: "Timeframe",
    dimension: "Dimension",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    industry: "Industry",
    region: "Region",
    source: "Source",
    metricType: "Metric Type",
    value: "Value",
    noDataAvailable: "No data available for the selected criteria",
    manageYourApplicationSettings:
      "Manage your application settings and integrations",
    learnHowToIntegrate: "Learn how to integrate with our API",
    apiKeyInstructions:
      "To use the API integration, you'll need to generate an API key from your external software. The API key allows secure access to your data. Please refer to your external software's documentation for instructions on how to generate an API key.",
    supportedDataTypes: "Supported Data Types",
    invoicesImport: "Invoices - Import your existing invoices",
    clientsImport: "Clients - Import your client database",
    itemsImport: "Items - Import your product/service catalog",
  },
  fr: {},
  nl: {},
  de: {},
  es: {},
  pt: {},
  yue: {},
};
