import React from 'react';

const TransactionItems = ({ transaction }) => {
 

  return (
    <li className="flex justify-between items-center py-2 border-b border-gray-700">
      <div>
        <p className="font-semibold">{transaction.customer.customerName}</p>
        <p className="text-gray-400">{transaction.Timestamp}</p>
      </div>
      <div className="text-right">
        <p className={`font-bold ${transaction.method == "INTERNAL" ? 'text-red-500' : 'text-green-500'}`}>
          -{transaction.amount}
        </p>
        <p className="text-gray-400">{transaction.transactionStatus}</p>
      </div>
      <div className="ml-4">
        <span className="bg-blue-600 text-white px-2 py-1 rounded">{transaction.transactionMethod}</span>
      </div>
    </li>
  );
};

export default TransactionItems;
