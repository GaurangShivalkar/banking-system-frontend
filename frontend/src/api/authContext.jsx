import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      const { token } = response.data; // Assuming your backend returns the token

      setUser({ token });
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., display error message to user)
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const authValue = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
