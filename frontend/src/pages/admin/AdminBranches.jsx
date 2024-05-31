import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get("/api/branch/showAllBranches");
      setBranches(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching branches data:", error);
      setLoading(false);
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
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">Zipcode</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr
                key={index}
                className="text-center odd:bg-gray-100 even:bg-gray-200"
              >
                <td className="py-2 px-4 border">{branch.branchId}</td>
                <td className="py-2 px-4 border">{branch.branchName}</td>
                <td className="py-2 px-4 border">{branch.branchAddress}</td>
                <td className="py-2 px-4 border">{branch.branchCity}</td>
                <td className="py-2 px-4 border">{branch.branchZipCode}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(branch.branchId)}
                  >
                    Edit
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AddBranchForm = ({ onClose }) => {
  const [branchData, setBranchData] = useState({
    branchId: "",
    branchName: "",
    branchAddress: "",
    branchCity: "",
    branchZipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchData({ ...branchData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/branch/saveBranch", branchData, {headers: { Authorization: `Bearer ${token}` }});
      onClose();
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="branchId"
          value={branchData.branchId}
          onChange={handleChange}
          placeholder="Branch Name"
          required
        />
         <input
          type="text"
          name="branchName"
          value={branchData.branchName}
          onChange={handleChange}
          placeholder="Branch Name"
          required
        />
        <input
          type="text"
          name="branchAddress"
          value={branchData.branchAddress}
          onChange={handleChange}
          placeholder="Branch Address"
          required
        />
        <input
          type="text"
          name="branchCity"
          value={branchData.branchCity}
          onChange={handleChange}
          placeholder="Branch City"
          required
        />
        <input
          type="text"
          name="branchZipCode"
          value={branchData.branchZipCode}
          onChange={handleChange}
          placeholder="Branch Zip Code"
          required
        />
        <button type="submit">Add Branch</button>
      </form>
    </div>
  );
};

const AdminBranches = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddBranch = () => {
    setIsAdding(true);
  };

  const handleCloseAddBranch = () => {
    setIsAdding(false);
  };

  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <button onClick={handleAddBranch}>Add Branch</button>
        {isAdding && <AddBranchForm onClose={handleCloseAddBranch} />}
        <BranchList />
      </div>
    </div>
  );
};

export default AdminBranches;

