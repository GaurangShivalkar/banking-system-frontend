import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const AccountData = ({ sourceAccountId }) => {
    const [accountData, setAccountData] = useState({});
    const [credits, setCredits] = useState(0);
    const [debits, setDebits] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchAccountDetails() {
            try {
                const response = await axios.get(`/api/accounts/getAccountByAccountNo/${sourceAccountId}`);
                setAccountData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        async function fetchCredits() {
            try {
                const response = await axios.get(`/api/transactions/getTotalCredits/${sourceAccountId}`, { headers: { Authorization: `Bearer ${token}` } });
                setCredits(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        async function fetchDebits() {
            try {
                const response = await axios.get(`/api/transactions/getTotalDebits/${sourceAccountId}`, { headers: { Authorization: `Bearer ${token}` } });
                setDebits(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (sourceAccountId) {
            fetchAccountDetails();
            fetchCredits();
            fetchDebits();
        }
    }, [sourceAccountId]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <Card title="Total Balance" amount={accountData.balance} />
            <Card title="Total Credits" amount={credits} />
            <Card title="Total Debits" amount={debits} color="red" />
        </div>
    );
};

const Card = ({ title, amount, color }) => (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2x ${color === 'red' ? 'text-red-500' : 'text-green-400'}`}>
        <h3 className="text-lg text-white">{title}</h3>
        <p className="text-2xl">₹ {amount}</p>
    </div>
);

export default AccountData;
