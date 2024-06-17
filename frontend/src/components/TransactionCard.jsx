import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

function TransactionCard() {
  const [transactions, setTransactions] = useState([]);
  const [sourceAccountId, setSourceAccountId] = useState('');
  const [accountList, setAccountList] = useState([]);
  const customerId = localStorage.getItem('customerId');
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`/api/accounts/getAccountsByCustomerId/${customerId}`);
        const accounts = response.data;

        if (accounts.length === 1) {
          setSourceAccountId(accounts[0].accountNumber);
        } else {
          setAccountList(accounts);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccountDetails();
  }, [customerId]);

  useEffect(() => {
    if (sourceAccountId) {
      fetchTransactions();
    }
  }, [sourceAccountId]);

  const renderAccountOptions = () => (
    accountList.map((account, index) => (
      <option key={index} value={account.accountNumber}>
        {account.accountNumber} - Balance: {account.balance}
      </option>
    ))
  );

  async function fetchTransactions() {
    try {
      const response = await axios.get(`/api/transactions/getTransactionBySourceAccountId/${sourceAccountId}`, { headers: { Authorization: `Bearer ${token}` } });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  async function downloadPdf() {
    try {
      const response = await axios.get(`/api/transactions/getPdf/${sourceAccountId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Ensure the response is treated as a binary blob
      });

      // Create a link element to download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions_by_source_account.pdf');
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  const formatTimestamp = (timestamp) => {
    const [year, month, day, hour, minute, second] = timestamp;
    const jsDate = new Date(year, month - 1, day, hour, minute, second);
    const formattedDate = jsDate.toDateString();
    return formattedDate;
  };

  return (
    <div className="flex flex-col w-full px-4 mt-7">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-blue-950">Last Transactions</h2>
      </header>
      <form onSubmit={handleFormSubmit}>
        <select
          id="source-account"
          value={sourceAccountId}
          onChange={(e) => setSourceAccountId(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
        >
          <option value="" disabled>Select an account</option>
          {renderAccountOptions()}
        </select>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Changed Balance</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Destination Account</th>
              <th className="py-2 px-4 border">Source Account</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Beneficiary Name</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                <td className="py-2 px-4 border">{transaction.transactionId}</td>
                <td className={`py-2 px-4 border font-bold ${transaction.beneficiary.accountNumber === sourceAccountId ? 'text-green-500' : 'text-red-500'}`}>{transaction.amount}</td>
                <td className="py-2 px-4 border">{transaction.changedBalance}</td>
                <td className="py-2 px-4 border">{transaction.description}</td>
                <td className="py-2 px-4 border">{transaction.beneficiary.accountNumber}</td>
                <td className="py-2 px-4 border">{transaction.sourceAccountId}</td>
                <td className="py-2 px-4 border">{transaction.customer.customerName}</td>
                <td className="py-2 px-4 border">{transaction.beneficiary.name}</td>
                <td className="py-2 px-4 border">{formatTimestamp(transaction.timestamp)}</td>
                <td className="py-2 px-4 border">{transaction.transactionStatus}</td>
                <td className="py-2 px-4 border">{transaction.transactionMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={downloadPdf} className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-gray-800">Download PDF</button>
    </div>
  );
}

export default TransactionCard;
