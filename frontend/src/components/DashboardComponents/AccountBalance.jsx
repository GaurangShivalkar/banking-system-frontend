import React from 'react';

const AccountBalance = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Account Balance</h2>
      <p className="text-3xl font-bold">$9,543.12</p>
      <p className="text-gray-400">+ $104.27 Today, Sep 25</p>
    </div>
  );
};

export default AccountBalance;
