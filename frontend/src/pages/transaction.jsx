import React from 'react';
import NavbarComponent from '../components/NavbarComponent';

import TransactionCard from '../components/TransactionCard';
const TransactionPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent />
      <div className="p-4 sm:ml-64">
        <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
          <TransactionCard/>
      </div>
   
   
    </div>
    
  );
};

export default TransactionPage;
