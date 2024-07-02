import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import NavbarComponent from '../components/NavbarComponent';
import PaymentAlt from '../components/paymentAlt';
import Deposit from '../components/Deposit';

const PaymentPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('paymentAlt');
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'deposit':
        return <Deposit />;
      case 'paymentAlt':
        return <PaymentAlt />;
      default:
        return <PaymentAlt />;
    }
  };

  return (
    <div >
    <NavbarComponent />
    <div className="p-4 sm:ml-64">
    <div className="flex space-x-8 mb-8">
      <a href="#" onClick={() => setSelectedComponent('paymentAlt')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Fund Transfer</a>
      <a href="#" onClick={() => setSelectedComponent('deposit')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Deposit</a>
      {/* <a href="#" onClick={() => setSelectedComponent('fundTransfer')} className="text-gray-500 hover:text-gray-300">Fund Transfer</a> */}
    
    </div>
    {renderComponent()}
    </div>
    </div> 
  );
};

export default PaymentPage;
