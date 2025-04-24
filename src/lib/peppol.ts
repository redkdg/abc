// Peppol compliance utilities for Belgian e-invoicing

// Peppol Business Interoperability Specifications (BIS) for Belgium
export const PEPPOL_BIS_VERSION = "3.0";
export const PEPPOL_CUSTOMIZATION_ID =
  "urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0";
export const PEPPOL_PROFILE_ID = "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0";

// Belgian VAT number format validation
export const validateBelgianVAT = (vatNumber: string): boolean => {
  // Belgian VAT numbers start with BE followed by 10 digits
  const vatRegex = /^BE\d{10}$/;
  return vatRegex.test(vatNumber.replace(/[\s.-]/g, ""));
};

// Format Belgian VAT number for display
export const formatBelgianVAT = (vatNumber: string): string => {
  const cleanVat = vatNumber.replace(/[\s.-]/g, "");
  if (validateBelgianVAT(cleanVat)) {
    return `${cleanVat.substring(0, 2)} ${cleanVat.substring(2, 6)}.${cleanVat.substring(6, 9)}.${cleanVat.substring(9)}`;
  }
  return vatNumber;
};

// Belgian Enterprise Number (KBO/BCE) validation
export const validateEnterpriseNumber = (number: string): boolean => {
  const cleanNumber = number.replace(/[\s.-]/g, "");
  const regex = /^\d{10}$/;

  if (!regex.test(cleanNumber)) {
    return false;
  }

  // Check digit validation
  const checkDigits = Number(cleanNumber.substring(8, 10));
  const base = Number(cleanNumber.substring(0, 8));
  const modResult = 97 - (base % 97);

  return checkDigits === modResult || (modResult === 0 && checkDigits === 97);
};

// Format Belgian Enterprise Number for display
export const formatEnterpriseNumber = (number: string): string => {
  const cleanNumber = number.replace(/[\s.-]/g, "");
  if (validateEnterpriseNumber(cleanNumber)) {
    return `${cleanNumber.substring(0, 4)}.${cleanNumber.substring(4, 7)}.${cleanNumber.substring(7)}`;
  }
  return number;
};

// Generate Peppol-compliant invoice reference
export const generatePeppolInvoiceReference = (
  invoiceNumber: string,
): string => {
  // Ensure the invoice number is Peppol compliant (max 35 chars, no special chars except - and _)
  const cleanInvoiceNumber = invoiceNumber.replace(/[^a-zA-Z0-9-_]/g, "");
  return cleanInvoiceNumber.substring(0, 35);
};

// Belgian payment reference structure (OGM/VCS)
export const generateBelgianPaymentReference = (): string => {
  // Format: +++123/1234/12345+++
  const part1 = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const part2 = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const part3 = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");

  // Calculate check digits
  const number = Number(`${part1}${part2}${part3}`);
  const modResult = number % 97;
  const checkDigits =
    modResult === 0 ? "97" : modResult.toString().padStart(2, "0");

  return `+++${part1}/${part2}/${part3}${checkDigits}+++`;
};

// Peppol document types for Belgium
export const PEPPOL_DOCUMENT_TYPES = {
  INVOICE: "380",
  CREDIT_NOTE: "381",
  SELF_BILLED_INVOICE: "389",
};

// Peppol tax categories
export const PEPPOL_TAX_CATEGORIES = {
  STANDARD: "S", // Standard rate
  ZERO: "Z", // Zero rated goods
  EXEMPT: "E", // Exempt from tax
  REVERSE_CHARGE: "AE", // VAT Reverse Charge
  NOT_SUBJECT: "O", // Services outside scope of tax
};

// Belgian standard VAT rates
export const BELGIAN_VAT_RATES = {
  STANDARD: 21, // Standard rate
  REDUCED_1: 12, // Reduced rate
  REDUCED_2: 6, // Super-reduced rate
  ZERO: 0, // Zero rate
};

// Prepare invoice data for Peppol export
export const preparePeppolInvoiceData = (
  invoice: any,
  company: any,
  client: any,
) => {
  return {
    // UBL Invoice specific fields
    customizationID: PEPPOL_CUSTOMIZATION_ID,
    profileID: PEPPOL_PROFILE_ID,
    id: generatePeppolInvoiceReference(invoice.invoiceNumber),
    issueDate: invoice.issueDate,
    dueDate: invoice.dueDate,
    invoiceTypeCode: PEPPOL_DOCUMENT_TYPES.INVOICE,
    documentCurrencyCode: "EUR", // Euro is standard in Belgium
    accountingCost: "", // Optional field
    buyerReference: "", // Optional field

    // Payment means section
    paymentMeans: {
      paymentMeansCode: "58", // SEPA credit transfer
      paymentID: generateBelgianPaymentReference(),
    },

    // Seller (company) information
    accountingSupplierParty: {
      party: {
        endpointID: company.vatId || "", // Usually VAT number
        partyIdentification: company.enterpriseNumber || "",
        partyName: company.name,
        postalAddress: {
          streetName: company.address,
          cityName: company.city || "",
          postalZone: company.postalCode || "",
          countryCode: company.countryCode || "BE",
        },
        partyTaxScheme: {
          companyID: company.vatId || "",
          taxScheme: "VAT",
        },
        contact: {
          name: company.contactName || "",
          telephone: company.phone || "",
          electronicMail: company.email || "",
        },
      },
    },

    // Customer (client) information
    accountingCustomerParty: {
      party: {
        endpointID: client.vatId || "",
        partyName: client.name,
        postalAddress: {
          streetName: client.address,
          cityName: client.city || "",
          postalZone: client.postalCode || "",
          countryCode: client.countryCode || "BE",
        },
        partyTaxScheme: {
          companyID: client.vatId || "",
          taxScheme: "VAT",
        },
        contact: {
          name: client.contactName || "",
          telephone: client.phone || "",
          electronicMail: client.email || "",
        },
      },
    },

    // Tax information
    taxTotal: {
      taxAmount: invoice.tax,
      taxSubtotal: {
        taxableAmount: invoice.subtotal,
        taxAmount: invoice.tax,
        taxCategory: {
          id: PEPPOL_TAX_CATEGORIES.STANDARD,
          percent: invoice.taxRate || BELGIAN_VAT_RATES.STANDARD,
        },
      },
    },

    // Line items
    invoiceLines: invoice.items.map((item: any, index: number) => ({
      id: (index + 1).toString(),
      invoicedQuantity: item.quantity,
      lineExtensionAmount: item.quantity * item.price,
      item: {
        name: item.description,
        description: item.description,
        sellersItemIdentification: item.id || "",
        classifiedTaxCategory: {
          id: PEPPOL_TAX_CATEGORIES.STANDARD,
          percent: invoice.taxRate || BELGIAN_VAT_RATES.STANDARD,
        },
      },
      price: {
        priceAmount: item.price,
        baseQuantity: 1,
      },
    })),

    // Document totals
    legalMonetaryTotal: {
      lineExtensionAmount: invoice.subtotal,
      taxExclusiveAmount: invoice.subtotal,
      taxInclusiveAmount: invoice.total,
      payableAmount: invoice.total,
    },
  };
};
