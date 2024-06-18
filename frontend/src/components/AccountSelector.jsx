import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const AccountSelector = ({ sendDataToParent }) => {
    const [sourceAccountId, setSourceAccountId] = useState('');
    const [accountList, setAccountList] = useState([]);
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const response = await axios.get(`/api/accounts/getAccountsByCustomerId/${customerId}`);
                const accounts = response.data;
                setAccountList(accounts);
                
                if (accounts.length === 1) {
                    const accountNumber = accounts[0].accountNumber;
                    setSourceAccountId(accountNumber);
                    sendDataToParent(accountNumber); // Send the single account data to parent
                } else if (accounts.length > 1) {
                    const defaultAccountNumber = accounts[0].accountNumber;
                    setSourceAccountId(defaultAccountNumber);
                    sendDataToParent(defaultAccountNumber); // Send the default account data to parent
                }
            } catch (error) {
                console.error('Error fetching account details:', error);
            }
        };
        fetchAccountDetails();
    }, [customerId, sendDataToParent]);

    const handleAccountChange = (e) => {
        const selectedAccountId = e.target.value;
        setSourceAccountId(selectedAccountId);
        sendDataToParent(selectedAccountId);
    };

    return (
        <div className="mb-4">
            <label htmlFor="account-select" className="block text-black">Select Account:</label>
            <select
                id="source-account"
                value={sourceAccountId}
                onChange={handleAccountChange}
                className="mt-1 p-2 rounded-lg bg-gray-700 text-white" >
                <option value="" disabled>Select an account</option>
                {accountList.map((account, index) => (
                    <option key={index} value={account.accountNumber}>
                        {account.accountNumber} - Balance: {account.balance}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AccountSelector;
