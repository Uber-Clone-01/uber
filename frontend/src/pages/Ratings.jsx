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
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ratings = ({ captainId }) => {
    const [ratings, setRatings] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get(`/ratings/${captainId}/ratings`);
                setRatings(response.data);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };
        fetchRatings();
    }, [captainId]);

    return (
        <div>
            {ratings ? (
                <div>
                    <p>Average Rating: {ratings.averageRating.toFixed(2)}</p>
                    <p>Total Ratings: {ratings.ratingCount}</p>
                </div>
            ) : (
                <p>No ratings available.</p>
            )}
        </div>
    );
};

export default Ratings;
