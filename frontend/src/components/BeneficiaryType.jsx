import React, { useState } from 'react';
import { AiOutlineBank, AiOutlineSwap } from 'react-icons/ai';
import OwnBankBeneficiary from './OwnBankBeneficiary';
import OtherBankBeneficiary from './OtherBankBeneficiary';


const transactions = [
  { 
    title: 'Transfer within the bank', 
    limit: 'Re. 1 to Rs. 25 Lacs per day', 
    buttonText: 'Go',
    component: <OwnBankBeneficiary />,
    icon: <AiOutlineBank className="text-3xl text-blue-500 mr-4" />
  },
  { 
    title: 'Transfer to other bank (NEFT/RTGS/IMPS)', 
    subtitle: 'Also for other Payment', 
    buttonText: 'Go',
    component: <OtherBankBeneficiary/>,
    icon: <AiOutlineSwap className="text-3xl text-blue-500 mr-4" />
  }
];

const BeneficiaryType = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <div className="p-4 sm:ml-64 flex justify-center min-h-screen w-full items-center bg-gray-100">
      <div className="max-w-4xl">
        {selectedComponent ? (
          <div>
            <button 
              className="mb-4 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-gray-500"
              onClick={() => setSelectedComponent(null)}
            >
              Back
            </button>
            {selectedComponent}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 w-full sm:w-1/2 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-4">
                  {transaction.icon}
                  <h2 className="text-xl font-semibold">{transaction.title}</h2>
                </div>
                {transaction.subtitle && <p className="text-sm text-gray-600 mb-2">{transaction.subtitle}</p>}
                {transaction.limit && <p className="text-sm text-gray-600 mb-4">{transaction.limit}</p>}
                <button 
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => setSelectedComponent(transaction.component)}
                >
                  {transaction.buttonText}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryType;
