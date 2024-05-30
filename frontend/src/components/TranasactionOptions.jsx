import React, { useState } from 'react';
 
const TransactionOptions = () => {
  const [account, setAccount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
 
  const handleTransfer = () => {
    // Handle the transfer logic here
    console.log('Transfer details:', { account, beneficiary, accountNumber, ifscCode, accountType, amount });
  };
 
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Third Party Funds Transfer</h1>
      <div className="mb-4">
        <label className="block text-gray-700">From Account</label>
        <select className="w-full mt-1 p-2 border rounded" value={account} onChange={(e) => setAccount(e.target.value)}>
          <option value="">- Select An Account -</option>
          <option value="account1">Account 1</option>
          <option value="account2">Account 2</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Beneficiary</label>
        <select className="w-full mt-1 p-2 border rounded" value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)}>
          <option value="">- Select A Beneficiary -</option>
          <option value="beneficiary1">Beneficiary 1</option>
          <option value="beneficiary2">Beneficiary 2</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Beneficiary Account Number / Credit Card Number</label>
        <input type="text" className="w-full mt-1 p-2 border rounded" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Beneficiary IFSC Code</label>
        <input type="text" className="w-full mt-1 p-2 border rounded" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Beneficiary Account Type</label>
        <input type="text" className="w-full mt-1 p-2 border rounded" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input type="number" className="w-full mt-1 p-2 border rounded" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={handleTransfer} className="w-full bg-blue-500 text-white p-2 rounded mt-4">
        Confirm Transaction
      </button>
    </div>
  );
};
 
export default TransactionOptions;