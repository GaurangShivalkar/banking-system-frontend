import React from 'react';
import NavbarComponent from '../components/NavbarComponent'
import AccountBalance from '../components/DashboardComponents/AccountBalance';
import MoneyInOut from '../components/DashboardComponents/MoneyInOut';
import RecentTransactions from '../components/DashboardComponents/RecentTransactions';

const Dashboard = () => {
  return (
    <div>
      <NavbarComponent/>
   
    <div className="min-h-screen  text-white p-4 sm:ml-64">
      <AccountBalance />
      <div className="flex flex-wrap gap-4 mt-4">
        <MoneyInOut title="Money Out Last 30 Days" />
        <MoneyInOut title="Money In Last 30 Days" />
      </div>
      <RecentTransactions /> 
    </div>
    </div>
  );
};

export default Dashboard;
