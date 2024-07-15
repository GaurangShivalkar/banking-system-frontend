import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';// For navigation

const useAutoLogout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // User authentication state
  const navigate = useNavigate()

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem('token');
      const isExpired = await axios.get(`/api/users/checkExpiry/token`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!isExpired) {
        setIsAuthenticated(false);
        return; // No token, already logged out
      }

      try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert exp to milliseconds

        if (isExpired) {
          setIsAuthenticated(false);
          localStorage.removeItem(token);
          navigate('/login'); // Redirect to login page
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false); // Handle potential errors gracefully (e.g., logout)
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return isAuthenticated;
};

export default useAutoLogout;