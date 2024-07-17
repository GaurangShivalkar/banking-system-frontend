import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const BeneficiaryData = ({ beneficiaries }) => {
    const [beneficiaryList, setBeneficiaryList] = useState([]);
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        const fetchBeneficiaryDetails = async () => {
            try {
                const responseBeneficiary = await axios.get('/api/beneficiaries/getBeneficiaryByCustomerId', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { customerId: customerId }
                });

                setBeneficiaryList(responseBeneficiary.data);
            } catch (error) {
                console.error('Error fetching beneficiary details:', error);
            }
        };

        fetchBeneficiaryDetails();
    }, [token, customerId]);

    return (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Beneficiaries</h3>
            <div className="h-screen overflow-y-auto">
                <ul className="space-y-4">
                    {beneficiaryList.map((beneficiary, index) => (
                        <li key={index} className="bg-gray-800 bg-opacity-80 p-4 rounded-lg text-white">
                            <div className="mb-2">
                                <span className="block text-lg font-semibold">Name:</span>
                                <span>{beneficiary.name}</span>
                            </div>
                            <div className="mb-2">
                                <span className="block text-lg font-semibold">Email:</span>
                                <span>{beneficiary.emailId}</span>
                            </div>
                            <div>
                                <span className="block text-lg font-semibold">Account Number:</span>
                                <span>{beneficiary.accountNumber}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BeneficiaryData;
