import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { saveApiKey, getApiKey, validateApiKey, clearApiKey } from "@/lib/api";
import { Loader2, Check, X, Key } from "lucide-react";

export default function ApiIntegration() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const defaultApiKey = "dba822ad-027e-4bf1-a641-d21c65ff0a42";

  useEffect(() => {
    // Load saved API key on component mount
    const savedApiKey = getApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsValid(true);
    } else {
      // Pre-fill with the provided API key if none is saved
      setApiKey(defaultApiKey);
    }
  }, []);

  const handleValidate = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      const valid = await validateApiKey(apiKey);
      setIsValid(valid);

      if (valid) {
        toast({
          title: "API Key Valid",
          description: "Your API key has been validated successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "The provided API key is invalid",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Validation Error",
        description: "Failed to validate API key",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Save Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    if (isValid !== true) {
      toast({
        title: "Validation Required",
        description: "Please validate your API key before saving",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      saveApiKey(apiKey);
      toast({
        title: "API Key Saved",
        description: "Your API key has been saved successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Save Error",
        description: "Failed to save API key",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    clearApiKey();
    setApiKey("");
    setIsValid(null);
    toast({
      title: "API Key Cleared",
      description: "Your API key has been removed",
      variant: "default",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          DataFusion API Integration
        </CardTitle>
        <CardDescription>
          Connect to your external software by providing an API key to import
          and export data from DataFusion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsValid(null);
                }}
                className="flex-1"
              />
              <Button
                onClick={handleValidate}
                variant="outline"
                disabled={isValidating || !apiKey.trim()}
              >
                {isValidating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Validate"
                )}
              </Button>
            </div>
            {isValid !== null && (
              <div
                className={`flex items-center gap-2 text-sm mt-2 ${isValid ? "text-green-600" : "text-red-600"}`}
              >
                {isValid ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>API key is valid</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" />
                    <span>API key is invalid</span>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-slate-50 rounded-md">
            <p className="font-medium mb-1">API Documentation</p>
            <p>Base URL: https://api.datafusion.com</p>
            <p>Authentication: API-Key in Authorization header</p>
            <p>Available endpoints:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>/api/external/data - Retrieve aggregated invoice data</li>
              <li>
                /api/external/industries - Retrieve industry breakdown data
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={!apiKey.trim()}
        >
          Clear
        </Button>
        <Button onClick={handleSave} disabled={isSaving || isValid !== true}>
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Save API Key
        </Button>
      </CardFooter>
    </Card>
  );
}
