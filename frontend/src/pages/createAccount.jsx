import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

function CreateAccountPage() {
  const [accountType, setAccountType] = useState("");
  const [balance, setBalance] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const navigate = useNavigate();

  useEffect(() => { fetchBranches(); }, []);
  useEffect(() => { fetchCustomerId(); }, []);


  const fetchBranches = async () => {
    try {
      const response = await axios.get("api/branch/showAllBranches");
      setBranches(response.data);
      
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const fetchCustomerId = async () => {
    try {
      const custId = localStorage.getItem("customerId");
      //const customerResponse = await axios.get(`/api/customers/getCustomerIdByPan`, { params: { panNumber: panNumber } });
      setCustomerId(custId);
      
    } catch (error) {
      console.error("Error fetching customerId:", error);
    }
  };
 
  const handleAccountCreation = async (e) => {
    e.preventDefault();

    

    const accountData = {
      

      //customerId:
      accountType: accountType,
      balance: balance,
      customer: {
        customerId:customerId
      },
      branch: {
        branchId:branchId
    
      }
      // branch: branch,
    };

    console.log("Sending account data:", accountData);


    await axios.post("/api/accounts/createAccount", accountData);
    
    // After successful account creation (placeholder), navigate to the dashboard
    navigate("/register");
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <form onSubmit={handleAccountCreation} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-3xl font-bold text-cyan-800 mb-6 text-center">Create Bank Account</h1>
        <div className="mb-4">
          <label htmlFor="accountType" className="block text-xl font-bold text-cyan-600 mb-2">
            Account Type
          </label>
          <select
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="balance" className="block text-xl font-bold text-cyan-600 mb-2">
            Balance
          </label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Enter initial balance"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="branchId" className="block text-xl font-bold text-cyan-600 mb-2">
            Branch ID
          </label>
          <label htmlFor="branchId" className="block text-sm font-medium text-gray-700">
            Branch
          </label>
          <select
            id="branchId"
            name="branchId"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-xl font-bold text-cyan-600 mb-2">
            Customer ID
          </label>
          <input
            type="text"
            value={customerId} // Assuming customer ID (non-editable)
            readOnly
            className="w-full px-3 py-2 border rounded-md text-gray-800 bg-gray-100 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-gray-800 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Create Account
        </button>
      </form>
    </section>
  );
}

export default CreateAccountPage;
