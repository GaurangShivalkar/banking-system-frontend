import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import NavbarComponent from '../components/NavbarComponent';
import PaymentAlt from '../components/paymentAlt';

const PaymentPage = () => {
  const [transactionMethod, setTransactionMethod] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [description, setDescription] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState('');
  const [destinationAccountId, setDestinationAccountId] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      transactionMethod: transactionMethod,
      transactionStatus: transactionStatus,
      description: description,
      
      sourceAccountId: sourceAccountId,
      
      destinationAccountId: destinationAccountId,
    
      customer: {
        customerId: "666996"
      },
      amount: amount
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('/api/transactions/makeTransaction',
        transactionData, {headers:{Authorization: `Bearer ${token}` }})
      
      // Handle success scenario
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div >
    <NavbarComponent />
    {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Make a Payment</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Transaction Method</label>
            <input
              type="text"
              value={transactionMethod}
              onChange={(e) => setTransactionMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Transaction Status</label>
            <input
              type="text"
              value={transactionStatus}
              onChange={(e) => setTransactionStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Source Account ID</label>
            <input
              type="text"
              value={sourceAccountId}
              onChange={(e) => setSourceAccountId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Destination Account ID</label>
            <input
              type="text"
              value={destinationAccountId}
              onChange={(e) => setDestinationAccountId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>*/}
    <PaymentAlt />
    </div> 
  );
};

export default PaymentPage;
