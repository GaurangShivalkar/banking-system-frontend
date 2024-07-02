import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const Deposit = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const customerId = localStorage.getItem('customerId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (customerId) {
      fetchAccounts();
    }
  }, [customerId]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`/api/accounts/getAccountsByCustomerId/${customerId}`,{headers: { Authorization: `Bearer ${token}` }});
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleDeposit = async () => {
    if (!selectedAccountId || !amount) {
      alert('Please select an account and enter an amount.');
      return;
    }

    try {
      console.log(selectedAccountId)
      await axios.put(`/api/accounts/updateBalance/${selectedAccountId}?amount=${amount}`);
      alert('Deposit successful!');
      setAmount('');
      fetchAccounts(); // Refresh accounts to show updated balance
    } catch (error) {
      console.error('Error depositing amount:', error);
      alert('Deposit failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-10">
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Deposit</h2>

      <select
        value={selectedAccountId}
        onChange={(e) => setSelectedAccountId(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option value="">Select Account</option>
        {accounts.map((account) => (
          <option key={account.accountId} value={account.accountId}>
            {account.accountNumber} - Balance: ${account.balance}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded mb-4"
      />

      <button
        onClick={handleDeposit}
        className="bg-blue-600 text-white p-2 rounded hover:bg-gray-800"
      >
        Deposit
      </button>
    </div>
    </div>
  );
};

export default Deposit;
