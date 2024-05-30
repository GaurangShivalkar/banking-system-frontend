import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import AccountDetails from '../components/AccountDetails';
// import TransactionCard from '../components/TransactionCard';
import AccountOverview from '../components/AccountOverview';

const AccountPage = () => {
  return (
    <div >
      <NavbarComponent />
     
        <AccountOverview />\
        <AccountDetails />
       
      {/*  
      <TransactionCard /> */}
      
    </div>
    
  );
}

export default AccountPage;
