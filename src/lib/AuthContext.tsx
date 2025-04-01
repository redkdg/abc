import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, getUser, saveUser } from "./storage";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

// Using named function declaration to help with Fast Refresh
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
    saveUser(userData);

    // Add user ID to localStorage keys for user-specific data
    localStorage.setItem(`user-${userData.id}-initialized`, "true");

    // Navigate to dashboard after login
    navigate("/");
  };

  const logout = () => {
    // Store user ID before clearing state
    const userId = user?.id;

    // Clear state
    setUser(null);
    setIsAuthenticated(false);

    // Clear all user-specific data
    if (userId) {
      const userPrefix = `user-${userId}-`;

      // Remove user data from localStorage
      localStorage.removeItem("user");

      // Clear all items with user prefix
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(userPrefix)) {
          localStorage.removeItem(key);
        }
      });
    } else {
      // Fallback if no user ID is available
      localStorage.removeItem("user");
    }

    // Redirect to login page
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
