import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const AccountDetails = ({ accountNumber, onClose }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function fetchAccountDetails() {
      try {
        const response = await axios.get("/api/accounts/getAccountByAccountNo/" + accountNumber);
        setAccount(response.data);
        console.log(response.data); // Assuming response.data is an object with account details
      } catch (error) {
        console.log(error);
      }
    }

    fetchAccountDetails();
  }, [accountNumber]); // Fetch details whenever accountNumber changes

  if (!account) {
    return <div className="text-white">Loading...</div>; // Display loading state
  }

  return (

      <div className="bg-gray-900 min-h-screen text-white p-6">
        <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">ACCOUNT DETAILS</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-300">&rarr;</button> {/* Back button */}
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">{account.accountNumber}</h3>
            <p className="text-gray-400">{account.customer?.customerName}</p>
          </div>
          <div className="mb-8">
            <p className="text-gray-400">Account balance</p>
            <p className="text-3xl font-semibold">{account.balance}</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="flex items-center space-x-2">
                <span>Branch IFSC code</span>
              </p>
              <p>{account.branch?.branchId}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="flex items-center space-x-2">
                <span>Account number</span>
                <span className="text-gray-500 text-sm">?</span>
              </p>
              <p>{account.accountNumber}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="flex items-center space-x-2">
                <span>PAN Number</span>
                <span className="text-gray-500 text-sm">?</span>
              </p>
              <p>{account.customer?.panNumber}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="flex items-center space-x-2">
                <span>Branch Name</span>
                <span className="text-gray-500 text-sm">?</span>
              </p>
              <p>{account.branch?.branchName}</p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default AccountDetails;
