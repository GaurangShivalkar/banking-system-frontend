import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccountDetails() {
      try {
        // Uncomment and adjust these lines based on your actual authentication and customer ID fetching logic
        // const token = localStorage.getItem("token");
        // const userResponse = await axios.get("/auth/user", {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const userData = userResponse.data;
        // const email = userData.email;
        
        // const customerResponse = await axios.get(`/api/users/getCustomerId/${email}`);
        // const customerId = customerResponse.data;
        
        const response = await axios.get("/api/accounts/getAccountsByCustomerId/666996");
        setAccounts(response.data); // Assuming response.data is an array of account details
      } catch (error) {
        console.log(error);
      }
    }

    fetchAccountDetails();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <section className="px-2 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 max-md:flex-col">
          {accounts.map((account, index) => (
            <React.Fragment key={index}>
              <article className="flex flex-col w-1/6 max-md:w-full">
                <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/be8e3debdfd47af36d04b8d94775ae77a4637764239fa074b16ba277855cc888?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="My Balance" className="shrink-0 w-14 aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-sm text-zinc-400">My Balance</p>
                    <p className="mt-1 text-l font-bold text-blue-800">{account.balance} ₹</p>
                  </div>
                </div>
              </article>
              <article className="flex flex-col w-1/5 max-md:w-full">
                <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/72f17c4df03041bfe613032cc9d306ca71f48e9767a9f1f8098566f1766e947a?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Account No" className="shrink-0 w-14 aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-sm text-neutral-300">Account No:</p>
                    <p className="mt-1 text-l font-bold text-blue-800">{account.accountNumber}</p>
                  </div>
                </div>
              </article>
              <article className="flex flex-col w-1/6 max-md:w-full">
                <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea480c9160cdb027fdf0d396983c0b3213988ae2a4122b62f75d8fb6e4c45496?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Account Type" className="shrink-0 w-14 aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-sm text-neutral-300">Account Type</p>
                    <p className="mt-1 text-l font-bold text-blue-800">{account.accountType}</p>
                  </div>
                </div>
              </article>
              <article className="flex flex-col w-1/6 max-md:w-full">
                <div className="flex items-center gap-3 p-4 bg-white rounded shadow-sm max-md:mt-4">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/83a51458ced4bd2be408b71cbdec79f2eae4a4b01cb96908add62cf22b359a7f?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Branch" className="shrink-0 w-14 aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-sm text-zinc-400">Branch</p>
                    <p className="mt-1 text-l font-bold text-blue-800">{account.branch.branchName}</p>
                  </div>
                </div>
              </article>
              <article className="flex flex-col w-1/6 max-md:w-full">
                <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/72f17c4df03041bfe613032cc9d306ca71f48e9767a9f1f8098566f1766e947a?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Owner" className="shrink-0 w-14 aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-sm text-neutral-300">Owner</p>
                    <p className="mt-1 text-l font-bold text-blue-800">{account.customer.customerName}</p>
                  </div>
                </div>
              </article>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AccountDetails;
