// AdminAccountList.jsx
import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import { generatePdf } from '../../api/generatePdf'; 

const AdminAccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/api/accounts/getAllAccounts");
      setAccounts(response.data);
      setFilteredList(response.data);
    } catch (error) {
      console.error("Error fetching accounts data:", error);
    }
  };

  const applyFilter = () => {
    let filtered = [...accounts];

    if (filterType && filterValue) {
      switch (filterType) {
        case 'customer':
          filtered = filtered.filter(account => account.customer.customerId.toString().includes(filterValue));
          break;
        case 'accountType':
          filtered = filtered.filter(account => account.accountType.includes(filterValue));
          break;
        case 'status':
          filtered = filtered.filter(account => account.accountStatus.includes(filterValue));
          break;
        case 'ifscCode':
          filtered = filtered.filter(account => account.branch.branchId.includes(filterValue));
          break;
        default:
          break;
      }
    }
    setFilteredList(filtered);
  };

  const formatTimestamp = (timestamp) => {
    const [year, month, day, hour, minute, second] = timestamp;
    const jsDate = new Date(year, month - 1, day, hour, minute, second);
    return jsDate;
  };

  const updateStatus = async (accountId, newStatus) => {
    try {
      await axios.put(`/api/accounts/updateAccount/${accountId}`, {
        accountStatus: newStatus,
      });
      fetchAccounts();
    } catch (error) {
      console.error("Error updating account status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterValue(''); }} className="p-2 border rounded mb-2">
          <option value="">Select Filter</option>
          <option value="customer">By Customer ID</option>
          <option value="accountType">By Account type</option>
          <option value="status">By status</option>
          <option value="ifscCode">By IFSC Code</option>
        </select>
        {filterType === 'customer' && (
          <input type="text" placeholder="customer" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}
        {filterType === 'accountType' && (
          <div className="mb-2">
            <label className="mr-4">
              <input type="radio" value="Saving" checked={filterValue === "Saving"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
              Saving
            </label>
            <label>
              <input type="radio" value="Current" checked={filterValue === "Current"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
              Current
            </label>
          </div>
        )}
        {filterType === 'status' && (
          <div className="mb-2">
            <label className="mr-4">
              <input type="radio" value="active" checked={filterValue === "active"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
              Active
            </label>
            <label>
              <input type="radio" value="dormant" checked={filterValue === "dormant"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
              Dormant
            </label>
            <label>
              <input type="radio" value="blocked" checked={filterValue === "blocked"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
              Blocked
            </label>
            <label>
              <input type="radio" value="closed" checked={filterValue === "closed"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
              Closed
            </label>
          </div>
        )}
        {filterType === 'ifscCode' && (
          <input type="text" placeholder="IFSC CODE" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}
        <button onClick={applyFilter} className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-gray-800">Apply Filter</button>
      </div>

      <div className="overflow-x-auto">
        {filteredList.length > 0 ? (
          <table id="admin-account-table" className="min-w-full bg-white border-collapse shadow-lg">
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
              {filteredList.map((account, index) => (
                <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200">
                  <td className="py-2 px-4 border">{account.accountId}</td>
                  <td className="py-2 px-4 border">{account.accountNumber}</td>
                  <td className="py-2 px-4 border">{formatTimestamp(account.accountTimestamp).toLocaleDateString('en-GB')}</td>
                  <td className="py-2 px-4 border">{account.accountType}</td>
                  <td className="py-2 px-4 border">{account.balance}</td>
                  <td className="py-2 px-4 border">{account.branch.branchId}</td>
                  <td className="py-2 px-4 border">{account.customer.customerId}</td>
                  <td className="py-2 px-4 border">{account.accountStatus}</td>
                  <td className="py-2 px-4 border">
                    <select
                      value={account.accountStatus}
                      onChange={(e) => updateStatus(account.accountId, e.target.value)}
                      className="p-2 border rounded"
                      disabled={account.accountStatus === "closed"}
                    >
                      <option value="">Select</option>
                      <option value="active">Active</option>
                      <option value="dormant">Dormant</option>
                      <option value="blocked">Blocked</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No Accounts found</p>
        )}
      </div>
      <button onClick={() => generatePdf("admin-account-table","admin-account-pdf")} className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-gray-800">Download PDF</button>
    </div>
  );
};

export default AdminAccountList;
