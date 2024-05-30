import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import AccountDetails from "./AccountDetails"; // Import the AccountDetails component

const AccountOverview = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null); // State to track the selected account
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control drawer visibility

  useEffect(() => {
    async function fetchAccountDetails() {
      try {
        const customerId = localStorage.getItem("customerId");
        const response = await axios.get("/api/accounts/getAccountsByCustomerId/" + customerId);
        setAccounts(response.data); // Assuming response.data is an array of account details
      } catch (error) {
        console.log(error);
      }
    }

    fetchAccountDetails();
  }, []);

  const handleAccountClick = (accountNumber) => {
    setSelectedAccount(accountNumber); // Set the selected account number
    setDrawerOpen(true); // Open the drawer
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
  };

  return (
    <div className="sm:ml-64 p-4">
      <div className="text-white max-w-full mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Accounts</h1>
        <div className="flex space-x-8 mb-8">
          <a href="#" className="text-purple-500 border-b-2 border-purple-500 pb-2">Accounts</a>
          <a href="#" className="text-gray-500 hover:text-gray-300">Linked accounts</a>
          <a href="#" className="text-gray-500 hover:text-gray-300">Transfer rules</a>
        </div>
        <div className="mb-8">
          <p className="text-green-900">Global balance</p>
          <p className="text-3xl text-black font-semibold">$15,389.22</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <p>Account</p>
              <p>Balance</p>
            </div>
          </div>
          <div className="p-4">
            {accounts.map((account, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => handleAccountClick(account.accountNumber)} // Handle click
              >
                <div className="flex items-center space-x-10">
                  <p>{account.accountNumber}</p>
                  <p>{account.accountType}</p>
                </div>
                <p>{account.balance} ₹</p>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 text-gray-500">
              <button className="flex items-center space-x-2">
                <span className="text-2xl">+</span>
                <span>Add an account</span>
              </button>
            </div>
          </div>
        </div>
        {drawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className={`w-full sm:w-1/3 bg-gray-900 h-full transition-transform transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <AccountDetails accountNumber={selectedAccount} onClose={handleCloseDrawer} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountOverview;
