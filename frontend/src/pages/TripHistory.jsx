import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaTrash } from 'react-icons/fa';

const TripHistory = ({ tripHistory, deleteTrip }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Trip History</h2>
                <Link to="/dashboard" className="text-xl text-gray-800 hover:text-blue-800 ml-auto">
                    <FaTachometerAlt className="inline-block mr-2" />
                </Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                {tripHistory.length > 0 ? (
                    <ul className="space-y-4">
                        {tripHistory.map((trip, index) => (
                            <li
                                key={index}
                                className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-gray-700">Date: {trip.date}</p>
                                    <p className="text-gray-700">Pick-up: {trip.pickup}</p>
                                    <p className="text-gray-700">Destination: {trip.destination}</p>
                                    <p className="text-gray-700">Fare: ₹{trip.fare}</p>
                                </div>
                                <button
                                    onClick={() => deleteTrip(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No trips recorded.</p>
                )}
            </div>
        </div>
    );
};

export default TripHistory;