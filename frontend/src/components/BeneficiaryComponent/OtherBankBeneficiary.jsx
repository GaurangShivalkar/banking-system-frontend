import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const OtherBankBeneficiary = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchId, setBranchId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [beneficiaryType, setBeneficiaryType] = useState("");
  const [branches, setBranches] = useState([]);

  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("api/branch/showAllBranches");
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
    setBeneficiaryType("EXTERNAL");
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      beneficiaryType,
      accountNumber,
      branch: {
        branchId: branchId
      },
      emailId,
      customer: {
        customerId: customerId
      }
    };

    try {
      await axios.post("/api/beneficiaries/addBeneficiary", formData, { headers: { Authorization: `Bearer ${token}` } });
      alert('Beneficiary has been added successfully');
    } catch (error) {
      console.error('Error adding beneficiary:', error);
      alert('An error occurred while adding beneficiary');
    }
  };

  return (
  
      <div className="w-full bg-gray-700 p-8 shadow-md rounded">
        <h2 className="text-2xl text-white font-bold mb-6">Add a Beneficiary</h2>
        <form onSubmit={handleFormSubmit}>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficiaryType">
              Beneficiary Type
            </label>
            <input
              type="text"
              id="beneficiaryType"
              name="beneficiaryType"
              value={beneficiaryType}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountNumber">
              Beneficiary Account No
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter account number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch-id">
              Branch ID (IFSC Code)
            </label>
            <select
              id="branch-id"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.branchId} value={branch.branchId}>
                  {branch.branchId}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficiaryName">
              Beneficiary Name
            </label>
            <input
              type="text"
              id="beneficiaryName"
              name="beneficiaryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
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

export default OtherBankBeneficiary;
