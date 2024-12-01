import React from 'react';
import { FaCar, FaMapMarkerAlt, FaTachometerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ActiveRide = () => {
  const rideData = {
    pickup: "123 Main St",
    destination: "456 Elm St",
    driverName: "John Doe",
    vehicle: "Toyota Camry",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Active Ride</h2>
        <Link to="/dashboard" className="text-xl text-gray-800 hover:text-blue-800 ml-auto">
          <FaTachometerAlt className="inline-block mr-2" />
          
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <div className="flex items-center space-x-4">
          <FaCar className="text-4xl text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Ride Details</h3>
            <p className="text-gray-600">Your current ride information:</p>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-700">Driver: {rideData.driverName}</li>
              <li className="text-gray-700">Vehicle: {rideData.vehicle}</li>
              <li className="text-gray-700">Pick-up: {rideData.pickup}</li>
              <li className="text-gray-700">Destination: {rideData.destination}</li>
            </ul>
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Start Navigation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRide;

