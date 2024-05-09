import React from 'react';
import NavbarComponent from '../components/navbarComponent';
import BankAccountCard from '../components/BankAccountCard';

const AccountPage = () => {
  const bankAccounts = [
    {
      accountNo: '123456789',
      timestamp: '2024-05-09 10:30 AM',
      accountType: 'Savings',
      balance: '$5,000',
      branchId: '001',
      branchName: 'Main Street Branch',
      branchAddress: '123 Main Street, City, Country',
      customerId: '987654'
    },
    {
      accountNo: '987654321',
      timestamp: '2024-05-09 11:45 AM',
      accountType: 'Checking',
      balance: '$2,500',
      branchId: '002',
      branchName: 'Downtown Branch',
      branchAddress: '456 Center Ave, City, Country',
      customerId: '123456'
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <NavbarComponent />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        
        <div className="grid grid-cols-1 gap-6">
          {bankAccounts.map((account, index) => (
            <BankAccountCard key={index} {...account} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
