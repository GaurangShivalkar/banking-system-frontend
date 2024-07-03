import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const BeneficiaryList = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get("/api/beneficiaries/getAllBeneficiary", { headers: { Authorization: `Bearer ${token}` } });
      setBeneficiaries(response.data);
      setFilteredList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching beneficiaries data:", error);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let filtered = [...beneficiaries];

    if (filterType && filterValue) {
      switch (filterType) {
        case 'customer':
          filtered = filtered.filter(beneficiaries => beneficiaries.customer.customerId.toString().includes(filterValue));
          break;

        default:
          break;
      }
    }
    setFilteredList(filtered);
  };
  const toggleStatus = async (beneficiaryId, currentStatus) => {
    const newStatus = currentStatus === "inactive" ? "active" : "inactive";
    try {
      await axios.put(`/api/beneficiaries/updateBeneficiary/${beneficiaryId}`, {
        status: newStatus,
      });
      fetchBeneficiaries();
    } catch (error) {
      console.error("Error updating beneficiary status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterValue(''); }} className="p-2 border rounded mb-2">
          <option value="">Select Filter</option>
          <option value="customer">By Customer</option>
      
        </select>
        {filterType === 'customer' && (
          <input type="text" placeholder="CUSTOMER" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}

        <button onClick={applyFilter} className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-gray-800">Apply Filter</button>
      </div>
      <div className="overflow-x-auto">
        {filteredList.length > 0 ? (
          <table className="min-w-full bg-white border-collapse shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Account Number</th>
                <th className="py-2 px-4 border">Customer ID</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((beneficiary, index) => (
                <tr
                  key={index}
                  className="text-center odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="py-2 px-4 border">{beneficiary.beneficiaryId}</td>
                  <td className="py-2 px-4 border">{beneficiary.name}</td>
                  <td className="py-2 px-4 border">{beneficiary.emailId}</td>
                  <td className="py-2 px-4 border">{beneficiary.accountNumber}</td>
                  <td className="py-2 px-4 border">{beneficiary.customer.customerId}</td>
                  <td className="py-2 px-4 border">{beneficiary.beneficiaryType}</td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No beneficiaries found</p>
        )}
      </div>
    </div>
  );
};

const AdminBeneficiaries = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <BeneficiaryList />
      </div>
    </div>
  );
};

export default AdminBeneficiaries;
