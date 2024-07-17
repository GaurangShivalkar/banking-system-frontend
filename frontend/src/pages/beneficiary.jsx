import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "../api/axiosConfig";
import BeneficiaryType from "../components/BeneficiaryComponent/BeneficiaryType";

const BeneficiaryPage = () => {
    const customerId = localStorage.getItem('customerId');
    const [customerStatus, setCustomerStatus] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get('/api/customers/showCustomer/' + customerId); // Adjust the endpoint and ID as needed
                setCustomerStatus(response.data.status);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchCustomerData();
    }, [customerId]);


    return (
        <div className="flex flex-col h-screen">
            <NavbarComponent />
            <div className="p-4 sm:ml-64">
                <h1 className="text-black text-3xl font-bold mb-4">Beneficiary</h1>
                {customerStatus !== "verified" ? (
                    <div className="flex flex-col h-full justify-center items-center">
                        <h1 className="text-red-500 text-2xl font-bold mb-4">You are not authorized to use this functionality</h1>
                        <p className="text-gray-700">Please coordinate with customer care.</p>
                    </div>
                ) : (
                    <>
                        
                        <BeneficiaryType />
                    </>
                )}
            </div>
        </div>
    );
};

export default BeneficiaryPage;
