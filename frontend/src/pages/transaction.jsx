import React, {useState} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import AccountSelector from '../components/AccountSelector';
import TransactionCard from '../components/TransactionComponent/TransactionCard';


const TransactionPage = () => {
  const [sourceAccountId, setSourceAccountId] = useState('');
  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent />
      <div className="p-4 sm:ml-64">
        <h1 className="text-black text-3xl font-bold mb-8">Transacations</h1> 
        <AccountSelector sendDataToParent={setSourceAccountId}/>
        <TransactionCard sourceAccountId={sourceAccountId}/>
      </div>
    </div>   
  );
};

export default TransactionPage;
