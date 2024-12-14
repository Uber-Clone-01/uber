import React from 'react';
import { FaCar, FaTachometerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRideData } from '../context/RideHistoryContext';

const ActiveRide = () => {
    const { rides } = useRideData();

   
    const activeRide = rides.length > 0 ? rides[rides.length - 1] : null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Active Ride</h2>
                <Link to="/dashboard" className="text-xl text-gray-800 hover:text-blue-800 ml-auto">
                    <FaTachometerAlt className="inline-block mr-2" />
                </Link>
            </div>

            {activeRide ? (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <div className="flex items-center space-x-4">
                        <FaCar className="text-4xl text-blue-600" />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Ride Details</h3>
                            <p className="text-gray-600">Your current ride information:</p>
                            <ul className="mt-4 space-y-2">
                                
                                <li className="text-gray-700">
                                    <strong>Pick-up:</strong> {activeRide.pickup}
                                </li>
                                <li className="text-gray-700">
                                    <strong>Destination:</strong> {activeRide.destination}
                                </li>
                                <li className="text-gray-700">
                                    <strong>Fare:</strong> ₹{activeRide.fare}
                                </li>
                            </ul>
                            <div className="mt-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                                    Start Navigation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <p className="text-gray-600 text-center">
                        No active rides available. Please complete a ride to see details here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ActiveRide;
