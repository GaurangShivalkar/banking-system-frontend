// EmailChangeModal.js
import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const EmailChange = ({ email, userId, onClose }) => {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleChangeEmail = async () => {
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

      // Update email
      const updateEmailResponse = await axios.put(`/auth/updateUser/${userId}`, {
        email: newEmail
      });
      if (updateEmailResponse.status === 200) {
        alert('Email updated successfully');
        onClose();
      } else {
        alert('Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      alert('An error occurred while updating email');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
        <div className="mb-4">
          <label htmlFor="new-email" className="block text-sm font-medium text-gray-700">New Email</label>
          <input
            type="email"
            id="new-email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            id="current-password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-gray-800"
            onClick={handleChangeEmail}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailChange;
