import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext); // Clear captain context

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Use 'token' consistently

        try {
            // Send logout request to the server
            await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error during logout:', error.message); // Log error for debugging
        } finally {
            // Clear token and captain data regardless of API response
            localStorage.removeItem('token');
            setCaptain(null); // Reset captain context
            navigate('/captain-login');
        }
    };

    // Trigger logout on component render
    React.useEffect(() => {
        handleLogout();
    }, []);

    return <div>Logging out...</div>;
};

export default CaptainLogout;