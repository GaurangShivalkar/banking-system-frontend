import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { generatePdf } from '../../api/generatePdf'; 

const AdminTransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [disabledSelectBoxes, setDisabledSelectBoxes] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get("/api/transactions/showTransaction", { headers: { Authorization: `Bearer ${token}` } });
            setTransactions(sortDesc(response.data));
            setFilteredList(sortDesc(response.data));
        } catch (error) {
            console.error("Error fetching accounts data:", error);
        }
    };

    const sortDesc = (transaction) => {
        const sorted = transaction.sort((a,b) => {
          const c = formatTimestamp(a.timestamp)
          const d = formatTimestamp(b.timestamp)
          return d-c;
        })
        return sorted;
    }
    const applyFilter = () => {
        let filtered = [...transactions];
        if (filterType && filterValue) {
            switch (filterType) {
                case 'source':
                    filtered = filtered.filter(transaction => transaction.sourceAccountId.toString().includes(filterValue));
                    break;
                case 'method':
                    filtered = filtered.filter(transaction => transaction.transactionMethod.includes(filterValue));
                    break;
                case 'type':
                    filtered = filtered.filter(transaction => transaction.transactionType.includes(filterValue));
                    break;
                case 'dateRange':
                    const { startDate, endDate } = filterValue;
                    if (startDate && endDate) {
                        const start = new Date(startDate);
                        const end = new Date(endDate);
                        filtered = filtered.filter(transaction => {
                            const tdate = formatTimestamp(transaction.timestamp);
                            const transactionDate = new Date(tdate);
                            return transactionDate >= start && transactionDate <= end;
                        });
                    }
                    break;
                default:
                    break;
            }
        }
        setFilteredList(sortDesc(filtered));
    };

    const updateStatus = async (transactionId, newStatus) => {
        try {
            await axios.put(`/api/transactions/updateTransactionStatus/${transactionId}`, {
                transactionStatus: newStatus,
            }, { headers: { Authorization: `Bearer ${token}` } });
            fetchTransactions();
            setDisabledSelectBoxes(prevState => ({ ...prevState, [transactionId]: true }));
        } catch (error) {
            console.error("Error updating account status:", error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const [year, month, day, hour, minute, second] = timestamp;
        const jsDate = new Date(year, month - 1, day, hour, minute, second);
        return jsDate;
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterValue(''); }} className="p-2 border rounded mb-2">
                    <option value="">Select Filter</option>
                    <option value="source">By Source Account</option>
                    <option value="method">By method</option>
                    <option value="dateRange">Date Range</option>
                    <option value="type">By type</option>
                </select>
                {filterType === 'source' && (
                    <input type="text" placeholder="ACCOUNT NUMBER" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
                )}
                {filterType === 'method' && (
                    <div className="mb-2">
                        <label className="mr-4">
                            <input type="radio" value="INTERNAL" checked={filterValue === "INTERNAL"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            INTERNAL
                        </label>
                        <label>
                            <input type="radio" value="EXTERNAL" checked={filterValue === "EXTERNAL"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            EXTERNAL
                        </label>
                    </div>
                )}
                {filterType === 'type' && (
                    <div className="mb-2">
                        <label className="mr-4">
                            <input type="radio" value="IMPS" checked={filterValue === "IMPS"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            IMPS
                        </label>
                        <label>
                            <input type="radio" value="RTGS" checked={filterValue === "RTGS"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            RTGS
                        </label>
                        <label>
                            <input type="radio" value="NEFT" checked={filterValue === "NEFT"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            NEFT
                        </label>
                    </div>
                )}
                {filterType === 'dateRange' && (
                    <>
                        <input type="date" placeholder="Start Date" value={filterValue.startDate || ''} onChange={(e) => setFilterValue({ ...filterValue, startDate: e.target.value })} className="p-2 border rounded mb-2" />
                        <input type="date" placeholder="End Date" value={filterValue.endDate || ''} onChange={(e) => setFilterValue({ ...filterValue, endDate: e.target.value })} className="p-2 border rounded mb-2" />
                    </>
                )}
                <button onClick={applyFilter} className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-gray-800">Apply Filter</button>
            </div>
            <div className="overflow-x-auto">
                {filteredList.length > 0 ? (
                    <table id="admin-transactions-table" className="min-w-full bg-white border-collapse shadow-lg">
                        
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-4 border">Timestamp</th>
                                <th className="py-2 px-4 border">Amount</th>
                                <th className="py-2 px-4 border">Changed Balance</th>
                                <th className="py-2 px-4 border">Description</th>
                                <th className="py-2 px-4 border">TO</th>
                                <th className="py-2 px-4 border">FROM</th>
                                <th className="py-2 px-4 border">Customer</th>
                                <th className="py-2 px-4 border">Beneficiary Name</th>
                                <th className="py-2 px-4 border">Method</th>
                                <th className="py-2 px-4 border">Type</th>
                                <th className="py-2 px-4 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.map((transaction, index) => (
                                <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200">
                                    <td className="py-2 px-4 border">{formatTimestamp(transaction.timestamp).toString()}</td>
                                    <td className="py-2 px-4 border">{transaction.amount}</td>
                                    <td className="py-2 px-4 border">{transaction.changedBalance}</td>
                                    <td className="py-2 px-4 border">{transaction.description}</td>
                                    <td className="py-2 px-4 border">{transaction.beneficiary.accountNumber}</td>
                                    <td className="py-2 px-4 border">{transaction.sourceAccountId}</td>
                                    <td className="py-2 px-4 border">{transaction.customer.customerName}</td>
                                    <td className="py-2 px-4 border">{transaction.beneficiary.name}</td>
                                    <td className="py-2 px-4 border">{transaction.transactionType}</td>
                                    <td className="py-2 px-4 border">{transaction.transactionMethod}</td>
                                  
                                    <td className="py-2 px-4 border">
                                        {transaction.transactionStatus === 'processed' && !disabledSelectBoxes[transaction.transactionId] ? (
                                            <select value={transaction.transactionStatus} onChange={(e) => updateStatus(transaction.transactionId, e.target.value)} className="p-2 border rounded">
                                                <option value="">Processed</option>
                                                <option value="completed">Completed</option>
                                                <option value="failed">Failed</option>
                                                <option value="refunded">Refunded</option>
                                            </select>
                                        ) : (
                                            <span>{transaction.transactionStatus}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No Accounts found</p>
                )}
            </div>
            <button onClick={() => generatePdf("admin-transactions-table","admin-transactions-pdf")} className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-gray-800">Download PDF</button>
        </div>
    );
};

export default AdminTransactionList;
