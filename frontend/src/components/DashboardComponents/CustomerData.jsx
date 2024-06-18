import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const CustomerData = () => {
  const customerId = localStorage.getItem("customerId");
  
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Fetch customer information
        const customerResponse = await axios.get(`/api/customers/showCustomer/${customerId}`);
        setCustomer(customerResponse.data.customerName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-black text-3xl font-bold">Welcome {customer}</h1> 
      </header>
    </div>
  );
};

export default CustomerData;
