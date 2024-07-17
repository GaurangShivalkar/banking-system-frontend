import React from 'react';

const BankAccountCard = ({ account }) => {
  return (
<div className="flex flex-col px-10 pt-5 pb-8 bg-white shadow-sm max-md:px-5">
      <header className="flex justify-between w-full gap-5 max-md:flex-wrap max-md:max-w-full">
        <div className="flex items-center gap-5 my-auto text-2xl font-bold leading-10 text-zinc-900">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ee8e1a4b6f4cdeba4b41338dbf85036bd76eba1146ee515909508a4327964d9?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="" className="shrink-0 w-[173px] aspect-[4.35]" />
          <h1 className="flex-auto">Accounts</h1>
        </div>
        <div className="flex items-center gap-4 max-md:flex-wrap">
          <form className="flex items-center gap-2 px-9 py-3 text-base leading-5 rounded-3xl border bg-slate-100 border-zinc-400 text-zinc-400 max-md:px-5">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfb45444a9efbbb8d624beec408ab2287513b8b15c32f30bff79b843856984de?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="" className="shrink-0 w-[27px] aspect-square" />
            <label htmlFor="searchInput" className="sr-only">Search for something</label>
            <input id="searchInput" className="flex-auto bg-transparent border-none--shadow-none focus:outline-none" type="text" placeholder="Search for something" />
          </form>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0c77912b608f80f41aa6dd0ccb112e3a30f784e1617003908780e0df71fbed3?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="" className="shrink-0 self-stretch border border-cyan-500 w-[63px] aspect-[1.23]" />
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d76cc3924027c06e8d60eccdca773a267daad337b9a7244e6367ee87d98d61f?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="" className="shrink-0 self-stretch border border-cyan-500 w-[61px] aspect-[1.19]" />
          <button className="flex items-center justify-center w-16 h-16 text-3xl text-white bg-cyan-500 rounded-full">A</button>
        </div>
      </header>
      <nav className="flex gap-5 mt-12 max-md:mt-10 max-md:flex-wrap">
        <ul className="flex flex-col text-lg leading-7 text-zinc-400">
          <li className="flex items-center gap-5">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa2edb1851867876dc2fae6343a95a2a3bf4c8e97a455c3df1abadf92f53d86d?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Dashboard" className="shrink-0 w-6 aspect-square" />
            <a href="#">Dashboard</a>
          </li>
          <li className="flex items-center gap-5 mt-9">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c2d801d39130d243280f483ee30195358223cc15dc000baa6618bb1d87b8040?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Transactions" className="shrink-0 w-[26px] aspect-[0.96]" />
            <a href="#">Transactions</a>
          </li>
          <li className="flex items-center gap-5 mt-8 text-blue-800">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf17c2d3c2009f003bae6186f18d0e9d46b1012b6c5e107a04330416eb772ac2?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Accounts" className="shrink-0 w-6 aspect-square" />
            <a href="#">Accounts</a>
          </li>
          <li className="flex items-center gap-5 mt-9">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe862ee200914f127eac055e6a8c23404656cd3446d9c4d36c3923a23f22d080?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Services" className="shrink-0 w-[26px] aspect-[0.96]" />
            <a href="#">Services</a>
          </li>
          <li className="flex items-center gap-5 mt-8">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4281b3d3e8e2812e41bdb71033377d079211693f53aeda1b1d295ddf5b396856?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="My Privileges" className="shrink-0 w-[26px] aspect-square" />
            <a href="#">My Privileges</a>
          </li>
          <li className="flex items-center gap-5 mt-9">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/54ee8874b54819c15dfa90920f81ee24185e94087ecc02a7ed23b52f2410b449?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Setting" className="shrink-0 w-7 aspect-square" />
            <a href="#">Setting</a>
          </li>
        </ul>
        <main className="flex flex-grow flex-col basis-0 w-fit max-md:max-w-full">
          <section className="px-0.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <article className="flex flex-col w-3/12 max-md:w-full">
                <div className="flex items-center gap-4 px-9 py-6 bg-white rounded shadow-sm max-md:px-5 max-md:mt-7">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/be8e3debdfd47af36d04b8d94775ae77a4637764239fa074b16ba277855cc888?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="My Balance" className="shrink-0 border border-cyan-500 w-[69px] aspect-[0.99]" />
                  <div className="flex flex-col">
                    <p className="text-base text-zinc-400">My Balance</p>
                    <p className="mt-2.5 text-3xl font-bold text-blue-800">$12,750</p>
                  </div>
                </div>
              </article>
              <article className="flex flex-col w-3/12 ml-5 max-md:w-full">
                <div className="flex items-center gap-2.5 px-10 py-5 bg-white rounded shadow-sm max-md:px-5 max-md:mt-7">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/72f17c4df03041bfe613032cc9d306ca71f48e9767a9f1f8098566f1766e947a?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Income" className="shrink-0 w-[82px] aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-base text-neutral-300">Income</p>
                    <p className="mt-3.5 text-3xl font-bold text-blue-800">$5,600</p>
                  </div>
                </div>
              </article>
              <article className="flex flex-col w-3/12 ml-5 max-md:w-full">
                <div className="flex items-center gap-4 px-10 py-6 bg-white rounded shadow-sm max-md:px-5 max-md:mt-7">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea480c9160cdb027fdf0d396983c0b3213988ae2a4122b62f75d8fb6e4c45496?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Expense" className="shrink-0 w-[70px] aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-base text-neutral-300">Expense</p>
                    <p className="mt-3 text-3xl font-bold text-blue-800">$3,460</p>
                  </div>
                </div>
              </article>
              <article className="flex flex-col w-3/12 ml-5 max-md:w-full">
                <div className="flex items-center gap-3 px-10 py-5 bg-white rounded shadow-sm max-md:px-5 max-md:mt-7">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/83a51458ced4bd2be408b71cbdec79f2eae4a4b01cb96908add62cf22b359a7f?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Total Saving" className="shrink-0 w-20 aspect-square" />
                  <div className="flex flex-col">
                    <p className="text-base text-zinc-400">Total Saving</p>
                    <p className="mt-3 text-3xl font-bold text-blue-800">$7,920</p>
                  </div>
                </div>
              </article>
            </div>
          </section>
          <section className="mt-7 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <article className="flex flex-col w-[67%] max-md:w-full">
                <header className="flex-col mt-7 max-md:max-w-full">
                  <h2 className="text-xl font-bold text-blue-950 max-md:max-w-full">Last Transaction</h2>
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex items-start justify-between py-9 pr-10 mt-6 bg-white rounded shadow-sm max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                      <div className="flex flex-col text-sm text-blue-950">
                        <p className="text-base">{transaction.name}</p>
                        <time className="mt-3 text-neutral-300">{transaction.date}</time>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-zinc-400">{transaction.type}</p>
                        <p className="text-neutral-300">{transaction.card}</p>
                      </div>
                      <div className="flex flex-col text-neutral-300">
                        <p>{transaction.status}</p>
                      </div>
                      <div className={`flex flex-col ${transaction.status === "Pending" ? "text-red-600" : "text-green-600"}`}>
                        <p>{transaction.value}</p>
                      </div>
                    </div>
                  ))}
                </header>
                <div className="mt-7 text-blue-950 max-md:max-w-full">Debit & Credit Overview</div>
                <section className="flex items-center gap-5 px-px mx-8 mt-14 text-base text-gray-600 max-md:flex-wrap max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                  <p>$7,560 Debited & $5,420 Credited in this Week</p>
                  <div className="flex items-center gap-5 text-neutral-300">
                    <div className="flex items-center gap-3">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/853b487f76efb9d162b82a15194090bc79ae06f5eb158cd68a12a1538e595aa3?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Debit" className="shrink-0 w-4 aspect-square" />
                      <span>Debit</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/960d38f5350fdef06b43fd0b397d98a93aad8a5ed4ee3a388cde200f99929577?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Credit" className="shrink-0 w-4 aspect-square" />
                      <span>Credit</span>
                    </div>
                  </div>
                </section>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/86ed88cac3b934245802189857a1606740bb18c742538b97aa6a1497cfd8192b?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Chart" className="mt-6 w-full aspect-[2.7] max-md:max-w-full" />
              </article>
              <section className="flex flex-col w-[33%] max-md:w-full">
                <header className="flex items-center gap-5 text-blue-950">
                  <h2 className="flex-auto text-2xl font-bold">My Accounts</h2>
                  <a href="#" className="my-auto text-lg">See All</a>
                </header>
                <article className="flex flex-col w-full mt-5 bg-slate-100 rounded shadow-sm">
                  <div className="flex items-start justify-between py-9 pr-20 pl-7 bg-blue-800 rounded shadow-sm max-md:px-5">
                    <div className="text-white">
                      <p className="text-xs">Balance</p>
                      <p className="mt-2.5 text-xl font-bold">$5,756</p>
                      <p className="mt-7 text-xs text-slate-300">Account Type</p>
                      <p className="text-sm">Savings</p>
                    </div>
                    <div className="flex flex-col mt-16 text-white max-md:mt-10">
                      <p className="text-xs text-slate-300">Branch id</p>
                      <p className="mt-2.5 text-sm">123456</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-start px-5 py-7 text-2xl text-white bg-slate-500 rounded border border-slate-500 max-md:px-5">3778 ******** 1234</div>
                </article>
                <h3 className="mt-7 text-xl font-bold text-blue-950">Invoices Sent</h3>
                <div className="flex gap-4 px-7 py-8 mt-6 bg-white rounded shadow-sm max-md:px-5">
                  <div className="flex flex-col items-center">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/261f00e72d7f9c2dc9282a6d91547b383a01cbe2063e67cbd548bcfbec83a4d8?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Invoice 1" className="border border-cyan-500 w-[66px] aspect-[1.09]" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c3482f19be21aebec23e67c2e6c37342407f82bec851afc75acf2459589a485?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Invoice 2" className="mt-5 border border-cyan-500 w-[66px] aspect-[1.09]" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a508091cbf5b76dc4062c3d614af88cb68ffe461c20022401c04af7fac1cfd8?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Invoice 3" className="mt-5 border border-cyan-500 w-[66px] aspect-[1.09]" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c3482f19be21aebec23e67c2e6c37342407f82bec851afc75acf2459589a485?apiKey=794c38372b674dc6b8c9540bd5fd676d&" alt="Invoice 4" className="mt-5 border border-cyan-500 w-[66px] aspect-[1.09]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-5">
                      <div>
                        <p className="text-base text-blue-950">Apple Store</p>
                        <time className="mt-2.5 text-neutral-300">5h ago</time>
                      </div>
                      <p className="my-auto text-base text-blue-800">$450</p>
                    </div>
                    <div className="flex justify-between gap-5 px-px mt-10">
                      <div>
                        <p className="text-base text-blue-950">Michael</p>
                        <time className="mt-3.5 text-zinc-400">2 days ago</time>
                      </div>
                      <p className="ml-2.5 text-sm text-blue-800">$160</p>
                    </div>
                    <div className="flex justify-between gap-5 mt-10 px-p">
                      <div>
                        <p className="text-base text-blue-950">Playstation</p>
                        <time className="mt-3.5 text-zinc-400">5 days ago</time>
                      </div>
                      <p className="mt-14 ml-5 text-lg text-blue-800">$1085</p>
                    </div>
                    <div className="flex justify-between gap-5 mt-10 px-p">
                      <div>
                        <p className="text-base text-blue-950">William</p>
                        <time className="mt-3.5 text-zinc-400">10 days ago</time>
                      </div>
                      <p className="mt-14 ml-2.5 text-lg text-blue-800">$90</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </nav>
    </div>
  );
}

export default BankAccountCard;
