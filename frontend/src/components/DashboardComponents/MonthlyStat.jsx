import React from 'react';

const MonthlyStats = ({ stats }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
      <h3 className="text-lg text-white">Monthly Statistics</h3>
      <div className="mt-2">
        {stats.map((stat, index) => (
          <div key={index} className="mt-2 text-white">
            <span>{stat.week}: </span>
            <span>${stat.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyStats;
