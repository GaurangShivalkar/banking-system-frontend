import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "../api/axiosConfig";
import BeneficiaryType from "../components/BeneficiaryType";

function AddForm() {
    const [activeTab, setActiveTab] = useState('own');
    const [name, setName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [branchId, setBranchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [beneficiaryType, setBeneficiaryType] = useState("");
    const token = localStorage.getItem("token");
    
    // Fetch branches data from backend when component mounts
    useEffect(() => { fetchBranches(); }, []);

    const fetchBranches = async () => {
        try {
            const response = await axios.get("api/branch/showAllBranches");
            setBranches(response.data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formDataOwn = {
            name,
            accountNumber,
            beneficiaryType,
            bankName: "ENQ",

        }
        const formData = {
            name,
            accountNumber,
            bankName,
            branch: {
                branchId: branchId
            },
            beneficiaryType
        };

        try {
            if (activeTab === 'own') {
                await axios.post("/api/beneficiaries/addBeneficiary", formDataOwn, { headers: { Authorization: `Bearer ${token}` } });
            }
            else {
                await axios.post("/api/beneficiaries/addBeneficiary", formData, { headers: { Authorization: `Bearer ${token}` } });
            }
            alert('Beneficiary has been added sucessfully');

        } catch (error) {
            console.error('Error adding beneficiary:', error);
            alert('An error occurred while adding beneficiary');
        }
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 mx-2 rounded ${activeTab === 'own' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('own')}
                >
                    Own Beneficiary
                </button>
                <button
                    className={`px-4 py-2 mx-2 rounded ${activeTab === 'other' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('other')}
                >
                    Other Bank Beneficiary
                </button>
            </div>

            {activeTab === 'own' && (

                <form onSubmit={handleFormSubmit} className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter beneficiary name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account-number">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="account-number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter account number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beneficiary-type">
                            Beneficiary Type
                        </label>
                        <select
                            id="beneficiary-type"
                            value={beneficiaryType}
                            onChange={(e) => setBeneficiaryType(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >

                            <option value="Self">Self</option>
                            <option value="Internal">Internal</option>

                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Submit
                    </button>
                </form>
            )}

            {activeTab === 'other' && (
                <form onSubmit={handleFormSubmit} className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter beneficiary name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account-number">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="account-number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter account number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank-name">
                            Bank Name
                        </label>
                        <input
                            type="text"
                            id="bank-name"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter bank name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch-id">
                            Branch ID (IFSC Code)
                        </label>
                        <select
                            type="text"
                            id="branch-id"
                            value={branchId}
                            onChange={(e) => setBranchId(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter branch ID (IFSC code)"
                        >
                            <option value="">Select Branch</option>
                            {branches.map((branch) => (
                                <option key={branch.branchId} value={branch.branchId}>
                                    {branch.branchName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <select
                        id="beneficiary-type"
                        value={beneficiaryType}
                        onChange={(e) => setBeneficiaryType(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >


                        <option value="External">External</option>
                        <option value="Business">Business</option>
                    </select>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

const BeneficiaryPage = () => {

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <NavbarComponent />
            {/* <div><AddForm /></div> */}
            <div><BeneficiaryType /></div>
        </div>

    );
};

export default BeneficiaryPage;
