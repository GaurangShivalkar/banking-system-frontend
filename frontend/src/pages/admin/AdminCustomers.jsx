import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customers/showAllCustomer");
      setCustomers(response.data);
      setFilteredList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers data:", error);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let filtered = [...customers];

    if (filterType && filterValue) {
        switch (filterType) {
            case 'zipcode':
                filtered = filtered.filter(customer => customer.zipcode.toString().includes(filterValue));
                break;
                case 'status':
                  filtered = filtered.filter(customer => customer.status.includes(filterValue));
                  break;
           
            default:
                break;
        }
    }
    setFilteredList(filtered);
};

  const toggleStatus = async (customerId, currentStatus) => {
    const newStatus = currentStatus === "inactive" ? "active" : "inactive";
    try {
      await axios.put(`/api/customers/updateCustomer/${customerId}`, {
        status: newStatus,
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error updating customer status:", error);
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
          <option value="zipcode">By Zipcode</option>
          <option value="status">By Status</option>
        
        </select>
        {filterType === 'zipcode' && (
          <input type="text" placeholder="ZIPCODE" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}
               {filterType === 'status' && (
                    <div className="mb-2">
                        <label className="mr-4">
                            <input type="radio" value="pending" checked={filterValue === "pending"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            PENDING
                        </label>
                        <label>
                            <input type="radio" value="active" checked={filterValue === "active"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            ACTIVE
                        </label>
                    </div>
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
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Aadhar Number</th>
              <th className="py-2 px-4 border">PAN Number</th>
              <th className="py-2 px-4 border">Phone Number</th>
              <th className="py-2 px-4 border">Zipcode</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((customer, index) => (
              <tr
                key={index}
                className="text-center odd:bg-gray-100 even:bg-gray-200"
              >
                <td className="py-2 px-4 border">{customer.customerId}</td>
                <td className="py-2 px-4 border">{customer.customerName}</td>
                <td className="py-2 px-4 border">{customer.address}</td>
                <td className="py-2 px-4 border">{customer.aadharNumber}</td>
                <td className="py-2 px-4 border">{customer.panNumber}</td>
                <td className="py-2 px-4 border">{customer.phoneNumber}</td>
                <td className="py-2 px-4 border">{customer.zipcode}</td>
                <td className="py-2 px-4 border">{customer.status}</td>
                <td className="py-2 px-4 border">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={customer.status === "active"}
                        onChange={() =>
                          toggleStatus(customer.customerId, customer.status)
                        }
                      />
                      <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                          customer.status === "active"
                            ? "transform translate-x-full bg-green-500"
                            : ""
                        }`}
                      ></div>
                    </div>
                    <span className="ml-3 text-gray-700">
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </label>
                </td>
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

const AdminCustomers = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <CustomerList />
      </div>
    </div>
  );
};

export default AdminCustomers;
