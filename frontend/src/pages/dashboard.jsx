import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import AccountData from '../components/DashboardComponents/AccountData';
import BeneficiaryData from '../components/DashboardComponents/BeneficiaryData';
import TransactionCard from '../components/TransactionCard';
import AccountSelector from '../components/AccountSelector';
import MonthlyStats from '../components/DashboardComponents/MonthlyStat';

import CustomerData from '../components/DashboardComponents/CustomerData';

const Dashboard = () => {
  const [sourceAccountId, setSourceAccountId] = useState('');

  const monthlyStats = [
    { week: 'Mar 1 - 7', amount: 50000 },
    { week: 'Mar 8 - 14', amount: 100000 },
    { week: 'Mar 15 - 21', amount: 150000 },
    { week: 'Mar 22 - 28', amount: 200000 },
    { week: 'Final wk', amount: 250000 },
  ];

  return (
    <div>
      <NavbarComponent/>
      <div className="min-h-screen p-4 sm:ml-64">
        <CustomerData/>
        <AccountSelector sendDataToParent={setSourceAccountId}/>
        <AccountData sourceAccountId={sourceAccountId} />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="h-96 overflow-y-auto"> {/* Adjust height as needed */}
              <TransactionCard sourceAccountId={sourceAccountId} />
            </div>
            <MonthlyStats sourceAccountId={sourceAccountId} />
          </div>
          <BeneficiaryData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


