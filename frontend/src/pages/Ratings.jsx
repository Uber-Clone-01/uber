import React from 'react';
import { FaTachometerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Ratings = () => {
  const ratingData = {
    rating: 4.7,
    totalRides: 50,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold text-gray-800">Ratings</h2>
      
      
      <Link to="/dashboard" className="fixed right-4 top-4 h-10 w-10   ">
          <FaTachometerAlt className="text-xl text-gray-800" />
      </Link>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Your Rating</h3>
        <p className="text-lg text-gray-600">Current rating: {ratingData.rating} / 5</p>
        <p className="text-gray-600">Total Rides: {ratingData.totalRides}</p>
      </div>
    </div>
  );
};

export default Ratings;

