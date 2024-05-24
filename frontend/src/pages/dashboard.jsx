import React, { useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';


function UserCard() {
  const accounts = [
    {
      owner: "Gaurang",
      accountNumber: "8081712357",
      accountBalance: "1000 ₹",
      branchLocation: "Mumbai",

      alt: "Account Owner Gaurang",
      accountType: "Saving Account",
      accountBg: "bg-slate-500",
      accountText: "text-neutral-300",
    },
    {
      owner: "Ajay",
      accountNumber: "8081712357",
      accountBalance: "1000 ₹",
      branchLocation: "Mumbai",
      alt: "Account Owner Ajay",
      accountType: "Current Account",
      accountBg: "bg-slate-500",
      accountText: "text-neutral-300",
    },
  ];

  const transactions = [
    {
      description: "Spotify Subscription",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d7637d051305cdd9bc5eb5290d2bcc2170da382dcd69d04baf58e009bdc13bf5?apiKey=794c38372b674dc6b8c9540bd5fd676d&",
      alt: "Spotify Icon",
      transactionId: "#12548796",
      method: "Shopping",
      from: "1234****",
      date: "28 Jan, 12.30 AM",
      amount: "$2,500",
      status: "Pending",
      statusClass:
        "justify-center px-7 py-4 text-orange-500 bg-white rounded-3xl border border-orange-500 border-solid max-md:px-5",
    },
    {
      description: "Freepik Sales",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3a9e11f1aa1fb026ae39a1e94e4d7db8b5cc7b7cba416179d2498dfe8d871df5?apiKey=794c38372b674dc6b8c9540bd5fd676d&",
      alt: "Freepik Sales Icon",
      transactionId: "#12548796",
      method: "Transfer",
      from: "1234 ****",
      date: "25 Jan, 10.40 PM",
      amount: "+$750",
      status: "Success",
      statusClass:
        "justify-center px-7 py-4 text-green-700 bg-white rounded-3xl border border-green-700 border-solid max-md:px-5",
    },
    {
      description: "Mobile Service",
      transactionId: "#12548796",
      method: "Service",
      from: "1234 ****",
      date: "20 Jan, 10.40 PM",
      amount: "$150",
      status: "Pending",
      statusClass:
        "justify-center px-7 py-4 text-orange-500 bg-white rounded-3xl border border-orange-500 border-solid max-md:px-5",
    },
    {
      description: "Wison",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2cedcdba30da47e9fea9f574a7d7283e5b723f8d9d165691c03a6ad73a0d456?apiKey=794c38372b674dc6b8c9540bd5fd676d&",
      alt: "Wison Icon",
      transactionId: "#12548796",
      method: "Transfer",
      from: "1234 ****",
      date: "15 Jan, 03.29 PM",
      amount: "$1050",
      status: "Failed",
      statusClass:
        "justify-center px-9 py-4 text-red-500 bg-white rounded-3xl border border-red-500 border-solid max-md:px-5",
    },
    {
      description: "Emilly",
      transactionId: "#12548796",
      method: "Transfer",
      from: "1234****",
      date: "14 Jan, 10.40 PM",
      amount: "+$840",
      status: "Success",
      statusClass:
        "justify-center px-7 py-4 text-green-700 bg-white rounded-3xl border border-green-700 border-solid max-md:px-5",
    },
  ];

  return (
    <div className="p-4 sm:ml-64">

      
    <section className="flex flex-col  bg-white shadow-sm">

      
        <h2 className="mt-5 text-2xl leading-9 text-zinc-900 ">
              My Accounts
            </h2>
             
            <a
              href="#"
              className="self-end mr-7 text-lg leading-7 text-blue-600 max-md:mr-2.5"
            >
              View All
            </a>
          <section className="flex flex-wrap gap-5 w-full max-md:ml-0 max-md:w-full">

            {accounts.map((account, index) => (
              <article className="block max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4">
                <div className="font-normal text-gray-700 p-4 dark:text-gray-400">
                  <p>
                    Owner: {account.owner}
                    <br />
                    Account Number: {account.accountNumber}
                    <br />
                    Account Balance: ${account.accountBalance}
                    <br />
                    Branch Location: {account.branchLocation}
                    <br />
                  </p>
                </div>
                <div className="bg-blue-600 text-2xl font-bold text-white w-full text-center rounded-b-lg">
                  {account.accountType}
                </div>
              </article>
            ))}
          </section>
        
</section>
</div>
    
    
  );
}
const DashboardPage = () => {

  return (
    <div >
      <NavbarComponent />
      <div><UserCard /></div>
    </div>

  );
};

export default DashboardPage;
