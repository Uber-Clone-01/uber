import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get("https://uber-clone-backend-t531.onrender.com/users/logout", {
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
        <button
            onClick={handleLogout}
            className="text-white-800 text-lg hover:text-gray-900 transition duration-300"
        >
            Logout
        </button>
    );
};

export default UserLogout;


