export type Language = "en" | "fr" | "nl";

export type TranslationKey =
  | "downloadProject"
  | "advancedGenerator"
  | "preview"
  | "invoicePreview"
  | "downloadPDF"
  | "invoiceSaved"
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
  | "financialReportsDescription";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    downloadProject: "Download Project",
    advancedGenerator: "Advanced Generator",
    preview: "Preview",
    invoicePreview: "Invoice Preview",
    downloadPDF: "Download PDF",
    invoiceSaved: "Invoice Saved",
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
  },
  fr: {
    downloadProject: "Télécharger le Projet",
    advancedGenerator: "Générateur Avancé",
    preview: "Aperçu",
    invoicePreview: "Aperçu de la Facture",
    downloadPDF: "Télécharger PDF",
    invoiceSaved: "Facture Enregistrée",
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
  },
  nl: {
    downloadProject: "Project Downloaden",
    advancedGenerator: "Geavanceerde Generator",
    preview: "Voorbeeld",
    invoicePreview: "Factuurvoorbeeld",
    downloadPDF: "PDF Downloaden",
    invoiceSaved: "Factuur Opgeslagen",
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
    newInvoice: "Nieuwe factuur",
    overview: "Overzicht",
    reports: "Rapporten",
    analyticsOverview: "Analytisch overzicht",
    totalRevenue: "Totale omzet",
    outstandingInvoices: "Openstaande facturen",
    paidInvoices: "Betaalde facturen",
    overdueInvoices: "Achterstallige facturen",
    averagePaymentTime: "Gemiddelde betaaltijd",
    activeClients: "Actieve klanten",
    totalInvoices: "Totaal aantal facturen",
    conversionRate: "Conversiepercentage",
    last30Days: "Laatste 30 dagen",
    awaitingPayment: "Wachtend op betaling",
    needsAttention: "Heeft aandacht nodig",
    fromInvoiceSent: "Vanaf factuurdatum",
    totalClientBase: "Totale klantenbasis",
    allTime: "Alle tijden",
    invoicesPaidOnTime: "Facturen op tijd betaald",
    recentInvoices: "Recente facturen",
    searchInvoices: "Zoek facturen...",
    invoice: "Factuur",
    client: "Klant",
    date: "Datum",
    amount: "Bedrag",
    status: "Status",
    actions: "Acties",
    viewInvoice: "Factuur bekijken",
    downloadInvoice: "Factuur downloaden",
    moreOptions: "Meer opties",
    viewAllInvoices: "Alle facturen bekijken",
    showing: "Toont",
    of: "van",
    quickActions: "Snelle acties",
    frequentlyUsedActions: "Veelgebruikte acties voor factuurbeheer",
    createNewInvoice: "Nieuwe factuur maken",
    generateNewInvoice: "Genereer een nieuwe factuur voor een klant",
    manageClients: "Klanten beheren",
    addEditClientInfo: "Klantinformatie toevoegen of bewerken",
    itemLibraryAction: "Artikelbibliotheek",
    manageProductsServices: "Beheer uw producten en diensten",
    templatesAction: "Sjablonen",
    browseSelectTemplates: "Blader door en selecteer factuursjablonen",
    customizeBranding: "Merk aanpassen",
    updateColorsFontsLogo: "Kleuren, lettertypen en logo bijwerken",
    companySettingsAction: "Bedrijfsinstellingen",
    updateCompanyProfile: "Werk uw bedrijfsprofiel bij",
    paid: "Betaald",
    pending: "In behandeling",
    overdue: "Achterstallig",
    notifications: "Meldingen",
    helpResources: "Hulp & Bronnen",
    myAccount: "Mijn account",
    profile: "Profiel",
    admin: "Beheerder",
    loading: "Laden...",
    days: "dagen",
    back: "Terug",
    clientInformation: "Klantinformatie",
    clientName: "Klantnaam",
    selectClient: "Selecteer een klant",
    invoiceDetails: "Factuurgegevens",
    issueDate: "Uitgiftedatum",
    dueDate: "Vervaldatum",
    items: "Artikelen",
    description: "Omschrijving",
    quantity: "Aantal",
    rate: "Tarief",
    itemDescription: "Artikelomschrijving",
    addItem: "Artikel toevoegen",
    subtotal: "Subtotaal",
    tax: "Belasting",
    total: "Totaal",
    additionalInfo: "Aanvullende informatie",
    notes: "Notities",
    notesPlaceholder: "Voeg hier notities toe...",
    terms: "Voorwaarden",
    cancel: "Annuleren",
    saveInvoice: "Factuur opslaan",
    noInvoicesFound:
      "Geen facturen gevonden die overeenkomen met uw zoekopdracht",
    noInvoicesYet: "Nog geen facturen. Maak uw eerste factuur!",
    print: "Afdrukken",
    download: "Downloaden",
    send: "Verzenden",
    from: "Van",
    to: "Aan",
    invoiceNumber: "Factuurnummer",
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    newClient: "Nieuwe klant",
    searchClients: "Zoek klanten...",
    editClient: "Klant bewerken",
    deleteClient: "Klant verwijderen",
    address: "Adres",
    save: "Opslaan",
    clientDeleted: "Klant verwijderd",
    clientDeletedDescription: "De klant is succesvol verwijderd",
    clientUpdated: "Klant bijgewerkt",
    clientUpdatedDescription: "De klantinformatie is bijgewerkt",
    clientCreated: "Klant aangemaakt",
    clientCreatedDescription: "De nieuwe klant is succesvol toegevoegd",
    newItem: "Nieuw artikel",
    searchItems: "Zoek artikelen...",
    price: "Prijs",
    type: "Type",
    editItem: "Artikel bewerken",
    deleteItem: "Artikel verwijderen",
    noItemsFound:
      "Geen artikelen gevonden die overeenkomen met uw zoekopdracht",
    noItemsYet: "Nog geen artikelen. Voeg uw eerste artikel toe!",
    product: "Product",
    service: "Dienst",
    itemDeleted: "Artikel verwijderd",
    itemDeletedDescription: "Het artikel is succesvol verwijderd",
    itemUpdated: "Artikel bijgewerkt",
    itemUpdatedDescription: "De artikelinformatie is bijgewerkt",
    itemCreated: "Artikel aangemaakt",
    itemCreatedDescription: "Het nieuwe artikel is succesvol toegevoegd",
    searchTemplates: "Zoek sjablonen...",
    default: "Standaard",
    noTemplatesFound:
      "Geen sjablonen gevonden die overeenkomen met uw zoekopdracht",
    noTemplatesYet: "Nog geen sjablonen beschikbaar",
    templateSelected: "Sjabloon geselecteerd",
    templateSelectedDescription: "Uw factuursjabloon is bijgewerkt",
    companyInformation: "Bedrijfsinformatie",
    companyName: "Bedrijfsnaam",
    website: "Website",
    taxId: "BTW-nummer / Fiscaal ID",
    uploadLogo: "Logo uploaden",
    saveChanges: "Wijzigingen opslaan",
    profileUpdated: "Profiel bijgewerkt",
    profileUpdatedDescription: "Uw bedrijfsprofiel is bijgewerkt",
    invoiceReports: "Factuurrapportages",
    invoiceReportsDescription:
      "Bekijk gedetailleerde rapporten over uw facturen",
    clientReports: "Klantrapportages",
    clientReportsDescription: "Bekijk gedetailleerde rapporten over uw klanten",
    financialReports: "Financiële rapportages",
    financialReportsDescription:
      "Bekijk gedetailleerde financiële rapporten en analyses",
  },
};
