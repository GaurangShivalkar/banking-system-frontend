import { useEffect, useState, useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "./api/axiosConfig";

export const ProtectedRoute = ({ isAdminRoute }) => {
  const [role, setRole] = useState(null);
  const [tokenValid, setTokenValid] = useState(true);
  const checkingExpiryRef = useRef(false);
  const navigate = useNavigate();
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

    const checkTokenExpiry = async () => {
      try {

        const isExpired = await axios.get(`/auth/checkExpiry/${token}`)

        const isTokenExpired = isExpired.data;

        if (isTokenExpired) {
          alertSessionExpired();
        }
        else {
          console.log("Is token expired:", isTokenExpired);
        }
      } catch (error) {
        console.error("Failed to check token expiry:", error);
        alertSessionExpired();
      }
    };

    const alertSessionExpired = async () => {
      alert("Your session has expired. Please log in again.");
      const response = await axios.delete(`/auth/deleteRefreshToken`, { data: { token: refreshToken } });
      if (response.status == 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('customerId');
        localStorage.removeItem('refreshToken');
        navigate('/');
      }
      setTokenValid(false);
      navigate("/login"); // Redirect to login page
    };

    const interval = setInterval(() => {
      if (!checkingExpiryRef.current) {
        checkingExpiryRef.current = true;
        checkTokenExpiry().finally(() => {
          checkingExpiryRef.current = false;
        });
      }
    }, 150000);  // Check every 1 hr


    return () => clearInterval(interval); // Cleanup on component unmount

  }, []);

  if (!tokenValid) {
    return <Navigate to="/login" />;
  }

  if (role && isAdminRoute && role !== "ROLE_ADMIN") {
    return <Navigate to="/unauthorize" />;
  }

  if (role && !isAdminRoute && role === "ROLE_ADMIN") {
    return <Navigate to="/unauthorize" />;
  }

  // if (role === null || checkingExpiry) {
  //   // Role not yet fetched or checking expiry status
  //   return null;
  // }

  return <Outlet />;
};
