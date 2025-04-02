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
  | "taxSettings"
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
  | "taxRatePercentageFormatFormatFormatFormatFormat";

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
    taxSettings: "Tax Settings",
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
  },
  fr: {
    downloadProject: "Télécharger le Projet",
    advancedGenerator: "Générateur Avancé",
    preview: "Aperçu",
    invoicePreview: "Aperçu de la Facture",
    downloadPDF: "Télécharger PDF",
    invoiceSaved: "Facture Enregistrée",
    invoiceSavedForClient:
      "Nouvelle facture pour {client} enregistrée avec succès",
    invoiceSavedDescription: "Votre facture a été enregistrée avec succès",
    billTo: "Facturer à",
    reset: "Réinitialiser",
    draft: "Brouillon",
    selectStatus: "Sélectionner le Statut",
    createInvoice: "Créer une Facture",
    editInvoice: "Modifier la Facture",
    dashboard: "Tableau de bord",
    invoices: "Factures",
    clients: "Clients",
    itemLibrary: "Bibliothèque d'articles",
    templates: "Modèles",
    companyProfile: "Profil de l'entreprise",
    settings: "Paramètres",
    logout: "Déconnexion",
    search: "Rechercher...",
    newInvoice: "Nouvelle facture",
    overview: "Aperçu",
    reports: "Rapports",
    analyticsOverview: "Aperçu des analyses",
    totalRevenue: "Revenu total",
    outstandingInvoices: "Factures en attente",
    paidInvoices: "Factures payées",
    overdueInvoices: "Factures en retard",
    averagePaymentTime: "Délai de paiement moyen",
    activeClients: "Clients actifs",
    totalInvoices: "Total des factures",
    conversionRate: "Taux de conversion",
    last30Days: "Les 30 derniers jours",
    awaitingPayment: "En attente de paiement",
    needsAttention: "Nécessite attention",
    fromInvoiceSent: "Depuis l'envoi de la facture",
    totalClientBase: "Base totale de clients",
    allTime: "Tout le temps",
    invoicesPaidOnTime: "Factures payées à temps",
    recentInvoices: "Factures récentes",
    searchInvoices: "Rechercher des factures...",
    invoice: "Facture",
    client: "Client",
    date: "Date",
    amount: "Montant",
    status: "Statut",
    actions: "Actions",
    viewInvoice: "Voir la facture",
    downloadInvoice: "Télécharger la facture",
    moreOptions: "Plus d'options",
    viewAllInvoices: "Voir toutes les factures",
    showing: "Affichage de",
    of: "sur",
    quickActions: "Actions rapides",
    frequentlyUsedActions:
      "Actions fréquemment utilisées pour la gestion des factures",
    createNewInvoice: "Créer une nouvelle facture",
    generateNewInvoice: "Générer une nouvelle facture pour un client",
    manageClients: "Gérer les clients",
    addEditClientInfo: "Ajouter ou modifier les informations client",
    itemLibraryAction: "Bibliothèque d'articles",
    manageProductsServices: "Gérer vos produits et services",
    templatesAction: "Modèles",
    browseSelectTemplates: "Parcourir et sélectionner des modèles de facture",
    customizeBranding: "Personnaliser la marque",
    updateColorsFontsLogo: "Mettre à jour les couleurs, polices et logo",
    companySettingsAction: "Paramètres de l'entreprise",
    updateCompanyProfile: "Mettre à jour le profil de votre entreprise",
    paid: "Payée",
    pending: "En attente",
    overdue: "En retard",
    notifications: "Notifications",
    helpResources: "Aide et ressources",
    myAccount: "Mon compte",
    profile: "Profil",
    admin: "Administrateur",
    loading: "Chargement...",
    days: "jours",
    back: "Retour",
    clientInformation: "Informations client",
    clientName: "Nom du client",
    selectClient: "Sélectionner un client",
    invoiceDetails: "Détails de la facture",
    issueDate: "Date d'émission",
    dueDate: "Date d'échéance",
    items: "Articles",
    description: "Description",
    quantity: "Quantité",
    rate: "Tarif",
    itemDescription: "Description de l'article",
    addItem: "Ajouter un article",
    subtotal: "Sous-total",
    tax: "Taxe",
    total: "Total",
    additionalInfo: "Informations supplémentaires",
    notes: "Notes",
    notesPlaceholder: "Ajoutez des notes ici...",
    terms: "Conditions",
    cancel: "Annuler",
    saveInvoice: "Enregistrer la facture",
    noInvoicesFound: "Aucune facture trouvée correspondant à votre recherche",
    noInvoicesYet: "Pas encore de factures. Créez votre première facture !",
    print: "Imprimer",
    download: "Télécharger",
    send: "Envoyer",
    from: "De",
    to: "À",
    invoiceNumber: "Numéro de facture",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    newClient: "Nouveau client",
    searchClients: "Rechercher des clients...",
    editClient: "Modifier le client",
    deleteClient: "Supprimer le client",
    address: "Adresse",
    save: "Enregistrer",
    clientDeleted: "Client supprimé",
    clientDeletedDescription: "Le client a été supprimé avec succès",
    clientUpdated: "Client mis à jour",
    clientUpdatedDescription: "Les informations du client ont été mises à jour",
    clientCreated: "Client créé",
    clientCreatedDescription: "Le nouveau client a été ajouté avec succès",
    newItem: "Nouvel article",
    searchItems: "Rechercher des articles...",
    price: "Prix",
    type: "Type",
    editItem: "Modifier l'article",
    deleteItem: "Supprimer l'article",
    noItemsFound: "Aucun article trouvé correspondant à votre recherche",
    noItemsYet: "Pas encore d'articles. Ajoutez votre premier article !",
    product: "Produit",
    service: "Service",
    itemDeleted: "Article supprimé",
    itemDeletedDescription: "L'article a été supprimé avec succès",
    itemUpdated: "Article mis à jour",
    itemUpdatedDescription:
      "Les informations de l'article ont été mises à jour",
    itemCreated: "Article créé",
    itemCreatedDescription: "Le nouvel article a été ajouté avec succès",
    searchTemplates: "Rechercher des modèles...",
    default: "Par défaut",
    noTemplatesFound: "Aucun modèle trouvé correspondant à votre recherche",
    noTemplatesYet: "Pas encore de modèles disponibles",
    templateSelected: "Modèle sélectionné",
    templateSelectedDescription: "Votre modèle de facture a été mis à jour",
    companyInformation: "Informations de l'entreprise",
    companyName: "Nom de l'entreprise",
    website: "Site web",
    taxId: "Numéro de TVA / Identifiant fiscal",
    uploadLogo: "Télécharger le logo",
    saveChanges: "Enregistrer les modifications",
    profileUpdated: "Profil mis à jour",
    profileUpdatedDescription: "Le profil de votre entreprise a été mis à jour",
    invoiceReports: "Rapports de factures",
    invoiceReportsDescription: "Voir des rapports détaillés sur vos factures",
    clientReports: "Rapports clients",
    clientReportsDescription: "Voir des rapports détaillés sur vos clients",
    financialReports: "Rapports financiers",
    financialReportsDescription:
      "Voir des rapports financiers et analyses détaillés",
    invoiceUpdated: "Facture mise à jour",
    invoiceUpdatedDescription: "La facture a été mise à jour avec succès",
    invoiceCreated: "Facture créée",
    invoiceCreatedDescription: "La nouvelle facture a été créée avec succès",
    invoiceDeleted: "Facture supprimée",
    invoiceDeletedDescription: "La facture a été supprimée avec succès",
    customize: "Personnaliser",
    customizeTemplate: "Personnaliser le modèle",
    previewTemplate: "Aperçu du modèle",
    layout: "Mise en page",
    colors: "Couleurs",
    fonts: "Polices",
    margins: "Marges",
    layoutSettings: "Paramètres de mise en page",
    colorSettings: "Paramètres de couleur",
    fontSettings: "Paramètres de police",
    marginSettings: "Paramètres de marge",
    logoPosition: "Position du logo",
    companyInfoPosition: "Position des informations de l'entreprise",
    clientInfoPosition: "Position des informations du client",
    showFooter: "Afficher le pied de page",
    topLeft: "En haut à gauche",
    topCenter: "En haut au centre",
    topRight: "En haut à droite",
    left: "Gauche",
    right: "Droite",
    bottom: "Bas",
    showLogo: "Afficher le logo",
    invoiceDetailsPosition: "Position des détails de la facture",
    invoiceDetails: "Détails de la facture",
    active: "Actif",
    inactive: "Inactif",
    revenue: "Revenu",
    revenueTrend: "Tendance des revenus",
    invoiceStatus: "Statut de la facture",
    clientActivity: "Activité du client",
    errorGeneratingPDF: "Erreur lors de la génération du PDF",
    emailSent: "Email envoyé avec succès",
    emailSentToClient: "Email de facture envoyé à {client}",
    emailSentDescription: "Votre facture a été envoyée avec succès",
    pdfGenerated: "PDF généré",
    pdfGeneratedDescription: "Votre PDF de facture a été généré avec succès",
    billTo: "Facturer à",
    primaryColor: "Couleur primaire",
    secondaryColor: "Couleur secondaire",
    backgroundColor: "Couleur de fond",
    textColor: "Couleur du texte",
    headingFont: "Police des titres",
    bodyFont: "Police du corps",
    headingSize: "Taille des titres",
    bodySize: "Taille du corps",
    topMargin: "Marge supérieure",
    rightMargin: "Marge droite",
    bottomMargin: "Marge inférieure",
    leftMargin: "Marge gauche",
    selectTemplate: "Sélectionner un modèle",
    templateCustomized: "Modèle personnalisé",
    templateCustomizedDescription:
      "Votre personnalisation de modèle a été enregistrée",
    custom: "Personnalisé",
    dragToPosition: "Glisser pour positionner",
    previewBeforeDownload: "Aperçu avant téléchargement",
    exactPreview:
      "Cet aperçu correspond exactement à l'apparence de votre facture lors du téléchargement",
    changeStatus: "Changer le statut",
    statusUpdated: "Statut mis à jour",
    statusUpdatedDescription:
      "Le statut de la facture a été mis à jour avec succès",
    currency: "Devise",
    currencyNote: "Cette devise sera utilisée dans toute l'application",
    taxDue: "TVA/Taxe due",
    toBeRemitted: "À remettre",
    currencySettings: "Paramètres de devise",
    selectCurrency: "Sélectionner une devise",
    currencySymbol: "Symbole de devise",
    currencyUpdated: "Devise mise à jour",
    currencyUpdatedDescription: "Vos paramètres de devise ont été mis à jour",
    taxSettings: "Paramètres de taxe",
    defaultTaxRate: "Taux de taxe par défaut",
    taxRateUpdated: "Taux de taxe mis à jour",
    taxRateUpdatedDescription: "Votre taux de taxe par défaut a été mis à jour",
    taxIncluded: "Taxe incluse",
    taxExcluded: "Taxe exclue",
    taxCalculation: "Calcul de la taxe",
    taxCalculationDescription: "Comment la taxe est calculée sur vos factures",
    taxName: "Nom de la taxe",
    taxNameDescription: "Nom de la taxe (ex. TVA, TPS, Taxe de vente)",
    taxNamePlaceholder: "TVA",
    taxIdentifier: "Identifiant fiscal",
    taxIdentifierDescription: "Votre numéro d'enregistrement fiscal",
    taxIdentifierPlaceholder: "TVA123456789",
    taxSettings: "Paramètres de taxe",
    taxSettingsDescription:
      "Configurer comment la taxe est calculée et affichée",
    taxSettingsUpdated: "Paramètres de taxe mis à jour",
    taxSettingsUpdatedDescription: "Vos paramètres de taxe ont été mis à jour",
    taxRateDescription: "Pourcentage par défaut appliqué aux factures",
    taxRatePlaceholder: "ex. 20",
    taxRatePercentage: "Taux de taxe (%)",
    taxRatePercentageDescription:
      "Taux en pourcentage pour le calcul de la taxe",
    taxRatePercentagePlaceholder: "ex. 20",
    taxRatePercentageRequired: "Le pourcentage du taux de taxe est requis",
    taxRatePercentageInvalid:
      "Le taux de taxe doit être un nombre entre 0 et 100",
    taxRatePercentageMax: "Le taux de taxe ne peut pas dépasser 100%",
    taxRatePercentageMin: "Le taux de taxe ne peut pas être négatif",
    taxRatePercentageDecimal: "Le taux de taxe peut avoir jusqu'à 2 décimales",
    taxRatePercentageFormat: "Le taux de taxe doit être un nombre",
    taxRatePercentageFormatDescription: "Entrez un nombre entre 0 et 100",
    taxRatePercentageFormatPlaceholder: "ex. 20",
    taxRatePercentageFormatRequired:
      "Le pourcentage du taux de taxe est requis",
    taxRatePercentageFormatInvalid:
      "Le taux de taxe doit être un nombre entre 0 et 100",
    taxRatePercentageFormatMax: "Le taux de taxe ne peut pas dépasser 100%",
    taxRatePercentageFormatMin: "Le taux de taxe ne peut pas être négatif",
    taxRatePercentageFormatDecimal:
      "Le taux de taxe peut avoir jusqu'à 2 décimales",
    taxRatePercentageFormatFormat: "Le taux de taxe doit être un nombre",
    taxRatePercentageFormatFormatDescription: "Entrez un nombre entre 0 et 100",
    taxRatePercentageFormatFormatPlaceholder: "ex. 20",
    taxRatePercentageFormatFormatRequired:
      "Le pourcentage du taux de taxe est requis",
    taxRatePercentageFormatFormatInvalid:
      "Le taux de taxe doit être un nombre entre 0 et 100",
    taxRatePercentageFormatFormatMax:
      "Le taux de taxe ne peut pas dépasser 100%",
    taxRatePercentageFormatFormatMin:
      "Le taux de taxe ne peut pas être négatif",
    taxRatePercentageFormatFormatDecimal:
      "Le taux de taxe peut avoir jusqu'à 2 décimales",
    taxRatePercentageFormatFormatFormat: "Le taux de taxe doit être un nombre",
    taxRatePercentageFormatFormatFormatDescription:
      "Entrez un nombre entre 0 et 100",
    taxRatePercentageFormatFormatFormatPlaceholder: "ex. 20",
    taxRatePercentageFormatFormatFormatRequired:
      "Le pourcentage du taux de taxe est requis",
    taxRatePercentageFormatFormatFormatInvalid:
      "Le taux de taxe doit être un nombre entre 0 et 100",
    taxRatePercentageFormatFormatFormatMax:
      "Le taux de taxe ne peut pas dépasser 100%",
    taxRatePercentageFormatFormatFormatMin:
      "Le taux de taxe ne peut pas être négatif",
    taxRatePercentageFormatFormatFormatDecimal:
      "Le taux de taxe peut avoir jusqu'à 2 décimales",
    taxRatePercentageFormatFormatFormatFormat:
      "Le taux de taxe doit être un nombre",
    taxRatePercentageFormatFormatFormatFormatDescription:
      "Entrez un nombre entre 0 et 100",
    taxRatePercentageFormatFormatFormatFormatPlaceholder: "ex. 20",
    taxRatePercentageFormatFormatFormatFormatRequired:
      "Le pourcentage du taux de taxe est requis",
    taxRatePercentageFormatFormatFormatFormatInvalid:
      "Le taux de taxe doit être un nombre entre 0 et 100",
    taxRatePercentageFormatFormatFormatFormatMax:
      "Le taux de taxe ne peut pas dépasser 100%",
    taxRatePercentageFormatFormatFormatFormatMin:
      "Le taux de taxe ne peut pas être négatif",
    taxRatePercentageFormatFormatFormatFormatDecimal:
      "Le taux de taxe peut avoir jusqu'à 2 décimales",
    taxRatePercentageFormatFormatFormatFormatFormat:
      "Le taux de taxe doit être un nombre",
  },
  nl: {
    // Dutch translations would go here
    downloadProject: "Project Downloaden",
    advancedGenerator: "Geavanceerde Generator",
    preview: "Voorbeeld",
    invoicePreview: "Factuurvoorbeeld",
    downloadPDF: "PDF Downloaden",
    invoiceSaved: "Factuur Opgeslagen",
    invoiceSavedForClient:
      "Nieuwe factuur voor {client} is succesvol opgeslagen",
    invoiceSavedDescription: "Uw factuur is succesvol opgeslagen",
    billTo: "Factureren aan",
    reset: "Resetten",
    draft: "Concept",
    selectStatus: "Status Selecteren",
    createInvoice: "Factuur Aanmaken",
    editInvoice: "Factuur Bewerken",
    dashboard: "Dashboard",
    invoices: "Facturen",
    clients: "Klanten",
    itemLibrary: "Artikelbibliotheek",
    templates: "Sjablonen",
    companyProfile: "Bedrijfsprofiel",
    settings: "Instellingen",
    logout: "Uitloggen",
    search: "Zoeken...",
    newInvoice: "Nieuwe Factuur",
    overview: "Overzicht",
    reports: "Rapporten",
    analyticsOverview: "Analytisch Overzicht",
    totalRevenue: "Totale Omzet",
    outstandingInvoices: "Openstaande Facturen",
    paidInvoices: "Betaalde Facturen",
    overdueInvoices: "Achterstallige Facturen",
    averagePaymentTime: "Gemiddelde Betaaltijd",
    activeClients: "Actieve Klanten",
    totalInvoices: "Totaal Aantal Facturen",
    conversionRate: "Conversiepercentage",
    last30Days: "Laatste 30 dagen",
    awaitingPayment: "Wachtend op betaling",
    needsAttention: "Vereist aandacht",
    fromInvoiceSent: "Vanaf factuur verzonden",
    totalClientBase: "Totale klantenbasis",
    allTime: "Alle tijden",
    invoicesPaidOnTime: "Facturen op tijd betaald",
    recentInvoices: "Recente Facturen",
    searchInvoices: "Facturen zoeken...",
    invoice: "Factuur",
    client: "Klant",
    date: "Datum",
    amount: "Bedrag",
    status: "Status",
    actions: "Acties",
    viewInvoice: "Factuur Bekijken",
    downloadInvoice: "Factuur Downloaden",
    moreOptions: "Meer Opties",
    viewAllInvoices: "Alle Facturen Bekijken",
    showing: "Tonen",
    of: "van",
    quickActions: "Snelle Acties",
    frequentlyUsedActions: "Veelgebruikte acties voor factuurbeheer",
    createNewInvoice: "Nieuwe Factuur Maken",
    generateNewInvoice: "Genereer een nieuwe factuur voor een klant",
    manageClients: "Klanten Beheren",
    addEditClientInfo: "Klantinformatie toevoegen of bewerken",
    itemLibraryAction: "Artikelbibliotheek",
    manageProductsServices: "Beheer uw producten en diensten",
    templatesAction: "Sjablonen",
    browseSelectTemplates: "Blader door en selecteer factuursjablonen",
    customizeBranding: "Branding Aanpassen",
    updateColorsFontsLogo: "Kleuren, lettertypen en logo bijwerken",
    companySettingsAction: "Bedrijfsinstellingen",
    updateCompanyProfile: "Werk uw bedrijfsprofiel bij",
    paid: "Betaald",
    pending: "In behandeling",
    overdue: "Te laat",
    notifications: "Meldingen",
    helpResources: "Hulp & Bronnen",
    myAccount: "Mijn Account",
    profile: "Profiel",
    admin: "Beheerder",
    loading: "Laden...",
    days: "dagen",
    back: "Terug",
  },
  de: {
    downloadProject: "Projekt Herunterladen",
    advancedGenerator: "Erweiterter Generator",
    preview: "Vorschau",
    invoicePreview: "Rechnungsvorschau",
    downloadPDF: "PDF Herunterladen",
    invoiceSaved: "Rechnung Gespeichert",
    invoiceSavedForClient:
      "Neue Rechnung für {client} wurde erfolgreich gespeichert",
    invoiceSavedDescription: "Ihre Rechnung wurde erfolgreich gespeichert",
    billTo: "Rechnung an",
    reset: "Zurücksetzen",
    draft: "Entwurf",
    selectStatus: "Status Auswählen",
    createInvoice: "Rechnung Erstellen",
    editInvoice: "Rechnung Bearbeiten",
    dashboard: "Dashboard",
    invoices: "Rechnungen",
    clients: "Kunden",
    itemLibrary: "Artikelbibliothek",
    templates: "Vorlagen",
    companyProfile: "Firmenprofil",
    settings: "Einstellungen",
    logout: "Abmelden",
    search: "Suchen...",
    newInvoice: "Neue Rechnung",
    overview: "Übersicht",
    reports: "Berichte",
    analyticsOverview: "Analyseübersicht",
    totalRevenue: "Gesamtumsatz",
    outstandingInvoices: "Ausstehende Rechnungen",
    paidInvoices: "Bezahlte Rechnungen",
    overdueInvoices: "Überfällige Rechnungen",
    averagePaymentTime: "Durchschnittliche Zahlungszeit",
    activeClients: "Aktive Kunden",
    totalInvoices: "Gesamtzahl der Rechnungen",
    conversionRate: "Konversionsrate",
    last30Days: "Letzte 30 Tage",
    awaitingPayment: "Warten auf Zahlung",
    needsAttention: "Benötigt Aufmerksamkeit",
    fromInvoiceSent: "Seit Rechnungsversand",
    totalClientBase: "Gesamte Kundenbasis",
    allTime: "Gesamtzeitraum",
    invoicesPaidOnTime: "Pünktlich bezahlte Rechnungen",
    recentInvoices: "Aktuelle Rechnungen",
    searchInvoices: "Rechnungen suchen...",
    invoice: "Rechnung",
    client: "Kunde",
    date: "Datum",
    amount: "Betrag",
    status: "Status",
    actions: "Aktionen",
    viewInvoice: "Rechnung Anzeigen",
    downloadInvoice: "Rechnung Herunterladen",
    moreOptions: "Weitere Optionen",
    viewAllInvoices: "Alle Rechnungen Anzeigen",
    showing: "Anzeige von",
    of: "von",
    quickActions: "Schnellaktionen",
    frequentlyUsedActions:
      "Häufig verwendete Aktionen für die Rechnungsverwaltung",
    createNewInvoice: "Neue Rechnung Erstellen",
    generateNewInvoice: "Neue Rechnung für einen Kunden erstellen",
    manageClients: "Kunden Verwalten",
    addEditClientInfo: "Kundeninformationen hinzufügen oder bearbeiten",
    itemLibraryAction: "Artikelbibliothek",
    manageProductsServices: "Verwalten Sie Ihre Produkte und Dienstleistungen",
    templatesAction: "Vorlagen",
    browseSelectTemplates: "Durchsuchen und Auswählen von Rechnungsvorlagen",
    customizeBranding: "Branding Anpassen",
    updateColorsFontsLogo: "Farben, Schriftarten und Logo aktualisieren",
    companySettingsAction: "Firmeneinstellungen",
    updateCompanyProfile: "Aktualisieren Sie Ihr Firmenprofil",
    paid: "Bezahlt",
    pending: "Ausstehend",
    overdue: "Überfällig",
    notifications: "Benachrichtigungen",
    helpResources: "Hilfe & Ressourcen",
    myAccount: "Mein Konto",
    profile: "Profil",
    admin: "Administrator",
    loading: "Wird geladen...",
    days: "Tage",
    back: "Zurück",
    clientInformation: "Kundeninformationen",
    clientName: "Kundenname",
    selectClient: "Kunden auswählen",
    invoiceDetails: "Rechnungsdetails",
    issueDate: "Ausstellungsdatum",
    dueDate: "Fälligkeitsdatum",
    items: "Artikel",
    description: "Beschreibung",
    quantity: "Menge",
    rate: "Preis",
    itemDescription: "Artikelbeschreibung",
    addItem: "Artikel Hinzufügen",
    subtotal: "Zwischensumme",
    tax: "Steuer",
    total: "Gesamt",
    additionalInfo: "Zusätzliche Informationen",
    notes: "Notizen",
    notesPlaceholder: "Fügen Sie hier Notizen hinzu...",
    terms: "Bedingungen",
    cancel: "Abbrechen",
    saveInvoice: "Rechnung Speichern",
    noInvoicesFound: "Keine Rechnungen gefunden, die Ihrer Suche entsprechen",
    noInvoicesYet: "Noch keine Rechnungen. Erstellen Sie Ihre erste Rechnung!",
    print: "Drucken",
    download: "Herunterladen",
    send: "Senden",
    from: "Von",
    to: "An",
    invoiceNumber: "Rechnungsnummer",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    newClient: "Neuer Kunde",
    searchClients: "Kunden suchen...",
    editClient: "Kunde Bearbeiten",
    deleteClient: "Kunde Löschen",
    address: "Adresse",
    save: "Speichern",
    clientDeleted: "Kunde Gelöscht",
    clientDeletedDescription: "Der Kunde wurde erfolgreich gelöscht",
    clientUpdated: "Kunde Aktualisiert",
    clientUpdatedDescription: "Die Kundeninformationen wurden aktualisiert",
    clientCreated: "Kunde Erstellt",
    clientCreatedDescription: "Der neue Kunde wurde erfolgreich hinzugefügt",
    newItem: "Neuer Artikel",
    searchItems: "Artikel suchen...",
    price: "Preis",
    type: "Typ",
    editItem: "Artikel Bearbeiten",
    deleteItem: "Artikel Löschen",
    noItemsFound: "Keine Artikel gefunden, die Ihrer Suche entsprechen",
    noItemsYet: "Noch keine Artikel. Fügen Sie Ihren ersten Artikel hinzu!",
    product: "Produkt",
    service: "Dienstleistung",
    itemDeleted: "Artikel Gelöscht",
    itemDeletedDescription: "Der Artikel wurde erfolgreich gelöscht",
    itemUpdated: "Artikel Aktualisiert",
    itemUpdatedDescription: "Die Artikelinformationen wurden aktualisiert",
    itemCreated: "Artikel Erstellt",
    itemCreatedDescription: "Der neue Artikel wurde erfolgreich hinzugefügt",
    searchTemplates: "Vorlagen suchen...",
    default: "Standard",
    noTemplatesFound: "Keine Vorlagen gefunden, die Ihrer Suche entsprechen",
    noTemplatesYet: "Noch keine Vorlagen verfügbar",
    templateSelected: "Vorlage Ausgewählt",
    templateSelectedDescription: "Ihre Rechnungsvorlage wurde aktualisiert",
    companyInformation: "Unternehmensinformationen",
    companyName: "Unternehmensname",
    website: "Webseite",
    taxId: "Steuer-ID / USt-IdNr.",
    uploadLogo: "Logo Hochladen",
    saveChanges: "Änderungen Speichern",
    profileUpdated: "Profil Aktualisiert",
    profileUpdatedDescription: "Ihr Unternehmensprofil wurde aktualisiert",
  },
  es: {
    // Spanish translations
    downloadProject: "Descargar Proyecto",
    advancedGenerator: "Generador Avanzado",
    preview: "Vista Previa",
    invoicePreview: "Vista Previa de Factura",
    downloadPDF: "Descargar PDF",
    invoiceSaved: "Factura Guardada",
    invoiceSavedForClient: "Nueva factura para {client} guardada con éxito",
    invoiceSavedDescription: "Su factura ha sido guardada con éxito",
    billTo: "Facturar a",
    reset: "Restablecer",
    draft: "Borrador",
    selectStatus: "Seleccionar Estado",
    createInvoice: "Crear Factura",
    editInvoice: "Editar Factura",
    dashboard: "Panel de Control",
    invoices: "Facturas",
    clients: "Clientes",
    itemLibrary: "Biblioteca de Artículos",
    templates: "Plantillas",
    companyProfile: "Perfil de la Empresa",
    settings: "Configuración",
    logout: "Cerrar Sesión",
    search: "Buscar...",
    newInvoice: "Nueva Factura",
    overview: "Resumen",
    reports: "Informes",
    analyticsOverview: "Resumen Analítico",
    totalRevenue: "Ingresos Totales",
    outstandingInvoices: "Facturas Pendientes",
    paidInvoices: "Facturas Pagadas",
    overdueInvoices: "Facturas Vencidas",
    averagePaymentTime: "Tiempo Medio de Pago",
    activeClients: "Clientes Activos",
    totalInvoices: "Total de Facturas",
    conversionRate: "Tasa de Conversión",
    last30Days: "Últimos 30 días",
    awaitingPayment: "Esperando pago",
    needsAttention: "Necesita atención",
    fromInvoiceSent: "Desde envío de factura",
    totalClientBase: "Base total de clientes",
    allTime: "Todo el tiempo",
    invoicesPaidOnTime: "Facturas pagadas a tiempo",
    recentInvoices: "Facturas Recientes",
    searchInvoices: "Buscar facturas...",
    invoice: "Factura",
    client: "Cliente",
    date: "Fecha",
    amount: "Importe",
    status: "Estado",
    actions: "Acciones",
    viewInvoice: "Ver Factura",
    downloadInvoice: "Descargar Factura",
    moreOptions: "Más Opciones",
    viewAllInvoices: "Ver Todas las Facturas",
    showing: "Mostrando",
    of: "de",
    quickActions: "Acciones Rápidas",
    frequentlyUsedActions:
      "Acciones frecuentemente utilizadas para la gestión de facturas",
    createNewInvoice: "Crear Nueva Factura",
    generateNewInvoice: "Generar una nueva factura para un cliente",
    manageClients: "Gestionar Clientes",
    addEditClientInfo: "Añadir o editar información de cliente",
    itemLibraryAction: "Biblioteca de Artículos",
    manageProductsServices: "Gestionar sus productos y servicios",
    templatesAction: "Plantillas",
    browseSelectTemplates: "Explorar y seleccionar plantillas de facturas",
    customizeBranding: "Personalizar Marca",
    updateColorsFontsLogo: "Actualizar colores, fuentes y logo",
    companySettingsAction: "Configuración de la Empresa",
    updateCompanyProfile: "Actualizar el perfil de su empresa",
    paid: "Pagada",
    pending: "Pendiente",
    overdue: "Vencida",
    notifications: "Notificaciones",
    helpResources: "Ayuda y Recursos",
    myAccount: "Mi Cuenta",
    profile: "Perfil",
    admin: "Administrador",
    loading: "Cargando...",
    days: "días",
    back: "Volver",
  },
  pt: {
    // Portuguese translations
    downloadProject: "Baixar Projeto",
    advancedGenerator: "Gerador Avançado",
    preview: "Pré-visualização",
    invoicePreview: "Pré-visualização da Fatura",
    downloadPDF: "Baixar PDF",
    invoiceSaved: "Fatura Salva",
    invoiceSavedForClient: "Nova fatura para {client} foi salva com sucesso",
    invoiceSavedDescription: "Sua fatura foi salva com sucesso",
    billTo: "Faturar para",
    reset: "Redefinir",
    draft: "Rascunho",
    selectStatus: "Selecionar Status",
    createInvoice: "Criar Fatura",
    editInvoice: "Editar Fatura",
    dashboard: "Painel",
    invoices: "Faturas",
    clients: "Clientes",
    itemLibrary: "Biblioteca de Itens",
    templates: "Modelos",
    companyProfile: "Perfil da Empresa",
    settings: "Configurações",
    logout: "Sair",
    search: "Pesquisar...",
    newInvoice: "Nova Fatura",
    overview: "Visão Geral",
    reports: "Relatórios",
    analyticsOverview: "Visão Geral Analítica",
    totalRevenue: "Receita Total",
    outstandingInvoices: "Faturas Pendentes",
    paidInvoices: "Faturas Pagas",
    overdueInvoices: "Faturas Vencidas",
    averagePaymentTime: "Tempo Médio de Pagamento",
    activeClients: "Clientes Ativos",
    totalInvoices: "Total de Faturas",
    conversionRate: "Taxa de Conversão",
    last30Days: "Últimos 30 dias",
    awaitingPayment: "Aguardando pagamento",
    needsAttention: "Precisa de atenção",
    fromInvoiceSent: "Desde o envio da fatura",
    totalClientBase: "Base total de clientes",
    allTime: "Todo o tempo",
    invoicesPaidOnTime: "Faturas pagas em dia",
    recentInvoices: "Faturas Recentes",
    searchInvoices: "Pesquisar faturas...",
    invoice: "Fatura",
    client: "Cliente",
    date: "Data",
    amount: "Valor",
    status: "Status",
    actions: "Ações",
    viewInvoice: "Ver Fatura",
    downloadInvoice: "Baixar Fatura",
    moreOptions: "Mais Opções",
    viewAllInvoices: "Ver Todas as Faturas",
    showing: "Mostrando",
    of: "de",
    quickActions: "Ações Rápidas",
    frequentlyUsedActions:
      "Ações frequentemente usadas para gerenciamento de faturas",
    createNewInvoice: "Criar Nova Fatura",
    generateNewInvoice: "Gerar uma nova fatura para um cliente",
    manageClients: "Gerenciar Clientes",
    addEditClientInfo: "Adicionar ou editar informações de cliente",
    itemLibraryAction: "Biblioteca de Itens",
    manageProductsServices: "Gerenciar seus produtos e serviços",
    templatesAction: "Modelos",
    browseSelectTemplates: "Navegar e selecionar modelos de fatura",
    customizeBranding: "Personalizar Marca",
    updateColorsFontsLogo: "Atualizar cores, fontes e logo",
    companySettingsAction: "Configurações da Empresa",
    updateCompanyProfile: "Atualizar o perfil da sua empresa",
    paid: "Paga",
    pending: "Pendente",
    overdue: "Vencida",
    notifications: "Notificações",
    helpResources: "Ajuda e Recursos",
    myAccount: "Minha Conta",
    profile: "Perfil",
    admin: "Administrador",
    loading: "Carregando...",
    days: "dias",
    back: "Voltar",
  },
  yue: {
    // Cantonese translations
    downloadProject: "下載項目",
    advancedGenerator: "進階生成器",
    preview: "預覽",
    invoicePreview: "發票預覽",
    downloadPDF: "下載PDF",
    invoiceSaved: "發票已保存",
    invoiceSavedForClient: "已成功保存{client}嘅新發票",
    invoiceSavedDescription: "你嘅發票已成功保存",
    billTo: "收費對象",
    reset: "重設",
    draft: "草稿",
    selectStatus: "選擇狀態",
    createInvoice: "創建發票",
    editInvoice: "編輯發票",
    dashboard: "儀表板",
    invoices: "發票",
    clients: "客戶",
    itemLibrary: "項目庫",
    templates: "模板",
    companyProfile: "公司資料",
    settings: "設定",
    logout: "登出",
    search: "搜尋...",
    newInvoice: "新發票",
    overview: "概覽",
    reports: "報告",
    analyticsOverview: "分析概覽",
    totalRevenue: "總收入",
    outstandingInvoices: "未付發票",
    paidInvoices: "已付發票",
    overdueInvoices: "逾期發票",
    averagePaymentTime: "平均付款時間",
    activeClients: "活躍客戶",
    totalInvoices: "總發票數",
    conversionRate: "轉換率",
    last30Days: "過去30日",
    awaitingPayment: "等待付款",
    needsAttention: "需要注意",
    fromInvoiceSent: "自發票發出",
    totalClientBase: "總客戶基礎",
    allTime: "所有時間",
    invoicesPaidOnTime: "準時支付嘅發票",
    recentInvoices: "最近發票",
    searchInvoices: "搜尋發票...",
    invoice: "發票",
    client: "客戶",
    date: "日期",
    amount: "金額",
    status: "狀態",
    actions: "操作",
    viewInvoice: "查看發票",
    downloadInvoice: "下載發票",
    moreOptions: "更多選項",
    viewAllInvoices: "查看所有發票",
    showing: "顯示",
    of: "共",
    quickActions: "快速操作",
    frequentlyUsedActions: "常用嘅發票管理操作",
    createNewInvoice: "創建新發票",
    generateNewInvoice: "為客戶生成新發票",
    manageClients: "管理客戶",
    addEditClientInfo: "添加或編輯客戶資料",
    itemLibraryAction: "項目庫",
    manageProductsServices: "管理你嘅產品同服務",
    templatesAction: "模板",
    browseSelectTemplates: "瀏覽同選擇發票模板",
    customizeBranding: "自定義品牌",
    updateColorsFontsLogo: "更新顏色、字體同標誌",
    companySettingsAction: "公司設定",
    updateCompanyProfile: "更新你嘅公司資料",
    paid: "已付",
    pending: "待處理",
    overdue: "逾期",
    notifications: "通知",
    helpResources: "幫助同資源",
    myAccount: "我嘅帳戶",
    profile: "個人資料",
    admin: "管理員",
    loading: "載入中...",
    days: "日",
    back: "返回",
    clientInformation: "客戶資料",
    clientName: "客戶名稱",
    selectClient: "選擇客戶",
    invoiceDetails: "發票詳情",
    issueDate: "發出日期",
    dueDate: "到期日期",
    items: "項目",
    description: "描述",
    quantity: "數量",
    rate: "單價",
    itemDescription: "項目描述",
    addItem: "添加項目",
    subtotal: "小計",
    tax: "稅項",
    total: "總計",
    additionalInfo: "附加資料",
    notes: "備註",
    notesPlaceholder: "在此添加備註...",
    terms: "條款",
    cancel: "取消",
    saveInvoice: "保存發票",
    noInvoicesFound: "找不到符合搜尋條件嘅發票",
    noInvoicesYet: "仲未有發票。創建你嘅第一張發票！",
    print: "打印",
    download: "下載",
    send: "發送",
    from: "由",
    to: "至",
    invoiceNumber: "發票編號",
    name: "名稱",
    email: "電郵",
    phone: "電話",
    newClient: "新客戶",
    searchClients: "搜尋客戶...",
    editClient: "編輯客戶",
    deleteClient: "刪除客戶",
    address: "地址",
    save: "保存",
    clientDeleted: "客戶已刪除",
    clientDeletedDescription: "客戶已成功刪除",
    clientUpdated: "客戶已更新",
    clientUpdatedDescription: "客戶資料已更新",
    clientCreated: "客戶已創建",
    clientCreatedDescription: "新客戶已成功添加",
  },
};
