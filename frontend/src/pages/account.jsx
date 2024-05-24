import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import AccountDetails from '../components/AccountDetails';
import TransactionCard from '../components/TransactionCard';
const AccountPage = () => {
  return (
    <div className="flex h-screen">
      <NavbarComponent />
      <div>
      <AccountDetails />
      <TransactionCard />
      </div>
    </div>
    
  );
}

export default AccountPage;
