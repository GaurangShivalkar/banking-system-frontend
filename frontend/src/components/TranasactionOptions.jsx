import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const TransactionOptions = () => {
  const [accountList, setAccountList] = useState([]);
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState('');
  const [destinationAccountId, setDestinationAccountId] = useState('');
 
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [transactionMethod, setTransactionMethod] = useState('internal');

  const token = localStorage.getItem('token');
  const customerId = localStorage.getItem('customerId');

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
      description: description,
      sourceAccountId: sourceAccountId,
      customer: {
        customerId: customerId
      },
      amount: amount,
      beneficiary: {
        beneficiaryId: beneficiaryId
      }
    };

    try {
      console.log('Submitting transaction:', transactionData);
      const response = await axios.post('/api/transactions/makeTransaction', transactionData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Transaction response:', response);
      // Handle success scenario
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
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


  

 
  // const handleTransfer = () => {
  //   // Handle the transfer logic here
  //   console.log('Transfer details:', { account, beneficiary, accountNumber, ifscCode, accountType, amount });
  // };
 
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-10">
      <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Third Party Funds Transfer</h1>
      
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
      <button type="submit"  className="w-full bg-blue-500 text-white p-2 rounded mt-4">
        Confirm Transaction
      </button>
      </form>
    </div>
  );
};
 
export default TransactionOptions;