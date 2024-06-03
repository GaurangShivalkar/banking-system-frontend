import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const TransactionOptions = () => {
  const [activeTab, setActiveTab] = useState('withinBank');
  const [accountList, setAccountList] = useState([]);
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState('');
  const [destinationAccountId, setDestinationAccountId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [transactionMethod, setTransactionMethod] = useState('internal');

  const token = localStorage.getItem('token');

  const descriptions = [
    'Family Transfer',
    'Loan',
    'Rent',
    'Deposit'
  ];

  const billPaymentDescriptions = [
    'Electricity Bill',
    'Gas Bill',
    'Water Bill'
  ];

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        setCustomerId(customerId);
        const response = await axios.get(`/api/accounts/getAccountsByCustomerId/${customerId}`);
       
        setAccountList(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    const fetchBeneficiaryDetails = async () => {
      try {
       
        const responseBeneficiary = await axios.get('/api/beneficiaries/getAllBeneficiary', {
          headers: { Authorization: `Bearer ${token}` }
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
      transactionMethod: transactionMethod,
      transactionStatus: 'pending',
      description: description,
      sourceAccountId: sourceAccountId,
      destinationAccountId: destinationAccountId,
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

  const renderDescriptionOptions = () => {
    let descriptions;
    if (activeTab === 'billPayment') {
      descriptions = ['Electricity Bill', 'Gas Bill', 'Water Bill'];
    } else {
      descriptions = ['Family Transfer', 'Loan', 'Rent', 'Deposit'];
    }
  
    return descriptions.map((description, index) => (
      <option key={index} value={description}>
        {description}
      </option>
    ));
  };
  

  const WithinBankForm = () => (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination-account">
          Destination Account No
        </label>
        <select
          id="destination-account"
          value={destinationAccountId}
          onChange={(e) => setDestinationAccountId(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>Select an account</option>
          {renderAccountOptions()}
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

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <select
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>Select a description</option>
     
          {renderDescriptionOptions()}
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

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Submit
      </button>
    </form>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'withinBank' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {setActiveTab('withinBank'); setTransactionMethod('internal')}}
        >
          Quick Transfer Within Bank
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'outsideBank' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {setActiveTab('outsideBank');setTransactionMethod('external')}}
        >
          NEFT
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'billPayment' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {setActiveTab('billPayment');setTransactionMethod('bill')}}
        >
          RTGS
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'upiPayment' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('upiPayment')}
        >
          UPI Payment
        </button>
      </div>

      {activeTab === 'withinBank' && <WithinBankForm />}
      {activeTab === 'outsideBank' && <WithinBankForm />}
      {activeTab === 'billPayment' && <WithinBankForm />}
      {activeTab === 'upiPayment' && <WithinBankForm />}
    </div>
  );
};
 
export default TransactionOptions;