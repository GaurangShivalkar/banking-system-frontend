// SessionTimeoutModal.js
import React from 'react';

const SessionTimeoutModal = ({ showModal, onClose, onContinueSession }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">Session Timeout</h2>
        <p className="mt-2">Your session is about to expire. Do you want to continue your session?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Ok</button>
          <button onClick={onContinueSession} className="bg-blue-500 text-white px-4 py-2 rounded">Continue Session</button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;
