import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import NavbarComponent from '../components/NavbarComponent';
import OutTransfer from '../components/OutTransfer';
import Deposit from '../components/Deposit';
import SelfTransfer from '../components/SelfTransfer';

const PaymentPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('paymentAlt');
  const renderComponent = () => {
    switch (selectedComponent) {

        case 'SelfTransfer':
          return <SelfTransfer />;
      case 'OutTransfer':
        return <OutTransfer />;
        case 'Deposit':
          return <Deposit />;
       
      default:
        return <SelfTransfer />;
    }
  };

  return (
    <div >
    <NavbarComponent />
    <div className="p-4 sm:ml-64">
    <div className="flex space-x-8 mb-8">
      <a href="#" onClick={() => setSelectedComponent('SelfTransfer')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Self Transfer</a>
      <a href="#" onClick={() => setSelectedComponent('OutTransfer')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Out Transfer</a>
      <a href="#" onClick={() => setSelectedComponent('Deposit')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Deposit</a>

    
    </div>
    {renderComponent()}
    </div>
    </div> 
  );
};

export default PaymentPage;
