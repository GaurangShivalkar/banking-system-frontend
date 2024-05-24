import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const PaymentAlt = () => {

  const [activeTab, setActiveTab] = useState('withinBank');
  const [accountList, setAccountList] = useState([]);
  const [beneficiaryList, setBeneficiaryList] = useState([]);

  const descriptions = [
    'Family Transfer',
    'Loan',
    'Rent',
    'Deposit'
  ];
  useEffect(() => {
  async function fetchAccountDetails() {
    try {
      const customerId = localStorage.getItem("customerId");  
      const response = await axios.get("/api/accounts/getAccountsByCustomerId/"+customerId);
      setAccountList(response.data); // Assuming response.data is an array of account details
    } catch (error) {
      console.log(error);
    }
  }
  fetchAccountDetails();
  
  async function fetchBeneficiaryDetails() {
    try {
      const token = localStorage.getItem("token");
      const responseBeneficiary = await axios.get("/api/beneficiaries/getAllBeneficiary", {headers:{Authorization: `Bearer ${token}` }});
      setBeneficiaryList(responseBeneficiary.data); // Assuming response.data is an array of account details
    } catch (error) {
      console.log(error);
    }
  }
  fetchBeneficiaryDetails();
}, []);

  const renderAccountOptions = () => (
    accountList.map((account, index) => (
      <option key={index} value={account.accountNumber}>
        {account.accountNumber} - Balance: {account.balance}
      </option>
    ))
  );

  const renderBenficiaryOptions = () => (
    beneficiaryList.map((beneficiary, index) => (
      <option key={index} value={beneficiary.beneficiaryId}>
        {beneficiary.accountNumber} - name: {beneficiary.name}
      </option>
    ))
  );

  const renderDescriptionOptions = () => (
    descriptions.map((description, index) => (
      <option key={index} value={description}>
        {description}
      </option>
    ))
  );
  function WithinBankForm() {

    return(
        <form className="max-w-md mx-auto bg-white p-4 shadow-md rounded">

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source-account">
            Source Account No
          </label>
          <select id="source-account" className="w-full px-3 py-2 border rounded">
            {renderAccountOptions()}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination-account">
            Destination Account No
          </label>
          <input
            type="text"
            id="destination-account"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter destination account number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <select id="description" className="w-full px-3 py-2 border rounded">
            {renderDescriptionOptions()}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficiary-id">
            Beneficiary ID
          </label>
          <select id="source-account" className="w-full px-3 py-2 border rounded">
            {renderBenficiaryOptions()}
          </select>
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer-id">
            Customer ID
          </label>
          <input
            type="text"
            id="customer-id"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter customer ID"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    )
}
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'withinBank' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('withinBank')}
        >
          Quick Transfer Within Bank
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'outsideBank' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('outsideBank')}
        >
          Quick Transfer Outside Bank
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'billPayment' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('billPayment')}
        >
          Bill Payment
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'upiPayment' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('upiPayment')}
        >
          UPI Payment
        </button>
      </div>

      {activeTab === 'withinBank' && (
        <WithinBankForm />
      )}

      {activeTab === 'outsideBank' && (
       <WithinBankForm/>
      )}

      {activeTab === 'billPayment' && (
        <WithinBankForm/>
      )}

      {activeTab === 'upiPayment' && (
        <WithinBankForm/>
      )}
    </div>
  );
};

export default PaymentAlt;
