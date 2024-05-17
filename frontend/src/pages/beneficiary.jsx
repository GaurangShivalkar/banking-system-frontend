import React, {useState, useEffect} from "react";
import NavbarComponent from "../components/navbarComponent";
import axios from "../api/axiosConfig";
const BeneficiaryPage = () => {
    const [name, setName] = useState("");
     const [accountNumber, setAccountNumber] = useState("");
     const [bankName, setBankName] = useState("");
     const [branchId, setBranchId] = useState("");
    const [branches, setBranches] = useState([]);

    // Fetch branches data from backend when component mounts
    useEffect(() => {fetchBranches();}, []);

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

        const formData = {
            name,
            accountNumber,
            bankName,
           branchId
        };

        try {
           await axios.post("/api/beneficiaries/addBeneficiary", formData);

            console.log("Beneficiary saved successfully!");
            
        } catch (error) {
                console.error('Error adding beneficiary:', error);
                alert('An error occurred while adding beneficiary');
            }
        }
            return (
                <div className="flex h-screen">
                    {/* Sidebar */}
                    <NavbarComponent />

                    {/* Main Content */}
                    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10">
                        <h1 className="text-2xl font-bold mb-4">Add New Beneficiary</h1>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    id="accountNumber"
                                    name="accountNumber"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    id="bankName"
                                    name="bankName"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                />
                            </div>
                             <div className="mb-4">
                                <label htmlFor="branchId" className="block text-sm font-medium text-gray-700">
                                    Branch
                                </label>
                                <select
                                    id="branchId"
                                    name="branchId"
                                    value={branchId}
                                    onChange={(e) => setBranchId(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    required
                                >
                                    <option value="">Select Branch</option>
                                    {branches.map((branch) => (
                                        <option key={branch.branchId} value={branch.branchId}>
                                            {branch.branchName}
                                        </option>
                                    ))}
                                </select> 
                            </div> 
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Save Beneficiary
                            </button>
                        </form>
                    </div>
                </div>

            );
        };

        export default BeneficiaryPage;
