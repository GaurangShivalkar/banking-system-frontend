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
     {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Make a Payment</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Transaction Method</label>
            <input
              type="text"
              value={transactionMethod}
              onChange={(e) => setTransactionMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Transaction Status</label>
            <input
              type="text"
              value={transactionStatus}
              onChange={(e) => setTransactionStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Source Account ID</label>
            <input
              type="text"
              value={sourceAccountId}
              onChange={(e) => setSourceAccountId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Destination Account ID</label>
            <input
              type="text"
              value={destinationAccountId}
              onChange={(e) => setDestinationAccountId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>*/}

  //   function AddForm() {
  //     const [activeTab, setActiveTab] = useState('own');
  //     const [name, setName] = useState("");
  //     const [accountNumber, setAccountNumber] = useState("");
  //     const [bankName, setBankName] = useState("");
  //     const [branchId, setBranchId] = useState("");
  //     const [branches, setBranches] = useState([]);
  //     const [beneficiaryType, setBeneficiaryType] = useState("");
  //     const token = localStorage.getItem("token");
      
  //     // Fetch branches data from backend when component mounts
  //     useEffect(() => { fetchBranches(); }, []);
  
  //     const fetchBranches = async () => {
  //         try {
  //             const response = await axios.get("api/branch/showAllBranches");
  //             setBranches(response.data);
  //         } catch (error) {
  //             console.error("Error fetching branches:", error);
  //         }
  //     };
  
  //     const handleFormSubmit = async (e) => {
  //         e.preventDefault();
  //         const formDataOwn = {
  //             name,
  //             accountNumber,
  //             beneficiaryType,
  //             bankName: "ENQ",
  
  //         }
  //         const formData = {
  //             name,
  //             accountNumber,
  //             bankName,
  //             branch: {
  //                 branchId: branchId
  //             },
  //             beneficiaryType
  //         };
  
  //         try {
  //             if (activeTab === 'own') {
  //                 await axios.post("/api/beneficiaries/addBeneficiary", formDataOwn, { headers: { Authorization: `Bearer ${token}` } });
  //             }
  //             else {
  //                 await axios.post("/api/beneficiaries/addBeneficiary", formData, { headers: { Authorization: `Bearer ${token}` } });
  //             }
  //             alert('Beneficiary has been added sucessfully');
  
  //         } catch (error) {
  //             console.error('Error adding beneficiary:', error);
  //             alert('An error occurred while adding beneficiary');
  //         }
  //     }
  
  //     return (
  //         <div className="p-4 sm:ml-64">
  //             <div className="flex justify-center mb-4">
  //                 <button
  //                     className={`px-4 py-2 mx-2 rounded ${activeTab === 'own' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //                     onClick={() => setActiveTab('own')}
  //                 >
  //                     Own Beneficiary
  //                 </button>
  //                 <button
  //                     className={`px-4 py-2 mx-2 rounded ${activeTab === 'other' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //                     onClick={() => setActiveTab('other')}
  //                 >
  //                     Other Bank Beneficiary
  //                 </button>
  //             </div>
  
  //             {activeTab === 'own' && (
  
  //                 <form onSubmit={handleFormSubmit} className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
  //                     <div className="mb-4">
  //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
  //                             Name
  //                         </label>
  //                         <input
  //                             type="text"
  //                             id="name"
  //                             value={name}
  //                             onChange={(e) => setName(e.target.value)}
  //                             className="w-full px-3 py-2 border rounded"
  //                             placeholder="Enter beneficiary name"
  //                         />
  //                     </div>
  //                     <div className="mb-4">
  //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account-number">
  //                             Account Number
  //                         </label>
  //                         <input
  //                             type="text"
  //                             id="account-number"
  //                             value={accountNumber}
  //                             onChange={(e) => setAccountNumber(e.target.value)}
  //                             className="w-full px-3 py-2 border rounded"
  //                             placeholder="Enter account number"
  //                         />
  //                     </div>
  //                     <div className="mb-4">
  //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficiary-type">
  //                             Beneficiary Type
  //                         </label>
  //                         <select
  //                             id="beneficiary-type"
  //                             value={beneficiaryType}
  //                             onChange={(e) => setBeneficiaryType(e.target.value)}
  //                             className="w-full px-3 py-2 border rounded"
  //                         >
  
  //                             <option value="Self">Self</option>
  //                             <option value="Internal">Internal</option>
  
  //                         </select>
  //                     </div>
  //                     <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
  //                         Submit
  //                     </button>
  //                 </form>
  //             )}
  
  //             {activeTab === 'other' && (
  //                 <form onSubmit={handleFormSubmit} className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
  //                     <div className="mb-4">
  //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
  //                             Name
  //                         </label>
  //                         <input
  //                             type="text"
  //                             id="name"
  //                             className="w-full px-3 py-2 border rounded"
  //                             placeholder="Enter beneficiary name"
  //                         />
  //                     </div>
  //                     <div className="mb-4">
  //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account-number">
  //                             Account Number
  //                         </label>
  //                         <input
  //                             type="text"
  //                             id="account-number"
  //                             value={accountNumber}
  //                             onChange={(e) => setAccountNumber(e.target.value)}
  //                             className="w-full px-3 py-2 border rounded"
  //                             placeholder="Enter account number"
  //                         />
  //                     </div>
  //                     <div className="mb-4">
  //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank-name">
  //                             Bank Name
  //                         </label>
  //                         <input
  //                             type="text"
  //                             id="bank-name"
  //                             value={bankName}
  //                             onChange={(e) => setBankName(e.target.value)}
  //                             className="w-full px-3 py-2 border rounded"
  //                             placeholder="Enter bank name"
  //                         />
  //                     </div>
  //                     <div className="mb-4">
  //                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch-id">
  //                             Branch ID (IFSC Code)
  //                         </label>
  //                         <select
  //                             type="text"
  //                             id="branch-id"
  //                             value={branchId}
  //                             onChange={(e) => setBranchId(e.target.value)}
  //                             className="w-full px-3 py-2 border rounded"
  //                             placeholder="Enter branch ID (IFSC code)"
  //                         >
  //                             <option value="">Select Branch</option>
  //                             {branches.map((branch) => (
  //                                 <option key={branch.branchId} value={branch.branchId}>
  //                                     {branch.branchName}
  //                                 </option>
  //                             ))}
  //                         </select>
  //                     </div>
  //                     <select
  //                         id="beneficiary-type"
  //                         value={beneficiaryType}
  //                         onChange={(e) => setBeneficiaryType(e.target.value)}
  //                         className="w-full px-3 py-2 border rounded"
  //                     >
  
  
  //                         <option value="External">External</option>
  //                         <option value="Business">Business</option>
  //                     </select>
  //                     <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
  //                         Submit
  //                     </button>
  //                 </form>
  //             )}
  //         </div>
  //     );
  // }
export default TransactionOptions;