import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Building2, DollarSign } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Currency,
  currencySymbols,
  getCurrency,
  saveCurrency,
} from "@/lib/storage";
import {
  validateBelgianVAT,
  formatBelgianVAT,
  validateEnterpriseNumber,
  formatEnterpriseNumber,
} from "@/lib/peppol";

interface CompanyProfileProps {
  company: any;
  onSave: (company: any) => void;
}

const CompanyProfile = ({ company, onSave }: CompanyProfileProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState(
    company || {
      name: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      postalCode: "",
      countryCode: "BE", // Default to Belgium
      taxId: "",
      vatId: "", // Belgian VAT number
      enterpriseNumber: "", // Belgian KBO/BCE number
      contactName: "",
      logo: "",
      peppolEnabled: true,
      peppolIdentifier: "",
    },
  );
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");

  // Load currency when component mounts
  useEffect(() => {
    const currency = getCurrency();
    setSelectedCurrency(currency);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVATChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedVAT = value.startsWith("BE") ? value : `BE${value}`;
    setFormData((prev) => ({ ...prev, vatId: formattedVAT }));
  };

  const handleEnterpriseNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, enterpriseNumber: value }));
  };

  const handleCurrencyChange = (value: string) => {
    const currency = value as Currency;
    setSelectedCurrency(currency);
    saveCurrency(currency);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Belgian VAT number if provided
    if (formData.vatId && !validateBelgianVAT(formData.vatId)) {
      toast({
        title: t("invalidVatNumber"),
        description: t("pleaseEnterValidBelgianVatNumber"),
        variant: "destructive",
      });
      return;
    }

    // Validate Belgian Enterprise number if provided
    if (
      formData.enterpriseNumber &&
      !validateEnterpriseNumber(formData.enterpriseNumber)
    ) {
      toast({
        title: t("invalidEnterpriseNumber"),
        description: t("pleaseEnterValidBelgianEnterpriseNumber"),
        variant: "destructive",
      });
      return;
    }

    // Format the VAT and Enterprise numbers before saving
    const formattedData = {
      ...formData,
      vatId: formData.vatId ? formatBelgianVAT(formData.vatId) : "",
      enterpriseNumber: formData.enterpriseNumber
        ? formatEnterpriseNumber(formData.enterpriseNumber)
        : "",
    };

    onSave(formattedData);
  };

  // Handle logo upload with file input
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(t("logoTooLarge"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Store the logo in a more efficient format
          const logoData = event.target.result as string;
          setFormData((prev) => ({
            ...prev,
            logo: logoData,
          }));

          // Immediately save to localStorage to prevent loss
          const updatedCompany = {
            ...formData,
            logo: logoData,
          };
          onSave(updatedCompany);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    document.getElementById("logo-upload")?.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t("companyProfile")}</h1>

      <Tabs defaultValue="general">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="general">
            {t("generalInformation") || "General Information"}
          </TabsTrigger>
          <TabsTrigger value="peppol">
            {t("peppolSettings") || "Peppol Settings"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("companyInformation")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-24 h-24">
                      {formData.logo ? (
                        <AvatarImage src={formData.logo} alt={formData.name} />
                      ) : (
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                          <Building2 size={32} />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={triggerFileInput}
                    >
                      <Upload size={14} />
                      {t("uploadLogo")}
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="name">{t("companyName")}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">{t("email")}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">{t("phone")}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">{t("website")}</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactName">
                          {t("contactName") || "Contact Name"}
                        </Label>
                        <Input
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">{t("address")}</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">{t("city") || "City"}</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">
                      {t("postalCode") || "Postal Code"}
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="countryCode">
                      {t("countryCode") || "Country Code"}
                    </Label>
                    <Input
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      placeholder="BE"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currency">
                    {t("currency") || "Currency"}
                  </Label>
                  <Select
                    value={selectedCurrency}
                    onValueChange={handleCurrencyChange}
                  >
                    <SelectTrigger id="currency" className="w-full">
                      <SelectValue placeholder="Select currency">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {selectedCurrency} (
                            {currencySymbols[selectedCurrency as Currency]})
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {Object.entries(currencySymbols).map(([code, symbol]) => (
                        <SelectItem key={code} value={code}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{code}</span>
                            <span className="text-muted-foreground">
                              ({symbol})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("currencyNote") ||
                      "This currency will be used throughout the application"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit">{t("saveChanges")}</Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="peppol">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {t("peppolSettings") || "Peppol Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-800">
                    {t("peppolComplianceInfo") ||
                      "Peppol is a European e-invoicing standard required for business-to-government invoicing in Belgium. Complete these fields to ensure your invoices are Peppol compliant."}
                  </p>
                </div>

                <div>
                  <Label htmlFor="vatId">
                    {t("belgianVatNumber") || "Belgian VAT Number"}
                  </Label>
                  <Input
                    id="vatId"
                    name="vatId"
                    value={formData.vatId}
                    onChange={handleVATChange}
                    placeholder="BE0123456789"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("belgianVatNumberFormat") ||
                      "Format: BE followed by 10 digits (e.g., BE0123456789)"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="enterpriseNumber">
                    {t("enterpriseNumber") || "Enterprise Number (KBO/BCE)"}
                  </Label>
                  <Input
                    id="enterpriseNumber"
                    name="enterpriseNumber"
                    value={formData.enterpriseNumber}
                    onChange={handleEnterpriseNumberChange}
                    placeholder="0123456789"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("enterpriseNumberFormat") ||
                      "Format: 10 digits (e.g., 0123456789)"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="taxId">{t("taxId")}</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="peppolIdentifier">
                    {t("peppolIdentifier") || "Peppol Identifier"}
                  </Label>
                  <Input
                    id="peppolIdentifier"
                    name="peppolIdentifier"
                    value={formData.peppolIdentifier}
                    onChange={handleChange}
                    placeholder="0208:BE0123456789"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("peppolIdentifierInfo") ||
                      "Your Peppol Electronic Address Identifier (EAS). Format: 0208:BE followed by your VAT number without spaces."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit">{t("saveChanges")}</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyProfile;
