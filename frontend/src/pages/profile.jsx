import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import axios from '../api/axiosConfig';
import EmailChange from '../components/ProfileComponent/ChangeEmail';

const AccountSetting = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmail(response.data.email);
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };
    fetchDetails();
  }, []);

  const handleChangePassword = async () => {
    try {
      // Verify current password
      const verifyPasswordResponse = await axios.post('/auth/login', {
        email: email,
        password: currentPassword
      });
      if (verifyPasswordResponse.status !== 200) {
        alert('Current password is incorrect');
        return;
      }

      // Update password
      const updatePasswordResponse = await axios.put(`/auth/updateUser/${userId}`, {
        password: newPassword
      });
      if (updatePasswordResponse.status === 200) {
        alert('Password updated successfully');
      } else {
        alert('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating password');
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
          <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          </div>
          <hr className="mt-4 mb-8" />
          <p className="py-2 text-xl font-semibold">Email Address</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">Your email address is <strong>{email}</strong></p>
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
            >
              Change
            </button>
          </div>
          <hr className="mt-4 mb-8" />
          <p className="py-2 text-xl font-semibold">Password</p>
          <div className="flex items-center">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <label htmlFor="current-password">
                <span className="text-sm text-gray-500">Current Password</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="current-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="***********"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </label>
              <label htmlFor="new-password">
                <span className="text-sm text-gray-500">New Password</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="new-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="***********"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>
         
          <button
            onClick={handleChangePassword}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save Password
          </button>
          <hr className="mt-4 mb-8" />
        </div>
      </div>
      {isEmailModalOpen && (
        <EmailChange
          email={email}
          userId={userId}
          onClose={() => setIsEmailModalOpen(false)}
        />
      )}
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent />
      <AccountSetting />
    </div>
  );
};

export default ProfilePage;
