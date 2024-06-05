import React, {useEffect, useState} from 'react';
import TransactionItems from './TransactionItems';
import axios from '../../api/axiosConfig';

// const transactions = [
//   { date: 'Sep 30, 2023', name: 'Victoria\'s Treats', amount: -92.14, status: 'Completed', method: 'Credit Card' },
//   { date: 'Sep 28, 2023', name: 'Morgan Sails, LLC', amount: 9.28, status: 'Pending', method: 'Cash' },
//   // Add other transactions here
// ];

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [sourceAccountId, setSourceAccountId] = useState('');
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        async function fetchTransactions() {
          try {
            setSourceAccountId("8081712357");
            const token = localStorage.getItem("token");
            const response = await axios.get(`/api/transactions/getTransactionBySourceAccountId/${sourceAccountId}`, { headers: { Authorization: `Bearer ${token}` } });
            setTransactions(response.data);
          } catch (error) {
            console.error("Error fetching transactions:", error);
          }
        }
    
   
        fetchTransactions();
      }, [sourceAccountId]);
  return (

    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <TransactionItems key={index} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
