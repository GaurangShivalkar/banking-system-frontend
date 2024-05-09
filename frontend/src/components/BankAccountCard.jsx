import React from 'react';

const BankAccountCard = ({
  accountNo,
  timestamp,
  accountType,
  balance,
  branchId,
  branchName,
  branchAddress,
  customerId
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-sm mb-8">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Account Details</div>
        <p className="text-gray-700 text-base mb-2">
          Account No: {accountNo}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Timestamp: {timestamp}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Account Type: {accountType}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Balance: {balance}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Branch ID: {branchId}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Branch Name: {branchName}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Branch Address: {branchAddress}
        </p>
        <p className="text-gray-700 text-base mb-2">
          Customer ID: {customerId}
        </p>
      </div>
    </div>
  );
};

export default BankAccountCard;
