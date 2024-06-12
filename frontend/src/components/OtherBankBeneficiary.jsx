import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const OtherBankBeneficiary = ({ onBack }) => {
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
    }
    try {

      await axios.post("/api/beneficiaries/addBeneficiary", formData, { headers: { Authorization: `Bearer ${token}` } });
      alert('Beneficiary has been added sucessfully');

    } catch (error) {
      console.error('Error adding beneficiary:', error);
      alert('An error occurred while adding beneficiary');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add a Beneficiary</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficiaryType">
            Beneficiary Type
          </label>
          <input
            type="text"
            id="beneficiaryType"
            name="beneficiaryType"
            value={beneficiaryType}
            disabled
            className="w-full px-3 py-2 border rounded"
          />
        </div>

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
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch-id">
            Branch ID (IFSC Code)
          </label>
          <select
            type="text"
            id="branch-id"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter branch ID (IFSC code)"
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
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button 
              type="button" 
              onClick={onBack}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-gray-500"
            >
              Back
            </button>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Add Beneficiary
        </button>
      </form>
    </div>
  );
};

export default OtherBankBeneficiary;
