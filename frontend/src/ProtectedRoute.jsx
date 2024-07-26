import { useEffect, useState, useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "./api/axiosConfig";
import SessionTimeoutModal from './api/SessionTimeoutModal'

export const ProtectedRoute = ({ isAdminRoute }) => {
  const [role, setRole] = useState(null);
  const [tokenValid, setTokenValid] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const checkingExpiryRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token) {
      setTokenValid(false);
      return;
    }

    const fetchUserRole = async () => {
      const token1 = localStorage.getItem("token");
      try {
        const userResponse = await axios.get("/auth/user", {
          headers: { Authorization: `Bearer ${token1}` }
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
        const token1 = localStorage.getItem("token");

        const isExpired = await axios.get(`/auth/checkExpiry/${token1}`)
        const isTokenExpired = isExpired.data;

        if (isTokenExpired) {
          setShowModal(false);
          alertSessionExpired();
        } else {
          console.log("Is token expired:", isTokenExpired);
        }
      } catch (error) {
        console.error("Failed to check token expiry:", error);
      }
    };

    const alertSessionExpired = async () => {
      alert("Your session has expired. Please log in again.");
      const response = await axios.delete(`/auth/deleteRefreshToken`, { data: { token: refreshToken } });
      if (response.status == 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('customerId');
        localStorage.removeItem('refreshToken');
      }
      setTokenValid(false);
      navigate("/login"); // Redirect to login page
    };

    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 60000);  // Check every 1 minute

    const intervalAlert = setInterval(() => {
      setShowModal(true);
    }, 90000); // Show modal 1.5 minute

    return () => {
      clearInterval(interval);
      clearInterval(intervalAlert);
    };

  }, []);

  const handleContinueSession = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("auth/refreshToken", { refreshToken });
      const newToken = response.data.token;

      localStorage.setItem("token", newToken);
      setShowModal(false);

    } catch (error) {
      console.error("Failed to refresh token:", error);
      alert("Unable to continue session. Please log in again.");

    }
  };

  if (!tokenValid) {
    return <Navigate to="/login" />;
  }

  if (role && isAdminRoute && role !== "ROLE_ADMIN") {
    return <Navigate to="/unauthorize" />;
  }

  if (role && !isAdminRoute && role === "ROLE_ADMIN") {
    return <Navigate to="/unauthorize" />;
  }

  return (
    <>
      <SessionTimeoutModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onContinueSession={handleContinueSession}
      />
      <Outlet />
    </>
  );
};
