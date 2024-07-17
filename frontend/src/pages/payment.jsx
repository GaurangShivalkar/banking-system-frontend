import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import NavbarComponent from '../components/NavbarComponent';
import OutTransfer from '../components/PaymentComponent/OutTransfer';
import SelfTransfer from '../components/PaymentComponent/SelfTransfer';
import Deposit from '../components/PaymentComponent/Deposit';

const PaymentPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('paymentAlt');
  const customerId = localStorage.getItem('customerId');
  const [customerStatus, setCustomerStatus] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('/api/customers/showCustomer/' + customerId);
        
        setCustomerStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

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
        <h1 className="text-black text-3xl font-bold mb-8">Payment</h1>
        {customerStatus !== "verified" ? (
          <div className="flex flex-col h-full justify-center items-center">
            <h1 className="text-red-500 text-2xl font-bold mb-4">You are not authorized to use this functionality</h1>
            <p className="text-gray-700">Please coordinate with customer care.</p>
          </div>
        ) : (
          <>
            <div className="flex space-x-8 mb-8">
              <a href="#" onClick={() => setSelectedComponent('SelfTransfer')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Self Transfer</a>
              <a href="#" onClick={() => setSelectedComponent('OutTransfer')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Out Transfer</a>
              <a href="#" onClick={() => setSelectedComponent('Deposit')} className="text-purple-500 border-b-2 border-purple-500 pb-2 hover:text-gray-300 hover:border-gray-300">Deposit</a>
            </div>
            {renderComponent()}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
