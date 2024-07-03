import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import AdminNavbarComponent from '../../components/AdminComponents/AdminNavbar';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

const BranchForm = ({ onClose, initialData, isEditMode }) => {
  const [formData, setFormData] = useState(initialData || { branchId: '', branchName: '', branchAddress: '', branchCity: '', branchZipCode: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditMode ? `/api/branch/updateBranch/${formData.branchId}` : '/api/branch/saveBranch';
      const method = isEditMode ? 'put' : 'post';
      await axios[method](url, formData, { headers: { Authorization: `Bearer ${token}` } });
      onClose();
    } catch (error) {
      console.error('Error submitting branch:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isEditMode && <input type="text" name="branchId" value={formData.branchId} onChange={handleChange} placeholder="Branch ID" required className="block w-full p-2 mb-2 border rounded" />}
      <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch Name" required className="block w-full p-2 mb-2 border rounded" />
      <input type="text" name="branchAddress" value={formData.branchAddress} onChange={handleChange} placeholder="Branch Address" required className="block w-full p-2 mb-2 border rounded" />
      <input type="text" name="branchCity" value={formData.branchCity} onChange={handleChange} placeholder="Branch City" required className="block w-full p-2 mb-2 border rounded" />
      <input type="text" name="branchZipCode" value={formData.branchZipCode} onChange={handleChange} placeholder="Branch Zip Code" required className="block w-full p-2 mb-2 border rounded" />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{isEditMode ? 'Update Branch' : 'Add Branch'}</button>
    </form>
  );
};

const BranchList = ({ onEdit }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('/api/branch/showAllBranches');
      setBranches(response.data);
      setFilteredList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching branches data:', error);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let filtered = [...branches];

    if (filterType && filterValue) {
      switch (filterType) {
        case 'city':
          filtered = filtered.filter(branch => branch.branchCity.toString().includes(filterValue));
          break;

        default:
          break;
      }
    }
    setFilteredList(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterValue(''); }} className="p-2 border rounded mb-2">
          <option value="">Select Filter</option>
          <option value="city">By City</option>

        </select>
        {filterType === 'city' && (
          <input type="text" placeholder="CITY" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="p-2 border rounded mb-2" />
        )}

        <button onClick={applyFilter} className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-gray-800">Apply Filter</button>
      </div>
      {filteredList.length > 0 ? (
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
            {filteredList.map((branch, index) => (
              <tr key={index} className="text-center odd:bg-gray-100 even:bg-gray-200">
                <td className="py-2 px-4 border">{branch.branchId}</td>
                <td className="py-2 px-4 border">{branch.branchName}</td>
                <td className="py-2 px-4 border">{branch.branchAddress}</td>
                <td className="py-2 px-4 border">{branch.branchCity}</td>
                <td className="py-2 px-4 border">{branch.branchZipCode}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => onEdit(branch)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No Branches found</p>
      )}
    </div>
  );
};

const AdminBranches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);

  const handleAddBranch = () => {
    setCurrentBranch(null);
    setIsModalOpen(true);
  };

  const handleEditBranch = (branch) => {
    setCurrentBranch(branch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleAddBranch}>Add Branch</button>
        <BranchList onEdit={handleEditBranch} />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BranchForm onClose={handleCloseModal} initialData={currentBranch} isEditMode={!!currentBranch} />
      </Modal>
    </div>
  );
};

export default AdminBranches;
