import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";


const AccountDetails = () => {
  const [balance, setBalance] = useState(null);
  const [accountNo, setAccountNo] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [branch, setBranch] = useState(null);
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    async function fetchAccountBalance() {
      try {
        const response = await axios.get("/api/accounts/getAccountByAccountNo/ACT123456");
        setBalance(response.data.balance);
        setAccountNo(response.data.accountNumber);
        setAccountType(response.data.accountType);
        setBranch(response.data.branch.branchName);
        setCustomer(response.data.customer.customerName);

      } catch (error) {
        console.log(error);
      }
    }

    fetchAccountBalance();
  }, []);

  return (
    <div className="flex flex-col flex-grow md:ml-1/5 p-4">
      <section className="px-2 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 max-md:flex-col">
          <article className="flex flex-col w-1/5 max-md:w-full">
            <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/be8e3debdfd47af36d04b8d94775ae77a4637764239fa074b16ba277855cc888?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="My Balance" className="shrink-0 w-14 aspect-square" />
              <div className="flex flex-col">
                <p className="text-sm text-zinc-400">My Balance</p>
                <p className="mt-1 text-l font-bold text-blue-800">{balance} ₹</p>
              </div>
            </div>
          </article>
          <article className="flex flex-col w-1/5 max-md:w-full">
            <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/72f17c4df03041bfe613032cc9d306ca71f48e9767a9f1f8098566f1766e947a?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Income" className="shrink-0 w-14 aspect-square" />
              <div className="flex flex-col">
                <p className="text-sm text-neutral-300">Account No:</p>
                <p className="mt-1 text-l font-bold text-blue-800">{accountNo}</p>
              </div>
            </div>
          </article>
          <article className="flex flex-col w-1/5 max-md:w-full">
            <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea480c9160cdb027fdf0d396983c0b3213988ae2a4122b62f75d8fb6e4c45496?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Expense" className="shrink-0 w-14 aspect-square" />
              <div className="flex flex-col">
                <p className="text-sm text-neutral-300">Account Type</p>
                <p className="mt-1 text-l font-bold text-blue-800">{accountType}</p>
              </div>
            </div>
          </article>
          <article className="flex flex-col flex-grow w-1/5 max-md:w-full">
            <div className="flex items-center gap-3 p-4 bg-white rounded shadow-sm max-md:mt-4">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/83a51458ced4bd2be408b71cbdec79f2eae4a4b01cb96908add62cf22b359a7f?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Total Saving" className="shrink-0 w-14 aspect-square" />
              <div className="flex flex-col">
                <p className="text-sm text-zinc-400">Branch</p>
                <p className="mt-1 text-l font-bold text-blue-800">{branch}</p>
              </div>
            </div>
          </article>
          <article className="flex flex-col w-1/5 max-md:w-full">
            <div className="flex items-center gap-2 p-4 bg-white rounded shadow-sm max-md:mt-4">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/72f17c4df03041bfe613032cc9d306ca71f48e9767a9f1f8098566f1766e947a?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Income" className="shrink-0 w-14 aspect-square" />
              <div className="flex flex-col">
                <p className="text-sm text-neutral-300">Owner</p>
                <p className="mt-1 text-l font-bold text-blue-800">{customer}</p>
              </div>
            </div>
          </article>

        </div>
      </section>
    </div>
  )
}
export default AccountDetails;