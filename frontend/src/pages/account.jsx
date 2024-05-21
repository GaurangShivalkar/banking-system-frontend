import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import AccountDetails from '../components/AccountDetails';
import TransactionCard from '../components/TransactionCard';
const AccountPage = () => {
  return (
    <div className="flex h-screen">
      <NavbarComponent />
      <div className="flex flex-col flex-grow p-6 md:ml-[20%] bg-gray-100">
      <AccountDetails />
      <TransactionCard />
      </div>
    </div>
    
  );
}

export default AccountPage;
