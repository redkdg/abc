import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { ColorPicker } from "@/components/ui/color-picker";
import { saveTemplateSettings, getTemplateSettings } from "@/lib/storage";

interface TemplateCustomizerProps {
  templateId: string;
  onSave: () => void;
  onCancel: () => void;
}

const TemplateCustomizer = ({
  templateId,
  onSave,
  onCancel,
}: TemplateCustomizerProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [settings, setSettings] = useState(() => {
    // Load saved settings or use defaults
    return (
      getTemplateSettings(templateId) || {
        margins: {
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        },
        colors: {
          primary: "#4f46e5",
          secondary: "#f97316",
          background: "#ffffff",
          text: "#1f2937",
        },
        fonts: {
          heading: "Inter",
          body: "Inter",
        },
        fontSize: {
          heading: 24,
          subheading: 18,
          body: 14,
        },
        layout: {
          logoPosition: "top-left", // top-left, top-center, top-right
          companyInfoPosition: "top-left", // top-left, top-right
          clientInfoPosition: "top-right", // top-left, top-right, bottom
          invoiceDetailsPosition: "top-right", // top-right, bottom, custom
          invoiceDetailsCustomPosition: { x: 0, y: 0 },
          showHeader: true,
          showFooter: true,
          showLogo: true,
        },
      }
    );
  });

  const handleMarginChange = (
    type: "top" | "right" | "bottom" | "left",
    value: number[],
  ) => {
    setSettings({
      ...settings,
      margins: {
        ...settings.margins,
        [type]: value[0],
      },
    });
  };

  const handleColorChange = (
    type: "primary" | "secondary" | "background" | "text",
    value: string,
  ) => {
    setSettings({
      ...settings,
      colors: {
        ...settings.colors,
        [type]: value,
      },
    });
  };

  const handlePositionChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      layout: {
        ...settings.layout,
        [field]: value,
      },
    });
  };

  const handleSaveSettings = () => {
    // Save template settings
    saveTemplateSettings(templateId, settings);
    toast({
      title: t("templateCustomized"),
      description: t("templateCustomizedDescription"),
    });
    onSave();
  };

  // Load saved settings when template ID changes
  useEffect(() => {
    const savedSettings = getTemplateSettings(templateId);
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, [templateId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("customizeTemplate")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSaveSettings}>{t("saveChanges")}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("previewTemplate")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-md p-6 min-h-[600px] relative"
                style={{
                  backgroundColor: settings.colors.background,
                  color: settings.colors.text,
                  padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
                }}
              >
                {/* Logo and Header */}
                {settings.layout.showLogo && (
                  <div
                    className={`flex ${settings.layout.logoPosition === "top-center" ? "justify-center" : settings.layout.logoPosition === "top-right" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="bg-gray-200 w-32 h-16 flex items-center justify-center text-gray-500">
                      LOGO
                    </div>
                  </div>
                )}

                {/* Company and Client Info */}
                <div className="flex justify-between mt-8">
                  <div
                    className={`${settings.layout.companyInfoPosition === "top-right" ? "order-2" : "order-1"}`}
                  >
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: `${settings.fontSize.subheading}px`,
                        color: settings.colors.primary,
                      }}
                    >
                      {t("from")}
                    </h3>
                    <div style={{ fontSize: `${settings.fontSize.body}px` }}>
                      <p className="font-medium">Your Company Name</p>
                      <p>123 Business Street</p>
                      <p>City, State 12345</p>
                      <p>contact@yourcompany.com</p>
                    </div>
                  </div>

                  <div
                    className={`${settings.layout.clientInfoPosition === "top-left" ? "order-1" : settings.layout.clientInfoPosition === "bottom" ? "hidden" : "order-2"}`}
                  >
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: `${settings.fontSize.subheading}px`,
                        color: settings.colors.primary,
                      }}
                    >
                      {t("billTo")}
                    </h3>
                    <div style={{ fontSize: `${settings.fontSize.body}px` }}>
                      <p className="font-medium">Client Name</p>
                      <p>456 Client Avenue</p>
                      <p>Client City, State 67890</p>
                      <p>client@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Client Info (if bottom position) */}
                {settings.layout.clientInfoPosition === "bottom" && (
                  <div className="mt-8">
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: `${settings.fontSize.subheading}px`,
                        color: settings.colors.primary,
                      }}
                    >
                      {t("billTo")}
                    </h3>
                    <div style={{ fontSize: `${settings.fontSize.body}px` }}>
                      <p className="font-medium">Client Name</p>
                      <p>456 Client Avenue</p>
                      <p>Client City, State 67890</p>
                      <p>client@example.com</p>
                    </div>
                  </div>
                )}

                {/* Invoice Details */}
                <div className="mt-12">
                  <h1
                    className="text-3xl font-bold mb-4"
                    style={{
                      fontSize: `${settings.fontSize.heading}px`,
                      color: settings.colors.primary,
                    }}
                  >
                    {t("invoice")}
                  </h1>

                  {settings.layout.invoiceDetailsPosition === "top-right" ? (
                    <div
                      className="flex justify-between mb-8"
                      style={{ fontSize: `${settings.fontSize.body}px` }}
                    >
                      <div>
                        <p>
                          <span className="font-medium">
                            {t("invoiceNumber")}:
                          </span>{" "}
                          INV-001
                        </p>
                        <p>
                          <span className="font-medium">{t("issueDate")}:</span>{" "}
                          2023-06-01
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">{t("dueDate")}:</span>{" "}
                          2023-07-01
                        </p>
                        <p>
                          <span className="font-medium">{t("status")}:</span>{" "}
                          <span className="text-yellow-600">
                            {t("pending")}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="mb-8 grid grid-cols-2 gap-4"
                      style={{ fontSize: `${settings.fontSize.body}px` }}
                    >
                      <div>
                        <h3 className="font-medium mb-2">
                          {t("invoiceDetails")}
                        </h3>
                        <p>
                          <span className="font-medium">
                            {t("invoiceNumber")}:
                          </span>{" "}
                          INV-001
                        </p>
                        <p>
                          <span className="font-medium">{t("issueDate")}:</span>{" "}
                          2023-06-01
                        </p>
                        <p>
                          <span className="font-medium">{t("dueDate")}:</span>{" "}
                          2023-07-01
                        </p>
                        <p>
                          <span className="font-medium">{t("status")}:</span>{" "}
                          <span className="text-yellow-600">
                            {t("pending")}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Invoice Items */}
                  <table
                    className="w-full border-collapse"
                    style={{ fontSize: `${settings.fontSize.body}px` }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: settings.colors.primary,
                          color: "white",
                        }}
                      >
                        <th className="border p-2 text-left">
                          {t("description")}
                        </th>
                        <th className="border p-2 text-right">
                          {t("quantity")}
                        </th>
                        <th className="border p-2 text-right">{t("rate")}</th>
                        <th className="border p-2 text-right">{t("amount")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Website Design</td>
                        <td className="border p-2 text-right">1</td>
                        <td className="border p-2 text-right">$1,000.00</td>
                        <td className="border p-2 text-right">$1,000.00</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Logo Design</td>
                        <td className="border p-2 text-right">1</td>
                        <td className="border p-2 text-right">$500.00</td>
                        <td className="border p-2 text-right">$500.00</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2} className="border p-2"></td>
                        <td className="border p-2 text-right font-medium">
                          {t("subtotal")}
                        </td>
                        <td className="border p-2 text-right">$1,500.00</td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="border p-2"></td>
                        <td className="border p-2 text-right font-medium">
                          {t("tax")} (10%)
                        </td>
                        <td className="border p-2 text-right">$150.00</td>
                      </tr>
                      <tr
                        style={{
                          backgroundColor: settings.colors.secondary,
                          color: "white",
                        }}
                      >
                        <td colSpan={2} className="border p-2"></td>
                        <td className="border p-2 text-right font-bold">
                          {t("total")}
                        </td>
                        <td className="border p-2 text-right font-bold">
                          $1,650.00
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Notes and Terms */}
                {settings.layout.showFooter && (
                  <div
                    className="mt-8"
                    style={{ fontSize: `${settings.fontSize.body}px` }}
                  >
                    <div className="mb-4">
                      <h3
                        className="font-bold"
                        style={{ color: settings.colors.primary }}
                      >
                        {t("notes")}
                      </h3>
                      <p>Thank you for your business!</p>
                    </div>
                    <div>
                      <h3
                        className="font-bold"
                        style={{ color: settings.colors.primary }}
                      >
                        {t("terms")}
                      </h3>
                      <p>
                        Payment due within 30 days. Please make checks payable
                        to Your Company Name.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="layout">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="layout">{t("layout")}</TabsTrigger>
              <TabsTrigger value="colors">{t("colors")}</TabsTrigger>
              <TabsTrigger value="fonts">{t("fonts")}</TabsTrigger>
              <TabsTrigger value="margins">{t("margins")}</TabsTrigger>
            </TabsList>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("layoutSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="showLogo"
                        checked={settings.layout.showLogo}
                        onChange={(e) => {
                          setSettings({
                            ...settings,
                            layout: {
                              ...settings.layout,
                              showLogo: e.target.checked,
                            },
                          });
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="showLogo">{t("showLogo")}</Label>
                    </div>

                    <Label>{t("logoPosition")}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={
                          settings.layout.logoPosition === "top-left"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange("logoPosition", "top-left")
                        }
                        disabled={!settings.layout.showLogo}
                      >
                        {t("topLeft")}
                      </Button>
                      <Button
                        variant={
                          settings.layout.logoPosition === "top-center"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange("logoPosition", "top-center")
                        }
                        disabled={!settings.layout.showLogo}
                      >
                        {t("topCenter")}
                      </Button>
                      <Button
                        variant={
                          settings.layout.logoPosition === "top-right"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange("logoPosition", "top-right")
                        }
                        disabled={!settings.layout.showLogo}
                      >
                        {t("topRight")}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("companyInfoPosition")}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          settings.layout.companyInfoPosition === "top-left"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange(
                            "companyInfoPosition",
                            "top-left",
                          )
                        }
                      >
                        {t("left")}
                      </Button>
                      <Button
                        variant={
                          settings.layout.companyInfoPosition === "top-right"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange(
                            "companyInfoPosition",
                            "top-right",
                          )
                        }
                      >
                        {t("right")}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("clientInfoPosition")}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={
                          settings.layout.clientInfoPosition === "top-left"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange("clientInfoPosition", "top-left")
                        }
                      >
                        {t("topLeft")}
                      </Button>
                      <Button
                        variant={
                          settings.layout.clientInfoPosition === "top-right"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange(
                            "clientInfoPosition",
                            "top-right",
                          )
                        }
                      >
                        {t("topRight")}
                      </Button>
                      <Button
                        variant={
                          settings.layout.clientInfoPosition === "bottom"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange("clientInfoPosition", "bottom")
                        }
                      >
                        {t("bottom")}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("invoiceDetailsPosition")}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={
                          settings.layout.invoiceDetailsPosition === "top-right"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange(
                            "invoiceDetailsPosition",
                            "top-right",
                          )
                        }
                      >
                        {t("topRight")}
                      </Button>
                      <Button
                        variant={
                          settings.layout.invoiceDetailsPosition === "bottom"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange(
                            "invoiceDetailsPosition",
                            "bottom",
                          )
                        }
                      >
                        {t("bottom")}
                      </Button>
                      <Button
                        variant={
                          settings.layout.invoiceDetailsPosition === "custom"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handlePositionChange(
                            "invoiceDetailsPosition",
                            "custom",
                          )
                        }
                      >
                        {t("custom")}
                      </Button>
                    </div>

                    {settings.layout.invoiceDetailsPosition === "custom" && (
                      <div className="mt-4 p-4 border rounded-md bg-muted/50">
                        <p className="text-sm mb-2">{t("dragToPosition")}</p>
                        <div className="relative border rounded-md h-40 bg-background overflow-hidden">
                          <div
                            className="absolute p-2 bg-primary/20 border rounded cursor-move flex items-center justify-center text-xs"
                            style={{
                              left: `${settings.layout.invoiceDetailsCustomPosition?.x || 0}%`,
                              top: `${settings.layout.invoiceDetailsCustomPosition?.y || 0}%`,
                              width: "100px",
                              height: "40px",
                              transform: "translate(-50%, -50%)",
                            }}
                            onMouseDown={(e) => {
                              const container = e.currentTarget.parentElement;
                              if (!container) return;

                              const startX = e.clientX;
                              const startY = e.clientY;
                              const startLeft =
                                settings.layout.invoiceDetailsCustomPosition
                                  ?.x || 0;
                              const startTop =
                                settings.layout.invoiceDetailsCustomPosition
                                  ?.y || 0;

                              const handleMouseMove = (
                                moveEvent: MouseEvent,
                              ) => {
                                const dx = moveEvent.clientX - startX;
                                const dy = moveEvent.clientY - startY;

                                const containerRect =
                                  container.getBoundingClientRect();
                                const newX = Math.max(
                                  0,
                                  Math.min(
                                    100,
                                    startLeft +
                                      (dx / containerRect.width) * 100,
                                  ),
                                );
                                const newY = Math.max(
                                  0,
                                  Math.min(
                                    100,
                                    startTop +
                                      (dy / containerRect.height) * 100,
                                  ),
                                );

                                setSettings({
                                  ...settings,
                                  layout: {
                                    ...settings.layout,
                                    invoiceDetailsCustomPosition: {
                                      x: newX,
                                      y: newY,
                                    },
                                  },
                                });
                              };

                              const handleMouseUp = () => {
                                document.removeEventListener(
                                  "mousemove",
                                  handleMouseMove,
                                );
                                document.removeEventListener(
                                  "mouseup",
                                  handleMouseUp,
                                );
                              };

                              document.addEventListener(
                                "mousemove",
                                handleMouseMove,
                              );
                              document.addEventListener(
                                "mouseup",
                                handleMouseUp,
                              );
                            }}
                          >
                            {t("invoiceDetails")}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {t("dragToPosition")}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      id="showFooter"
                      checked={settings.layout.showFooter}
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          layout: {
                            ...settings.layout,
                            showFooter: e.target.checked,
                          },
                        });
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="showFooter">{t("showFooter")}</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("colorSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("primaryColor")}</Label>
                    <ColorPicker
                      value={settings.colors.primary}
                      onChange={(value) => handleColorChange("primary", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("secondaryColor")}</Label>
                    <ColorPicker
                      value={settings.colors.secondary}
                      onChange={(value) =>
                        handleColorChange("secondary", value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("backgroundColor")}</Label>
                    <ColorPicker
                      value={settings.colors.background}
                      onChange={(value) =>
                        handleColorChange("background", value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t("textColor")}</Label>
                    <ColorPicker
                      value={settings.colors.text}
                      onChange={(value) => handleColorChange("text", value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fonts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("fontSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("headingFont")}</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={settings.fonts.heading}
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          fonts: {
                            ...settings.fonts,
                            heading: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="Inter">Inter</option>
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Georgia">Georgia</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("bodyFont")}</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={settings.fonts.body}
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          fonts: {
                            ...settings.fonts,
                            body: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="Inter">Inter</option>
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Georgia">Georgia</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {t("headingSize")}: {settings.fontSize.heading}px
                    </Label>
                    <Slider
                      value={[settings.fontSize.heading]}
                      min={16}
                      max={36}
                      step={1}
                      onValueChange={(value) => {
                        setSettings({
                          ...settings,
                          fontSize: {
                            ...settings.fontSize,
                            heading: value[0],
                          },
                        });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {t("bodySize")}: {settings.fontSize.body}px
                    </Label>
                    <Slider
                      value={[settings.fontSize.body]}
                      min={10}
                      max={18}
                      step={1}
                      onValueChange={(value) => {
                        setSettings({
                          ...settings,
                          fontSize: {
                            ...settings.fontSize,
                            body: value[0],
                          },
                        });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="margins" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("marginSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>
                      {t("topMargin")}: {settings.margins.top}px
                    </Label>
                    <Slider
                      value={[settings.margins.top]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) =>
                        handleMarginChange("top", value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {t("rightMargin")}: {settings.margins.right}px
                    </Label>
                    <Slider
                      value={[settings.margins.right]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) =>
                        handleMarginChange("right", value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {t("bottomMargin")}: {settings.margins.bottom}px
                    </Label>
                    <Slider
                      value={[settings.margins.bottom]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) =>
                        handleMarginChange("bottom", value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {t("leftMargin")}: {settings.margins.left}px
                    </Label>
                    <Slider
                      value={[settings.margins.left]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) =>
                        handleMarginChange("left", value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer;
