import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import AccountData from '../components/DashboardComponents/AccountData';
import BeneficiaryData from '../components/DashboardComponents/BeneficiaryData';
import TransactionCard from '../components/TransactionComponent/TransactionCard';
import AccountSelector from '../components/AccountSelector';
import MonthlyStat from '../components/DashboardComponents/MonthlyStat';
import CustomerData from '../components/DashboardComponents/CustomerData';

const Dashboard = () => {
  const [sourceAccountId, setSourceAccountId] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent />
      <div className="flex flex-col flex-1 p-4 sm:ml-64">
        <CustomerData />
        <AccountSelector sendDataToParent={setSourceAccountId} />
        <AccountData sourceAccountId={sourceAccountId} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="h-96 overflow-y-auto"> {/* Adjust height as needed */}
              <TransactionCard sourceAccountId={sourceAccountId} />
            </div>
            <MonthlyStat sourceAccountId={sourceAccountId} />
          </div>
          <BeneficiaryData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
