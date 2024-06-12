import React, { useState } from 'react';
import { AiOutlineBank, AiOutlineSwap } from 'react-icons/ai';
import OwnBankBeneficiary from './OwnBankBeneficiary';
import OtherBankBeneficiary from './OtherBankBeneficiary';


const transactions = [
  { 
    title: 'Transfer within the bank(NEFT/RTGS/IMPS)', 
    limit: 'Re. 1 to Rs. 2 Lacs for IMPS and more than 2 Lacs for RTGS', 
    buttonText: 'Go',
    component: <OwnBankBeneficiary />,
    icon: <AiOutlineBank className="text-3xl text-blue-500 mr-4" />
  },
  { 
    title: 'Transfer to other bank (NEFT/RTGS/IMPS)', 
    limit: 'Re. 1 to Rs. 2 Lacs for IMPS and more than 2 Lacs for RTGS', 

    buttonText: 'Go',
    component: <OtherBankBeneficiary/>,
    icon: <AiOutlineSwap className="text-3xl text-blue-500 mr-4" />
  }
];

const BeneficiaryType = () => {
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => {
    setShowForm(true);
  }
  const handleCloseForm = () => {
    setShowForm(false);
    navigate('/beneficiary');
  };
  return (
    <div className="p-20 flex justify-center min-h-screen w-full items-center bg-gray-100">
      <div className="max-w-4xl">
        
          
    
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 w-full sm:w-1/2 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-4">
                  {transaction.icon}
                  <h2 className="text-xl font-semibold">{transaction.title}</h2>
                </div>

                {transaction.limit && <p className="text-sm text-gray-600 mb-4">{transaction.limit}</p>}
                <button 
                  className="flex mt-4 bg-gray-600 text-white items-center py-2 px-4 rounded hover:bg-gray-800"
                  onClick={handleOpenForm}>
                  {transaction.buttonText}
                </button>
              </div>
            ))}
          </div>
          </div>
          <div>
          {showForm && <OwnBankBeneficiary onClose={handleCloseForm} />}
    </div>

      
    </div>
  );
};

export default BeneficiaryType;
