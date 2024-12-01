import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';

const TripHistory = () => {
  const tripData = [
    { date: '2024-11-25', pickup: '123 Main St', destination: '456 Elm St', fare: 25 },
    { date: '2024-11-24', pickup: '789 Oak St', destination: '101 Pine St', fare: 30 },
    // Add more trips
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Trip History</h2>
        <Link to="/dashboard" className="text-xl text-gray-800 hover:text-blue-800 ml-auto">
          <FaTachometerAlt className="inline-block mr-2" />
          
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <ul className="space-y-4">
          {tripData.map((trip, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-700">Date: {trip.date}</p>
              <p className="text-gray-700">Pick-up: {trip.pickup}</p>
              <p className="text-gray-700">Destination: {trip.destination}</p>
              <p className="text-gray-700">Fare: ${trip.fare}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripHistory;

