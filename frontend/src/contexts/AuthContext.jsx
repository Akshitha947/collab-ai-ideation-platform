import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApiService from "../services/apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await ApiService.auth.login({ email, password });
      setUser(response.user);
      setToken(response.tokens.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.tokens.accessToken);
      toast.success(`Welcome back, ${response.user.name}!`);
      return { success: true, user: response.user };
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await ApiService.auth.register(userData);
      setUser(response.user);
      setToken(response.tokens.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.tokens.accessToken);
      toast.success(`Welcome, ${response.user.name}!`);
      return { success: true, user: response.user };
    } catch (error) {
      toast.error(error.message || "Registration failed");
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
