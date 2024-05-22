import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

function TransactionCard() {
  const [transactions, setTransactions] = useState([]);
  const sourceAccountId = "3942176860"; // Replace with actual source account ID or fetch it dynamically

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/transactions/getTransactionBySourceAccountId/${sourceAccountId}`, {headers:{Authorization: `Bearer ${token}` }});
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, [sourceAccountId]);

  return (
    <div className="flex flex-col w-full px-4 mt-7">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-blue-950">Last Transactions</h2>
      </header>
      <div className="flex flex-col gap-5">
        {transactions.map((transaction) => (
          <div
            key={transaction.transactionId}
            className="flex justify-between p-4 bg-white rounded shadow-sm max-md:flex-col max-md:gap-4"
          >
            <div className="flex flex-col text-sm text-blue-950">
              <p className="text-base">{transaction.description || "No Description"}</p>
              <p className="text-neutral-500">{transaction.Timestamp}</p>
            </div>
            <div className="flex flex-col text-sm text-zinc-400">
              <p>{transaction.transactionMethod}</p>
              <p className="text-neutral-500">{transaction.destinationAccountId}</p>
            </div>
            <div className="flex flex-col text-sm text-neutral-500">
              <p>{transaction.transactionStatus}</p>
            </div>
            <div className={`flex flex-col text-sm ${transaction.transactionStatus === "Pending" ? "text-red-600" : "text-green-600"}`}>
              <p>${transaction.amount.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionCard;
