import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const TransactionCard = ({sourceAccountId}) => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (sourceAccountId) {
      fetchTransactions();
    }
  }, [sourceAccountId]);

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
    }
  }

  const formatTimestamp = (timestamp) => {
    const [year, month, day, hour, minute, second] = timestamp;
    const jsDate = new Date(year, month - 1, day, hour, minute, second);
    const formattedDate = jsDate.toLocaleDateString();
    return formattedDate;
  };

  return (
    <div className="flex flex-col w-full px-4 mt-7">
      <header className="mb-4">
        <h2 className="text-l font-bold text-blue-950">Transactions</h2>
      </header>
      <div className="overflow-x-auto">
        {transactions.length > 0 ? (
          <table className="min-w-full bg-white border-collapse shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                {/* <th className="py-2 px-4 border">ID</th> */}
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Changed Balance</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Destination Account</th>
                <th className="py-2 px-4 border">Source Account</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Beneficiary Name</th>
              
                <th className="py-2 px-4 border">Status</th>
                {/* <th className="py-2 px-4 border">Method</th> */}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                  {/* <td className="py-2 px-4 border">{transaction.transactionId}</td> */}
                  <td className={`py-2 px-4 border font-bold ${transaction.beneficiary.accountNumber === sourceAccountId ? 'text-green-500' : 'text-red-500'}`}>{transaction.amount}</td>
                  <td className="py-2 px-4 border">{transaction.changedBalance}</td>
                  <td className="py-2 px-4 border">{transaction.description}</td>
                  <td className="py-2 px-4 border">{transaction.destinationAccountId}</td>
                  <td className="py-2 px-4 border">{transaction.sourceAccountId}</td>
                  <td className="py-2 px-4 border">{formatTimestamp(transaction.timestamp)}</td>
                  <td className="py-2 px-4 border">{transaction.customer.customerName}</td>
                  <td className="py-2 px-4 border">{transaction.beneficiary.name}</td>
                  
                  <td className="py-2 px-4 border">{transaction.transactionStatus}</td>
                  {/* <td className="py-2 px-4 border">{transaction.transactionMethod}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No recent transactions</p>
        )}
      </div>
      <button onClick={downloadPdf} className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-gray-800">Download PDF</button>
    </div>
  );
}

export default TransactionCard;
