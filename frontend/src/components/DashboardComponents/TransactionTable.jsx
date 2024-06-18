import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
      <h3 className="text-lg text-white">Transaction History</h3>
      <table className="min-w-full mt-2 text-white">
        <thead>
          <tr>
            <th>Receiver</th>
            <th>Type</th>
            <th>Date</th>
            <th>Amount Paid</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="bg-gray-700 mt-2">
              <td className="p-2">{transaction.receiver}</td>
              <td className="p-2">{transaction.type}</td>
              <td className="p-2">{transaction.date}</td>
              <td className="p-2">${transaction.amountPaid}</td>
              <td className="p-2">${transaction.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
