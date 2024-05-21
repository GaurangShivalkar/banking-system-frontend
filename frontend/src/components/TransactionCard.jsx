import React from "react";

function TransactionCard() {
  const transactions = [
    { name: "Spotify ", date: "25 Jan 2021", type: "Shopping", card: "1234 ****", status: "Pending", value: "$150" },
    { name: "Mobile charge", date: "25 Jan 2021", type: "Service", card: "1234 ****", status: "Completed", value: "$340" },
    { name: "Emilly Wilson", date: "25 Jan 2021", type: "Transfer", card: "1234 ****", status: "Completed", value: "+$780" }
  ];

  return (
    <div className="flex flex-col w-full px-4 mt-7">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-blue-950">Last Transactions</h2>
      </header>
      <div className="flex flex-col gap-5">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between p-4 bg-white rounded shadow-sm max-md:flex-col max-md:gap-4"
          >
            <div className="flex flex-col text-sm text-blue-950">
              <p className="text-base">{transaction.name}</p>
              <time className="mt-1 text-neutral-500">{transaction.date}</time>
            </div>
            <div className="flex flex-col text-sm text-zinc-400">
              <p>{transaction.type}</p>
              <p className="text-neutral-500">{transaction.card}</p>
            </div>
            <div className="flex flex-col text-sm text-neutral-500">
              <p>{transaction.status}</p>
            </div>
            <div className={`flex flex-col text-sm ${transaction.status === "Pending" ? "text-red-600" : "text-green-600"}`}>
              <p>{transaction.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionCard;
