import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserLogout = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleConfirmLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Clear localStorage and redirect to login
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            {showConfirmation ? (
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold text-black mb-4">
                     Are you sure you want to log out?
                    </h2>
                    <div className="flex space-x-4">
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            onClick={handleConfirmLogout}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShowConfirmation(true)}
                    className="text-gray-800 text-lg hover:text-gray-900 transition duration-300"
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default UserLogout;
