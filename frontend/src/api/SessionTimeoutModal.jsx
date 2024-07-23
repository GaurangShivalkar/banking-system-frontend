import React from 'react';

function SessionTimeoutModal({ show, onClose, onContinue }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2>Session Expiring</h2>
        <p>Your session is about to expire. Do you want to continue?</p>
        <div className="mt-4">
          <button className="bg-red-500 text-white p-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-green-500 text-white p-2 rounded ml-2" onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default SessionTimeoutModal;
