import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const OwnBankBeneficiary = ({ onClose }) => {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("customerId");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataOwn = {
      name,
      accountNumber,
      beneficiaryType: "INTERNAL",
      emailId,
      customer: {
        customerId: customerId
      }
    };

    try {
      await axios.post("/api/beneficiaries/addBeneficiary", formDataOwn, { headers: { Authorization: `Bearer ${token}` } });
      alert('Beneficiary has been added successfully');
    } catch (error) {
      console.error('Error adding beneficiary:', error);
      alert('An error occurred while adding beneficiary');
    }
  };
  const handleBackButton = () => {
    setShowSuccess(false);
    navigate(-1);
  };

  return (
    <div className="w-full bg-white p-8 shadow-md rounded">
    
        <h2 className="text-2xl font-semibold mb-6">Add a Beneficiary</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Beneficiary Account No.</label>
            <input 
              type="text" 
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              placeholder="Enter account number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              placeholder="Enter nickname"
            />
            <p className="text-xs text-gray-500 mt-1">Enter name without "&" and "%"</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email ID</label>
            <input 
              type="email" 
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              placeholder="Enter email ID"
            />
          </div>
          <div className="flex justify-between items-center mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-gray-500"
            >
              Back
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
 
  );
};

export default OwnBankBeneficiary;
