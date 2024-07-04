import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/showAllUsers", {headers: { Authorization: `Bearer ${token}` }});
      setUsers(response.data);
      setFilteredList(response.data);
   
    } catch (error) {
      console.error("Error fetching users data:", error);
   
    }
  };

  const applyFilter = () => {
    let filtered = [...users];

    if (filterType && filterValue) {
        switch (filterType) {
            case 'role':
                filtered = filtered.filter(user => user.role.toString().includes(filterValue));
                break;
               
           
            default:
                break;
        }
    }
    setFilteredList(filtered);
};



  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterValue(''); }} className="p-2 border rounded mb-2">
          <option value="">Select Filter</option>
          <option value="role">By Role</option>
         
        </select>
        {filterType === 'role' && (
          <input type="text" placeholder="roleE" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}
               {filterType === 'role' && (
                    <div className="mb-2">
                        <label className="mr-4">
                            <input type="radio" value="ADMIN" checked={filterValue === "ADMIN"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                            ADMIN
                        </label>
                        <label>
                            <input type="radio" value="USER" checked={filterValue === "USER"} onChange={(e) => setFilterValue(e.target.value)} className="mr-2" />
                           USER
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
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Role</th>
              {/* <th className="py-2 px-4 border">CustomerId</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredList.map((user, index) => (
              <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200">
                <td className="py-2 px-4 border">{user.userId}</td>
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                {/* <td className="py-2 px-4 border">{user.customer.customerId}</td> */}
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

const AdminUsers = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <UsersList/>
      </div>
    </div>
  );
};

export default AdminUsers;
