import React from 'react';
import NavbarComponent from '../components/NavbarComponent';

import AccountDetails from '../components/AccountComponent/AccountDetails';
// import TransactionCard from '../components/TransactionCard';

import AccountOverview from '../components/AccountComponent/AccountOverview';
const AccountPage = () => {
  return (
    <div >
      <NavbarComponent />
   
      
        <h1 className="text-black text-3xl font-bold pl-4 pt-4 sm:ml-64">Account section</h1> 
    
        <AccountOverview />\
        <AccountDetails />
       
      {/*  
      <TransactionCard /> */}
      
    </div>
    
  );
}

export default AccountPage;
