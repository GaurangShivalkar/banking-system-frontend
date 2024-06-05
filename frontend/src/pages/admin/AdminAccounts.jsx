import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/api/accounts/getAllAccounts");
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching accounts data:", error);
      setLoading(false);
    }
  };

  const toggleStatus = async (accountId, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "success" : "pending";
    try {
      await axios.put(`/api/accounts/updateAccount/${accountId}`, {
        accountStatus: newStatus,
      });
      fetchAccounts();
    } catch (error) {
      console.error("Error updating account status:", error);
    }
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
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Account Number</th>
              <th className="py-2 px-4 border">Created On</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Balance</th>
              <th className="py-2 px-4 border">IFSC Code</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr
                key={index}
                className="text-center odd:bg-gray-100 even:bg-gray-200"
              >
                <td className="py-2 px-4 border">{account.accountId}</td>
                <td className="py-2 px-4 border">{account.accountNumber}</td>
                <td className="py-2 px-4 border">
                  {account.accountTimestamp}
                </td>
                <td className="py-2 px-4 border">{account.accountType}</td>
                <td className="py-2 px-4 border">{account.balance}</td>
                <td className="py-2 px-4 border">{account.branch.branchId}</td>
                <td className="py-2 px-4 border">{account.customer.name}</td>
                <td className="py-2 px-4 border">{account.accountStatus}</td>
                <td className="py-2 px-4 border">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={account.accountStatus === "success"}
                        onChange={() =>
                          toggleStatus(account.accountId, account.accountStatus)
                        }
                      />
                      <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                          account.accountStatus === "success"
                            ? "transform translate-x-full bg-green-500"
                            : ""
                        }`}
                      ></div>
                    </div>
                    <span className="ml-3 text-gray-700">
                      {account.accountStatus === "success" ? "Success" : "Pending"}
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

const AdminAccounts = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <AccountList />
      </div>
    </div>
  );
};

export default AdminAccounts;
