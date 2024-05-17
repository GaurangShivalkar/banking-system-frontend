import React from 'react';
import NavbarComponent from '../components/navbarComponent';
import TransactionOptions from '../components/TranasactionOptions';
import ConfirmTransaction from '../components/ConfirmTransaction';
const TransactionPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent />
      <div className="flex-grow bg-gray-100 p-4">
        <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
          <TransactionOptions/>
      </div>
      {/* <ConfirmTransaction/> */}
    </div>
    
  );
};

export default TransactionPage;
