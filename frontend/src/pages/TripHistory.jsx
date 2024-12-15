import React from 'react';
import { useRideData } from '../context/RideHistoryContext';
import { FaTachometerAlt, FaTrash } from 'react-icons/fa'; // Import FaTrash here
import { Link } from 'react-router-dom';

const TripHistory = () => {
    const { rides, removeActiveRide} = useRideData();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800">Ride History</h2>
                <Link to="/dashboard" className="text-2xl text-gray-800 hover:text-blue-600 transition duration-200">
                    <FaTachometerAlt className="inline-block mr-2 text-3xl" />
                </Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 mt-6">
                {rides.length > 0 ? (
                    <ul className="space-y-6">
                        {rides.map((ride, index) => (
                            <li
                                key={index}
                                className="p-6 bg-gray-50 rounded-lg shadow-md flex justify-between items-center transition-transform transform hover:scale-105"
                            >
                                <div>
                                    <p className="text-gray-800 font-semibold">Pick-up: <span className="font-normal">{ride.pickup}</span></p>
                                    <p className="text-gray-800 font-semibold">Destination: <span className="font-normal">{ride.destination}</span></p>
                                    <p className="text-gray-800 font-semibold">Fare: <span className="font-normal">₹{ride.fare}</span></p>
                                </div>
                                <button
                                    onClick={() => removeActiveRide(index)}
                                    className="text-red-600 hover:text-red-800 transition duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-lg">No rides found.</p>
                )}
            </div>
        </div>
    );
};

export default TripHistory;
