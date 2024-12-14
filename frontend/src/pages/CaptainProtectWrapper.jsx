import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';  // Assuming you have this context set up
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);  // Assuming setCaptain is available in context
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        // Fetch captain profile only if token exists
        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setCaptain(response.data.captain); // Set captain data in context
                }
            } catch (err) {
                localStorage.removeItem('token');
                navigate('/captain-login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainProfile();
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
