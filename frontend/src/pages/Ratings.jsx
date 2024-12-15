/*import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';  // Assuming you have this context set up

const Ratings = () => {
    const { captain } = useContext(CaptainDataContext);  // Access the captain data from context
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!captain?.id) {
            setError('Captain is not authenticated.');
            setIsLoading(false);
            return;
        }

        const fetchRatings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/${captain.id}/ratings`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token from localStorage
                    },
                });

                if (response.status === 200) {
                    setRatings(response.data);  // Assuming the response contains the ratings
                } else {
                    throw new Error('Failed to fetch ratings');
                }
            } catch (error) {
                console.error('Error fetching ratings:', error);
                setError('Error fetching ratings');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRatings();
    }, [captain?.id]);  // Re-fetch when captain's ID changes

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-semibold text-gray-800">Captain Ratings</h2>
            {ratings.length === 0 ? (
                <p>No ratings available.</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {ratings.map(({ captainName, averageRating, ratingCount }) => (
                        <li
                            key={captainName}
                            className="bg-white shadow-lg rounded-lg p-4"
                        >
                            <strong>{captainName}</strong>
                            <p>Average Rating: {averageRating.toFixed(2)}</p>
                            <p>Total Ratings: {ratingCount}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Ratings;*/
import React from 'react';
import { FaTachometerAlt } from 'react-icons/fa'; // Importing the Dashboard icon from react-icons
import { Link } from 'react-router-dom'; // Importing Link for navigation

const Ratings = () => {
    // Hardcoded data for display purposes
    const captainData = {
        name: 'Captain Jack Sparrow',
        title: '5-Star Captain',
        highestAchievement: 'Rated as Best Captain of the Year',
        averageRating: 4.9,
        ratingCount: 238,
        userRating: 5,
    };

    return (
        <div
            style={{
                margin: '20px auto',
                maxWidth: '600px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f9f9f9',
                position: 'relative', // Make sure the position is relative to place the icon in the top-right
            }}
        >
            {/* Dashboard icon */}
            <Link
                to="/dashboard" // Link to the Captain's Dashboard page
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    color: 'black',
                    fontSize: '24px',
                    textDecoration: 'none',
                }}
            >
                <FaTachometerAlt className="text-3xl" />
            </Link>

            <h2
                style={{
                    textAlign: 'center',
                    color: '#4CAF50',
                    marginBottom: '10px',
                }}
            >
                {captainData.title}
            </h2>
            <h3
                style={{
                    textAlign: 'center',
                    color: '#333',
                    fontWeight: '600',
                }}
            >
                {captainData.name}
            </h3>
            <p
                style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    marginBottom: '20px',
                    color: '#666',
                }}
            >
                "{captainData.highestAchievement}"
            </p>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#4CAF50' }}>{captainData.averageRating}</h3>
                    <p style={{ margin: 0, color: '#777' }}>Avg. Rating</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#4CAF50' }}>{captainData.ratingCount}</h3>
                    <p style={{ margin: 0, color: '#777' }}>Total Ratings</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#4CAF50' }}>{captainData.userRating}</h3>
                    <p style={{ margin: 0, color: '#777' }}>Your Rating</p>
                </div>
            </div>
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '10px',
                    color: '#333',
                    fontSize: '14px',
                }}
            >
                Thank you for your feedback! Your ratings help us improve and recognize exceptional captains like{' '}
                <strong>{captainData.name}</strong>.
            </div>
        </div>
    );
};

export default Ratings;
