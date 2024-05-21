import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const TransactionOptions = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId:'',
    transactionMethod:'',
    transactionStatus:'',
    description:'',
    sourceAccountId:'',
    destinationAccountId:'',
    amount:'',
    changedBalance:'',
    beneficiaryId:'',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleConfirmTransaction = () => {
    // Save form data to local storage
    localStorage.setItem('transactionData', JSON.stringify(formData));

    // Redirect to confirmation component or route
    navigate('/confirmTransactions');
  };

  const renderTransactionForm = () => {
    switch (selectedOption) {
      case 'ownBankTransfer':
        return (
          <div className="mt-4">
            <input
              type="text"
              name="accountNumber"
              value={formData.destinationAccountId}
              onChange={handleInputChange}
              placeholder="Receiver Account Number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              name="yourAccountNumber"
              value={formData.sourceAccountId}
              onChange={handleInputChange}
              placeholder="Your Account Number"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="hidden"
              name="transactionMethod"
              value={formData.transactionMethod}
            />
          </div>
        );

      case 'beneficiaryTransfer':
        return (
          <div className="mt-4">
            <input
              type="text"
              name="yourAccountNumber"
              value={formData.yourAccountNumber}
              onChange={handleInputChange}
              placeholder="Your Account Number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              name="beneficiaryAccountNumber"
              value={formData.beneficiaryAccountNumber}
              onChange={handleInputChange}
              placeholder="Beneficiary Account Number"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              name="branchId"
              value={formData.branchId}
              onChange={handleInputChange}
              placeholder="Branch ID"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        );

      case 'billPayment':
        return (
          <div className="mt-4">
            <select
              name="billType"
              value={formData.billType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Bill Type</option>
              <option value="electricity">Electricity</option>
              <option value="water">Water</option>
              {/* Add more bill types as needed */}
            </select>
            <select
              name="billOwner"
              value={formData.billOwner}
              onChange={handleInputChange}
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Bill Owner</option>
              <option value="self">Self</option>
              <option value="family">Family</option>
              {/* Add more bill owners as needed */}
            </select>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        );
      case 'upiPayment':
        return (
          <div className="mt-4">
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleInputChange}
              placeholder="Receiver UPI ID"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              name="yourUpiId"
              value={formData.yourUpiId}
              onChange={handleInputChange}
              placeholder="Your UPI ID"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Select Transaction Type</h2>
      <select
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">Select Transaction Option</option>
        <option value="ownBankTransfer">Fund Transfer to Own Bank</option>
        <option value="beneficiaryTransfer">Fund Transfer with Beneficiary Account</option>
        <option value="billPayment">Bill Payment</option>
        <option value="upiPayment">UPI Payment</option>
      </select>
      {renderTransactionForm()}
      <button
        onClick={handleConfirmTransaction} // Call function to save data and redirect
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Confirm Transaction
      </button>
    </div>
  );
};

export default TransactionOptions;
