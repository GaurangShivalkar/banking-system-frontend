import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customers/showAllCustomer");
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers data:", error);
      setLoading(false);
    }
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
      <div className="overflow-x-auto">
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
            {customers.map((customer, index) => (
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
