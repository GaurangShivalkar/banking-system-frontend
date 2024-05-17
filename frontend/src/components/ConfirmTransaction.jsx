import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const ConfirmTransaction = () => {
  const [transactionData, setTransactionData] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleMakePayment = async () => {
    try {
      const storedData = JSON.parse(localStorage.getItem('transactionData'));
      // Make API call to insert the transaction
      await axios.post("/api/transactions/makeTransaction", storedData, {headers:{Authorization: `Bearer ${token}` }});

     
        
        // Clear transaction data from local storage after successful transaction
        localStorage.removeItem('transactionData');
        // Redirect to a success page or home page
        navigate('/dashboard');
      
    } catch (error) {
      console.error('Error making transaction:', error);
      alert('An error occurred while making the transaction');
    }
  };



  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Confirm Transaction Details</h2>
      <p><strong>Account Number:</strong> {transactionData.accountNumber}</p>
      {/* Render other transaction details based on transactionData */}
      <button
        onClick={handleMakePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Make Payment
      </button>
    </div>
  );
};

export default ConfirmTransaction;
