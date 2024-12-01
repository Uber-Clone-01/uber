import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';

const Notifications = () => {
  const notifications = [
    'New ride request from a passenger.',
    'Your vehicle requires maintenance.',
    'Rating from your last trip: 5 stars!',
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Notifications</h2>
        <Link to="/dashboard" className="text-xl text-gray-800 hover:text-blue-800 ml-auto">
          <FaTachometerAlt className="inline-block mr-2" />
          
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              {notification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;

