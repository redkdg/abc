export type Language = "en" | "fr" | "nl";

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
  | "statusUpdatedDescription";

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
    bottom: "En bas",
    showLogo: "Afficher le logo",
    invoiceDetailsPosition: "Position des détails de la facture",
    invoiceDetails: "Détails de la facture",
    active: "Actif",
    inactive: "Inactif",
    revenue: "Revenu",
    revenueTrend: "Tendance des revenus",
    invoiceStatus: "Statut de la facture",
    clientActivity: "Activité client",
    errorGeneratingPDF: "Erreur lors de la génération du PDF",
    emailSent: "Email envoyé avec succès",
    emailSentToClient: "Email de facture envoyé à {client}",
    emailSentDescription: "Votre facture a été envoyée avec succès",
    pdfGenerated: "PDF généré",
    pdfGeneratedDescription: "Votre PDF de facture a été généré avec succès",
    billTo: "Facturer à",
    primaryColor: "Couleur principale",
    secondaryColor: "Couleur secondaire",
    backgroundColor: "Couleur d'arrière-plan",
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
  },
  nl: {
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
    createNewInvoice: "Nieuwe Factuur Aanmaken",
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
    overdue: "Achterstallig",
    notifications: "Meldingen",
    helpResources: "Hulp & Bronnen",
    myAccount: "Mijn Account",
    profile: "Profiel",
    admin: "Beheerder",
    loading: "Laden...",
    days: "dagen",
    back: "Terug",
    clientInformation: "Klantinformatie",
    clientName: "Klantnaam",
    selectClient: "Selecteer een klant",
    invoiceDetails: "Factuurdetails",
    issueDate: "Uitgiftedatum",
    dueDate: "Vervaldatum",
    items: "Artikelen",
    description: "Omschrijving",
    quantity: "Aantal",
    rate: "Tarief",
    itemDescription: "Artikelomschrijving",
    addItem: "Artikel Toevoegen",
    subtotal: "Subtotaal",
    tax: "Belasting",
    total: "Totaal",
    additionalInfo: "Aanvullende Informatie",
    notes: "Notities",
    notesPlaceholder: "Voeg hier notities toe...",
    terms: "Voorwaarden",
    cancel: "Annuleren",
    saveInvoice: "Factuur Opslaan",
    noInvoicesFound:
      "Geen facturen gevonden die overeenkomen met uw zoekopdracht",
    noInvoicesYet: "Nog geen facturen. Maak uw eerste factuur aan!",
    print: "Afdrukken",
    download: "Downloaden",
    send: "Verzenden",
    from: "Van",
    to: "Aan",
    invoiceNumber: "Factuurnummer",
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    newClient: "Nieuwe Klant",
    searchClients: "Klanten zoeken...",
    editClient: "Klant Bewerken",
    deleteClient: "Klant Verwijderen",
    address: "Adres",
    save: "Opslaan",
    clientDeleted: "Klant Verwijderd",
    clientDeletedDescription: "De klant is succesvol verwijderd",
    clientUpdated: "Klant Bijgewerkt",
    clientUpdatedDescription: "De klantinformatie is bijgewerkt",
    clientCreated: "Klant Aangemaakt",
    clientCreatedDescription: "De nieuwe klant is succesvol toegevoegd",
    newItem: "Nieuw Artikel",
    searchItems: "Artikelen zoeken...",
    price: "Prijs",
    type: "Type",
    editItem: "Artikel Bewerken",
    deleteItem: "Artikel Verwijderen",
    noItemsFound:
      "Geen artikelen gevonden die overeenkomen met uw zoekopdracht",
    noItemsYet: "Nog geen artikelen. Voeg uw eerste artikel toe!",
    product: "Product",
    service: "Dienst",
    itemDeleted: "Artikel Verwijderd",
    itemDeletedDescription: "Het artikel is succesvol verwijderd",
    itemUpdated: "Artikel Bijgewerkt",
    itemUpdatedDescription: "De artikelinformatie is bijgewerkt",
    itemCreated: "Artikel Aangemaakt",
    itemCreatedDescription: "Het nieuwe artikel is succesvol toegevoegd",
    searchTemplates: "Sjablonen zoeken...",
    default: "Standaard",
    noTemplatesFound:
      "Geen sjablonen gevonden die overeenkomen met uw zoekopdracht",
    noTemplatesYet: "Nog geen sjablonen beschikbaar",
    templateSelected: "Sjabloon Geselecteerd",
    templateSelectedDescription: "Uw factuursjabloon is bijgewerkt",
    companyInformation: "Bedrijfsinformatie",
    companyName: "Bedrijfsnaam",
    website: "Website",
    taxId: "BTW-nummer / Fiscaal Nummer",
    uploadLogo: "Logo Uploaden",
    saveChanges: "Wijzigingen Opslaan",
    profileUpdated: "Profiel Bijgewerkt",
    profileUpdatedDescription: "Uw bedrijfsprofiel is bijgewerkt",
    invoiceReports: "Factuurrapportages",
    invoiceReportsDescription:
      "Bekijk gedetailleerde rapporten over uw facturen",
    clientReports: "Klantenrapportages",
    clientReportsDescription: "Bekijk gedetailleerde rapporten over uw klanten",
    financialReports: "Financiële Rapportages",
    financialReportsDescription:
      "Bekijk gedetailleerde financiële rapporten en analyses",
    invoiceUpdated: "Factuur Bijgewerkt",
    invoiceUpdatedDescription: "De factuur is succesvol bijgewerkt",
    invoiceCreated: "Factuur Aangemaakt",
    invoiceCreatedDescription: "De nieuwe factuur is succesvol aangemaakt",
    invoiceDeleted: "Factuur Verwijderd",
    invoiceDeletedDescription: "De factuur is succesvol verwijderd",
    customize: "Aanpassen",
    customizeTemplate: "Sjabloon Aanpassen",
    previewTemplate: "Sjabloonvoorbeeld",
    layout: "Lay-out",
    colors: "Kleuren",
    fonts: "Lettertypen",
    margins: "Marges",
    layoutSettings: "Lay-outinstellingen",
    colorSettings: "Kleurinstellingen",
    fontSettings: "Lettertypeinstellingen",
    marginSettings: "Marge-instellingen",
    logoPosition: "Logopositie",
    companyInfoPosition: "Positie Bedrijfsinformatie",
    clientInfoPosition: "Positie Klantinformatie",
    showFooter: "Voettekst Tonen",
    topLeft: "Linksboven",
    topCenter: "Middenboven",
    topRight: "Rechtsboven",
    left: "Links",
    right: "Rechts",
    bottom: "Onder",
    showLogo: "Logo Tonen",
    invoiceDetailsPosition: "Positie Factuurdetails",
    invoiceDetails: "Factuurdetails",
    active: "Actief",
    inactive: "Inactief",
    revenue: "Omzet",
    revenueTrend: "Omzettrend",
    invoiceStatus: "Factuurstatus",
    clientActivity: "Klantactiviteit",
    errorGeneratingPDF: "Fout bij het genereren van PDF",
    emailSent: "E-mail succesvol verzonden",
    emailSentToClient: "Factuure-mail verzonden naar {client}",
    emailSentDescription: "Uw factuur is succesvol verzonden",
    pdfGenerated: "PDF Gegenereerd",
    pdfGeneratedDescription: "Uw factuur-PDF is succesvol gegenereerd",
    billTo: "Factureren aan",
    primaryColor: "Primaire Kleur",
    secondaryColor: "Secundaire Kleur",
    backgroundColor: "Achtergrondkleur",
    textColor: "Tekstkleur",
    headingFont: "Lettertype Koppen",
    bodyFont: "Lettertype Tekst",
    headingSize: "Grootte Koppen",
    bodySize: "Grootte Tekst",
    topMargin: "Bovenmarge",
    rightMargin: "Rechtermarge",
    bottomMargin: "Ondermarge",
    leftMargin: "Linkermarge",
    selectTemplate: "Sjabloon Selecteren",
    templateCustomized: "Sjabloon Aangepast",
    templateCustomizedDescription: "Uw sjablooncustomisatie is opgeslagen",
    custom: "Aangepast",
    dragToPosition: "Sleep naar positie",
    previewBeforeDownload: "Voorbeeld voor downloaden",
    exactPreview:
      "Dit voorbeeld komt exact overeen met hoe uw factuur eruit zal zien bij het downloaden",
    changeStatus: "Status wijzigen",
    statusUpdated: "Status bijgewerkt",
    statusUpdatedDescription: "Factuurstatus is succesvol bijgewerkt",
  },
};
