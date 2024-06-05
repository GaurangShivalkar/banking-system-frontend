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
      <header className="mb-6">
        <h1 className="text-black text-3xl font-bold">Welcome back, Mara! 👋</h1>
        <p className="text-gray-400">Everything remains safe and up-to-date with your account since your last visit. We're glad to have you here!</p>
      </header>
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
