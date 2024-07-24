import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

const TransactionCard = ({ sourceAccountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (sourceAccountId) {
      fetchTransactions();
    }
  }, [sourceAccountId]);

  async function fetchTransactions() {
    try {
      const response = await axios.get(`/api/transactions/getTransactionBySourceAccountId/${sourceAccountId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTransactions(sortDesc(response.data));
      setFilteredTransactions(sortDesc(response.data));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  const sortDesc = (transaction) => {
    const sorted = transaction.sort((a, b) => {
      const c = formatTimestamp(a.timestamp)
      const d = formatTimestamp(b.timestamp)
      return d - c;
    })
    return sorted;
  }

  const applyFilter = () => {
    let filtered = [...transactions];

    if (filterType && filterValue) {
      switch (filterType) {
        case 'beneficiaryName':
          filtered = filtered.filter(transaction => transaction.beneficiary.name.toLowerCase().includes(filterValue.toLowerCase()));
          break;
        case 'dateRange':
          const { startDate, endDate } = filterValue;
          if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            console.log(start, end);
            filtered = filtered.filter(transaction => {
              const tdate = formatTimestamp(transaction.timestamp);
              const transactionDate = new Date(tdate);
              console.log(transactionDate);
              return transactionDate >= start && transactionDate <= end;
            });
          }
          break;
        case 'transactionType':
          filtered = filtered.filter(transaction => transaction.transactionType.includes(filterValue));
          break;
        case 'amountRange':
          const { minBalance, maxBalance } = filterValue;
          filtered = filtered.filter(transaction => transaction.amount >= minBalance && transaction.amount <= maxBalance);
          break;
        default:
          break;
      }
    }
    setFilteredTransactions(sortDesc(filtered));
  };

  // async function downloadPdf() {
  //   try {
  //     const response = await axios.get(`/api/transactions/getPdf/${sourceAccountId}`, {headers: {Authorization: `Bearer ${token}`}, responseType: 'blob'});
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'transactions_by_source_account.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error fetching transactions:", error);
  //   }
  // }

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      encryption: {
        userPassword: `${sourceAccountId}`
      }
    });
    pdf.text(`Transaction data for your account number: ${sourceAccountId}`, 15, 10); // Adjusted position
    pdf.autoTable({ html: '#transactions-table', startY: 20 });
    pdf.save("transactions-data.pdf");
  };

  const formatTimestamp = (timestamp) => {
    const [year, month, day, hour, minute, second] = timestamp;
    const jsDate = new Date(year, month - 1, day, hour, minute, second);
    //return jsDate.toLocaleDateString('en-GB');
    return jsDate
  };

  return (
    <div className="flex flex-col w-full px-4 mt-7">
      <header className="mb-4">
        <h2 className="text-l font-bold text-blue-950">All Transactions</h2>
      </header>

      <div className="mb-4">
        <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterValue(''); }} className="p-2 border rounded mb-2">
          <option value="">Select Filter</option>
          <option value="beneficiaryName">Beneficiary Name</option>
          <option value="accountNumber">Source/Destination Account Number</option>
          <option value="dateRange">Date Range</option>
          <option value="transactionType">Transaction Type</option>
          <option value="amountRange">Amount Range</option>
        </select>
        {filterType === 'beneficiaryName' && (
          <input type="text" placeholder="Beneficiary Name" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}
        {filterType === 'accountNumber' && (
          <input type="text" placeholder="Account Number" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}
        {filterType === 'dateRange' && (
          <>
            <input type="date" placeholder="Start Date" value={filterValue.startDate || ''} onChange={(e) => setFilterValue({ ...filterValue, startDate: e.target.value })} className="p-2 border rounded mb-2" />
            <input type="date" placeholder="End Date" value={filterValue.endDate || ''} onChange={(e) => setFilterValue({ ...filterValue, endDate: e.target.value })} className="p-2 border rounded mb-2" />
          </>
        )}
        {filterType === 'transactionType' && (
          <input type="text" placeholder="Transaction Type" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}
        {filterType === 'amountRange' && (
          <>
            <input type="number" placeholder="Min Balance" value={filterValue.minBalance || ''} onChange={(e) => setFilterValue({ ...filterValue, minBalance: e.target.value })} className="p-2 border rounded mb-2" />
            <input type="number" placeholder="Max Balance" value={filterValue.maxBalance || ''} onChange={(e) => setFilterValue({ ...filterValue, maxBalance: e.target.value })} className="p-2 border rounded mb-2" />
          </>
        )}
        <button onClick={applyFilter} className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-gray-800">Apply Filter</button>
      </div>

      <div className="overflow-x-auto">
        {filteredTransactions.length > 0 ? (
          <table id="transactions-table" className="min-w-full bg-white border-collapse shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Changed Balance</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">To</th>
                <th className="py-2 px-4 border">From</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Beneficiary Name</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                  <td className={`py-2 px-4 border font-bold ${transaction.beneficiary.accountNumber === sourceAccountId ? 'text-green-500' : 'text-red-500'}`}>{transaction.amount}</td>
                  <td className="py-2 px-4 border">{transaction.beneficiary.accountNumber === sourceAccountId ? transaction.receiverBalance : transaction.changedBalance}</td>
                  <td className="py-2 px-4 border">{transaction.description}</td>
                  <td className="py-2 px-4 border">{transaction.destinationAccountId}</td>
                  <td className="py-2 px-4 border">{transaction.sourceAccountId}</td>
                  <td className="py-2 px-4 border">{formatTimestamp(transaction.timestamp).toLocaleDateString('en-GB')}</td>
                  <td className="py-2 px-4 border">{transaction.customer.customerName}</td>
                  <td className="py-2 px-4 border">{transaction.beneficiary.name}</td>
                  <td className="py-2 px-4 border">{transaction.transactionStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No recent transactions</p>
        )}
      </div>
      <button onClick={generatePDF} className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-gray-800">Download PDF</button>
    </div>
  );
}
export default TransactionCard;