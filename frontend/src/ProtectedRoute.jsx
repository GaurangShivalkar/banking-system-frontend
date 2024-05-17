import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Check if token exists
  if (!token) {
    // If token doesn't exist, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (protected content)
  return <Outlet/>;
};
