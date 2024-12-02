import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaWallet, FaUsers, FaList, FaSignOutAlt, FaBell, FaCog, FaHome } from 'react-icons/fa';
import CaptainLogout from './CaptainLogout';

const CaptainDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-800">Dashboard</h3>
        <Link to="/captain-home" className="text-2xl text-gray-800 hover:text-blue-600">
          <FaHome />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Link to="/active-ride" className="flex items-center space-x-4">
            <FaCar className="text-4xl text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Current Ride</h3>
              <p className="text-gray-600">View and manage your active ride.</p>
            </div>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <Link to="/earnings" className="flex items-center space-x-4">
            <FaWallet className="text-4xl text-green-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Earnings</h3>
              <p className="text-gray-600">View your total earnings and payment history.</p>
            </div>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <Link to="/ratings" className="flex items-center space-x-4">
            <FaUsers className="text-4xl text-yellow-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Rider Ratings</h3>
              <p className="text-gray-600">View your rider ratings and feedback.</p>
            </div>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
            <Link to="/trip-history" className="flex items-center space-x-4">
                <FaList className="text-4xl text-purple-600" />
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Trip History</h3>
                    <p className="text-gray-600">Review your past trips and ride details.</p>
                </div>
            </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <Link to="/notifications" className="flex items-center space-x-4">
            <FaBell className="text-4xl text-red-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
              <p className="text-gray-600">Check unread messages and updates.</p>
            </div>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <Link to="/settings" className="flex items-center space-x-4">
            <FaCog className="text-4xl text-gray-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
              <p className="text-gray-600">Manage your account settings and preferences.</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-end mt-6">
      <div className="dashboard">
            {/* Other dashboard components */}
            <CaptainLogout />
        </div>
      </div>
    </div>
  );
};

export default CaptainDashboard;


