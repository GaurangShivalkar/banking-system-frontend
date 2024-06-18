import React, {useState} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import AccountSelector from '../components/AccountSelector';
import TransactionCard from '../components/TransactionCard';


const TransactionPage = () => {
  const [sourceAccountId, setSourceAccountId] = useState('');
  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent />
      <div className="p-4 sm:ml-64">
        <AccountSelector sendDataToParent={setSourceAccountId}/>
          <TransactionCard sourceAccountId={sourceAccountId}/>
      </div>
   
   
    </div>
    
  );
};

export default TransactionPage;
