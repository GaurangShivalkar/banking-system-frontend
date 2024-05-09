import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccountPage() {
  const [accountType, setAccountType] = useState("Savings");
  const [balance, setBalance] = useState("");
  const [branchId, setBranchId] = useState("");
  const navigate = useNavigate();

  const handleAccountCreation = (e) => {
    e.preventDefault();

    // Assume account creation logic here

    const accountData = {
      accountType,
      balance,
      branchId,
    };

    // Placeholder for account creation logic (replace with actual backend integration)
    console.log("Creating Account:", accountData);

    // After successful account creation (placeholder), navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-cyan-100">
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
          >
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
          <input
            type="text"
            id="branchId"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            placeholder="Enter branch ID"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl font-bold text-cyan-600 mb-2">
            Account Number
          </label>
          <input
            type="text"
            value={`ACCT-${Math.floor(Math.random() * 100000)}`} // Generate random account number (non-editable)
            readOnly
            className="w-full px-3 py-2 border rounded-md text-gray-800 bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl font-bold text-cyan-600 mb-2">
            Customer ID
          </label>
          <input
            type="text"
            value="123456" // Assuming customer ID (non-editable)
            readOnly
            className="w-full px-3 py-2 border rounded-md text-gray-800 bg-gray-100 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Create Account
        </button>
      </form>
    </section>
  );
}

export default CreateAccountPage;
