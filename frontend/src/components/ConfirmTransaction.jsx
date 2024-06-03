import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import NavbarComponent from './NavbarComponent';

const ConfirmTransaction = () => {
  const [transactionData, setTransactionData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve and parse transactionData from localStorage
    const transactionDataString = localStorage.getItem("transactionData");
    if (transactionDataString) {
      const transactionDataObj = JSON.parse(transactionDataString);
      setTransactionData(transactionDataObj);
    }
  }, []);

  const handleMakePayment = async () => {
    if (!transactionData) {
      console.error('Transaction data is not available');
      return;
    }

    try {
      console.log('Submitting transaction:', transactionData);

      const response = await axios.post('/api/transactions/makeTransaction', transactionData, {
        headers: { Authorization: `Bearer ${token}` }
      });


      localStorage.removeItem('transactionData');
      alert('Transaction response:', response);
      // Handle success scenario (e.g., navigate to a success page or show a success message)
      // Adjust the path as needed
    } catch (error) {
      console.error('Error submitting transaction:', error);
      alert('An error occurred while making the transaction');
    }
  };

  if (!transactionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <NavbarComponent />
      <div className='p-4 sm:ml-64'>
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10">
          <h2 className="text-xl font-semibold mb-4">Confirm Transaction Details</h2>
          <p><strong>Amount:</strong> {transactionData.amount}</p>
          <p><strong>Source Account ID:</strong> {transactionData.sourceAccountId}</p>
          <p><strong>Transaction Status:</strong> {transactionData.transactionStatus}</p>
          <p><strong>Description:</strong> {transactionData.description}</p>
          <button
            onClick={handleMakePayment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Make Payment
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmTransaction;
