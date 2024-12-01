import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Settings</h2>
        <Link to="/dashboard" className="text-xl text-gray-800 hover:text-blue-800 ml-auto">
          <FaTachometerAlt className="inline-block mr-2" />
          
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <p className="text-lg text-gray-600">Update your profile settings here.</p>
      </div>
    </div>
  );
};

export default Settings;
