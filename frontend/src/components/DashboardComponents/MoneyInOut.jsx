import React from 'react';

const MoneyInOut = ({ title }) => {
  return (
    <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-2xl font-bold">$0.00</p>
      <p className="text-gray-400">No transactions yet</p>
    </div>
  );
};

export default MoneyInOut;
