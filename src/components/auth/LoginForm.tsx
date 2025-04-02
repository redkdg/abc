import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!loginData.email || !loginData.password) {
      toast({
        title: t("error"),
        description: t("pleaseEnterEmailAndPassword"),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Get users from localStorage
      const usersJSON = localStorage.getItem("users") || "[]";
      const users = JSON.parse(usersJSON);

      // Find user with matching email
      const user = users.find((u: any) => u.email === loginData.email);

      if (!user || user.password !== loginData.password) {
        throw new Error(t("invalidCredentials"));
      }

      // Create a user profile
      const userProfile = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar:
          user.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
      };

      login(userProfile);

      toast({
        title: t("loginSuccessful"),
        description: t("welcomeBack", { name: user.name }),
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: t("loginFailed"),
        description: error.message || t("invalidCredentials"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data
    if (!registerData.email || !registerData.name || !registerData.password) {
      toast({
        title: t("error"),
        description: t("pleaseCompleteAllFields"),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: t("error"),
        description: t("passwordsDoNotMatch"),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: t("error"),
        description: t("passwordTooShort"),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Get existing users from localStorage
      const usersJSON = localStorage.getItem("users") || "[]";
      const users = JSON.parse(usersJSON);

      // Check if user already exists
      const userExists = users.some((u: any) => u.email === registerData.email);
      if (userExists) {
        toast({
          title: t("error"),
          description: t("emailAlreadyInUse"),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${registerData.name}`,
      };

      // Add user to localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Create a user profile (without password)
      const userProfile = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      };

      login(userProfile);

      toast({
        title: t("registrationSuccessful"),
        description: t("accountCreated"),
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: t("registrationFailed"),
        description: error.message || t("errorCreatingAccount"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{t("accountAccess")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t("login")}</TabsTrigger>
            <TabsTrigger value="register">{t("register")}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="login-email">{t("email")}</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder={t("enterYourEmail")}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="login-password">{t("password")}</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder={t("enterYourPassword")}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("loggingIn") : t("login")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="register-name">{t("name")}</Label>
                <Input
                  id="register-name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder={t("enterYourName")}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="register-email">{t("email")}</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder={t("enterYourEmail")}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="register-password">{t("password")}</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder={t("createPassword")}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="register-confirm-password">
                  {t("confirmPassword")}
                </Label>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder={t("confirmYourPassword")}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("creatingAccount") : t("register")}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        {t("secureAuthMessage")}
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
