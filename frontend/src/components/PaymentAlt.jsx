import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const PaymentAlt = () => {
  const [accountList, setAccountList] = useState([]);
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState('');
  // const [destinationAccountId, setDestinationAccountId] = useState('');

  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [transactionType, setTransactionType] = useState('');
  // const [transactionMethod, setTransactionMethod] = useState('internal');

  const token = localStorage.getItem('token');
  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {

        const response = await axios.get(`/api/accounts/getAccountsByCustomerId/${customerId}`);

        setAccountList(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    const fetchBeneficiaryDetails = async () => {
      try {

        const responseBeneficiary = await axios.get('/api/beneficiaries/getBeneficiaryByCustomerId', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            customerId: customerId
          }
        });


        setBeneficiaryList(responseBeneficiary.data);
      } catch (error) {
        console.error('Error fetching beneficiary details:', error);
      }
    };

    fetchAccountDetails();
    fetchBeneficiaryDetails();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {

      transactionStatus: 'pending',
      transactionType: transactionType,
      description: description,
      sourceAccountId: sourceAccountId,
      customer: {
        customerId: customerId
      },
      amount: amount,
      beneficiary: {
        beneficiaryId: beneficiaryId
      },
    };
    console.log(transactionData)
    // Convert transactionData to a JSON string
    const transactionDataString = JSON.stringify(transactionData);

    // Store it in localStorage
    localStorage.setItem("transactionData", transactionDataString);
    navigate("/confirmTransactions")

  };

  const renderAccountOptions = () => (
    accountList.map((account, index) => (
      <option key={index} value={account.accountNumber}>
        {account.accountNumber} - Balance: {account.balance}
      </option>
    ))
  );

  const renderBeneficiaryOptions = () => (
    beneficiaryList.map((beneficiary, index) => (
      <option key={index} value={beneficiary.beneficiaryId}>
        {beneficiary.accountNumber} - Name: {beneficiary.name}
      </option>
    ))
  );

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-10">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Funds Transfer</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source-account">
            Source Account No
          </label>
          <select
            id="source-account"
            value={sourceAccountId}
            onChange={(e) => setSourceAccountId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>Select an account</option>
            {renderAccountOptions()}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficiary-id">
            Beneficiary ID
          </label>
          <select
            id="beneficiary-account"
            value={beneficiaryId}
            onChange={(e) => setBeneficiaryId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>Select a beneficiary</option>
            {renderBeneficiaryOptions()}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionType">
            Type of Payment
          </label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>Select a payment type</option>
            <option value="IMPS">IMPS Payment</option>
            <option value="NEFT">NEFT Payment</option>
            <option value="RTGS">RTGS Payment</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter amount"
          />
        </div>
      
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-gray-800">
          Confirm Transaction
        </button>
      </form>
    </div>
  );
};

export default PaymentAlt;