import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiIntegration from "@/components/settings/ApiIntegration";
import DataImport from "@/components/settings/DataImport";
import DataFusionDiagnostics from "@/components/settings/DataFusionDiagnostics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("settings")}</h1>
        <p className="text-muted-foreground">
          {t("manageYourApplicationSettings")}
        </p>
      </div>

      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="api">{t("apiIntegration")}</TabsTrigger>
          <TabsTrigger value="import">{t("dataImport")}</TabsTrigger>
          <TabsTrigger value="diagnostics">DataFusion Diagnostics</TabsTrigger>
        </TabsList>
        <TabsContent value="api" className="mt-6">
          <ApiIntegration />
        </TabsContent>
        <TabsContent value="import" className="mt-6">
          <DataImport />
        </TabsContent>
        <TabsContent value="diagnostics" className="mt-6">
          <DataFusionDiagnostics />
        </TabsContent>
      </Tabs>

      <Card className="w-full max-w-md mx-auto bg-white">
        <CardHeader>
          <CardTitle>{t("apiDocumentation")}</CardTitle>
          <CardDescription>{t("learnHowToIntegrate")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t("apiKeyInstructions")}
          </p>
          <div className="mt-4 p-3 bg-muted rounded-md">
            <h3 className="text-sm font-medium mb-2">
              {t("supportedDataTypes")}
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>{t("invoicesImport")}</li>
              <li>{t("clientsImport")}</li>
              <li>{t("itemsImport")}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
