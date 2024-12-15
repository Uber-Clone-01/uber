import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { FaSignOutAlt } from 'react-icons/fa';

const CaptainLogout = () => {
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        try {
            // Send logout request to the server
            await axios.get("https://uber-clone-backend-t531.onrender.com/captains/logout", {
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
        <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
        </button>
    );
};

export default CaptainLogout;
