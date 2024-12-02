import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { FaSignOutAlt } from 'react-icons/fa';

const CaptainLogout = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);

    const handleConfirmLogout = async () => {
        const token = localStorage.getItem('token');

        try {
            // Send logout request to the server
            await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error during logout:', error.message);
        } finally {
            // Clear token and captain data
            localStorage.removeItem('token');
            setCaptain(null);
            navigate('/captain-login');
        }
    };

    return (
        <div>
            {showConfirmation ? (
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleConfirmLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg">
                            Yes, Log Out
                        </button>
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShowConfirmation(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                </button>
            )}
        </div>
    );
};

export default CaptainLogout;