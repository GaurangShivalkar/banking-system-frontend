import React, { useState } from 'react';
import { AiOutlineBank, AiOutlineSwap } from 'react-icons/ai';
import OwnBankBeneficiary from './OwnBankBeneficiary';
import OtherBankBeneficiary from './OtherBankBeneficiary';

const transactions = [
  { 
    title: 'Transfer within the bank (SELF/INTERNAL)', 
    limit: 'For transferring beteween accounts with the bank', 
    buttonText: 'Go',
    component: OwnBankBeneficiary,
    icon: <AiOutlineBank className="text-4xl text-blue-500" />
  },
  { 
    title: 'Transfer to other bank (NEFT/RTGS/IMPS)', 
    limit: 'Re. 1 to Rs. 2 Lacs for IMPS and more than 2 Lacs for RTGS', 
    buttonText: 'Go',
    component: OtherBankBeneficiary,
    icon: <AiOutlineSwap className="text-4xl text-blue-500" />
  }
];

const BeneficiaryType = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (Component) => {
    setSelectedComponent(() => <Component onClose={handleBackButtonClick} />);
  };

  const handleBackButtonClick = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="flex justify-center items-center min-h-full w-full p-4 bg-white">
      {selectedComponent ? (
        <div className="w-full max-w-4xl h-[90%] overflow-auto">
          {selectedComponent}
        </div>
      ) : (
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center h-[90%] space-y-4 md:space-y-0 md:space-x-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="bg-gray-700 text-white flex flex-col justify-between rounded-lg p-6 shadow-lg w-full md:w-1/2 h-full transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center mb-4">
                {transaction.icon}
                <h2 className="text-2xl font-semibold ml-4">{transaction.title}</h2>
              </div>
              {transaction.limit && <p className="text-sm text-gray-300 mb-4">{transaction.limit}</p>}
              <button 
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => handleButtonClick(transaction.component)}>
                {transaction.buttonText}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeneficiaryType;
