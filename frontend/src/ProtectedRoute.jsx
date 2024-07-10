import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "./api/axiosConfig";

export const ProtectedRoute = ({ isAdminRoute }) => {
  const [role, setRole] = useState(null);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTokenValid(false);
      return;
    }

    const fetchUserRole = async () => {
      try {
        const userResponse = await axios.get("/auth/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRole(userResponse.data.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        localStorage.removeItem("token");
        setTokenValid(false);
      }
    };

    fetchUserRole();
  }, []);

  if (!tokenValid) {
    return <Navigate to="/login" />;
  }

  if (role && isAdminRoute && role !== "ADMIN") {
    return <Navigate to="/unauthorize" />;
  }

  if (role && !isAdminRoute && role == "ADMIN") {
    return <Navigate to="/unauthorize" />;
  }
  if (role === null) {
    // Role not yet fetched
    return null;
  }

  return <Outlet />;
};
