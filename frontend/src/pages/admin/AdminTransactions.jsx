import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions/showTransaction", { headers: { Authorization: `Bearer ${token}` } });
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accounts data:", error);
      setLoading(false);
    }
  };

  const toggleStatus = async (transactionId, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "success" : "pending";
    try {
      await axios.put(`/api/transactions/updateTransactionStatus/${transactionId}`, {
        transactionStatus: newStatus,
      }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTransactions();
    } catch (error) {
      console.error("Error updating account status:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const [year, month, day, hour, minute, second] = timestamp;

    // Create JavaScript Date object
    const jsDate = new Date(year, month - 1, day, hour, minute, second);

    // Format the date into a desired string representation
    const formattedDate = jsDate.toDateString();
    return formattedDate;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              {/* <th className="py-2 px-4 border">ID</th> */}
              <th className="py-2 px-4 border">Timestamp</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Changed Balance</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Destination Account</th>
              <th className="py-2 px-4 border">Source Account</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Beneficiary Name</th>
              {/* <th className="py-2 px-4 border">Status</th> */}
              <th className="py-2 px-4 border">Method</th>
              <th className="py-2 px-4 border">Verify Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="text-center odd:bg-gray-100 even:bg-gray-200"
              >
                {/* <td className="py-2 px-4 border">{transaction.transactionId}</td> */}
                <td className="py-2 px-4 border">{formatTimestamp(transaction.timestamp)}</td>
                <td className="py-2 px-4 border">{transaction.amount}</td>
                <td className="py-2 px-4 border">{transaction.changedBalance}</td>
                <td className="py-2 px-4 border">{transaction.description}</td>
                <td className="py-2 px-4 border">{transaction.beneficiary.accountNumber}</td>
                <td className="py-2 px-4 border">{transaction.sourceAccountId}</td>
                <td className="py-2 px-4 border">{transaction.customer.customerName}</td>
                <td className="py-2 px-4 border">{transaction.beneficiary.name}</td>
                {/* <td className="py-2 px-4 border">{transaction.transactionStatus}</td> */}
                <td className="py-2 px-4 border">{transaction.transactionMethod}</td>
                <td className="py-2 px-4 border">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={transaction.transactionStatus === "success"}
                        onChange={() =>
                          toggleStatus(transaction.transactionId, transaction.transactionStatus)
                        }
                      />
                      <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                          transaction.transactionStatus === "success"
                            ? "transform translate-x-full bg-green-500"
                            : ""
                        }`}
                      ></div>
                    </div>
                    <span className="ml-3 text-gray-700">
                      {transaction.transactionStatus === "success" ? "Verified" : "Pending"}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminTransactions = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <TransactionList />
      </div>
    </div>
  );
};

export default AdminTransactions;
