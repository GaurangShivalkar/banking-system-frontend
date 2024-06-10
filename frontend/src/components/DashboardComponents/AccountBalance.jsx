import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const AccountBalance = () => {
  const customerId = localStorage.getItem("customerId");
  const [accounts, setAccounts] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerAndAccounts = async () => {
      try {
        // Fetch customer information
        const customerResponse = await axios.get(`/api/customers/showCustomer/${customerId}`);
        setCustomer(customerResponse.data);

        // Fetch accounts information
        const accountsResponse = await axios.get(`/api/accounts/getAccountsByCustomerId/${customerId}`);
        setAccounts(accountsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomerAndAccounts();
  }, [customerId]);

  return (
    <div>
      <header className="mb-6">
        {/* <h1 className="text-black text-3xl font-bold">Welcome {customer.customerName}</h1> */}
        <p className="text-gray-400">Everything remains safe and up-to-date with your account since your last visit. We're glad to have you here!</p>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <div key={account.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Account: {account.accountNumber}</h2>
            <p className="text-3xl font-bold">${account.balance}</p>
            <p className="text-gray-400">Last updated: {new Date(account.updatedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountBalance;
