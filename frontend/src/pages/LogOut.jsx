import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-xl mb-4">Logging out...</h2>
      <button 
        onClick={() => navigate('/')} 
        className="bg-gray-800 text-white px-4 py-2 rounded-lg">
        Go to Home
      </button>
    </div>
  );
};

export default Logout;
