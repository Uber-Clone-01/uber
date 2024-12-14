/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRideData } from '../context/RideHistoryContext';

const UserActiveRide = () => {
    const { rides, addRating, removeActiveRide } = useRideData();
    const [captainRating, setCaptainRating] = useState(0);
    const navigate = useNavigate();

    // Active ride is the first in the list
    const activeRide = rides.length > 0 ? rides[0] : null;

    const handleCaptainRating = (rating) => {
        setCaptainRating(rating);
    };

    const handleRatingSubmit = async () => {
        if (captainRating > 0 && activeRide) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/rides/submit-rating`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        rideId: activeRide._id,
                        captainId: activeRide.captainId,
                        rating: captainRating,
                        // feedback: captainFeedback,  // Optional if you implement feedback
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Rating submitted successfully!');
                    // Update UI or perform other actions like clearing form
                    removeActiveRide();  // Optionally remove the active ride
                } else {
                    throw new Error('Failed to submit rating');
                }
            } catch (error) {
                console.error('Error submitting rating:', error);
                alert('There was an issue submitting your rating.');
            }
        } else {
            alert('Please select a rating.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-semibold">Active Ride</h2>
            {activeRide ? (
                <div className="bg-white shadow rounded-lg p-6 mt-6">
                    <h3>Ride Details</h3>
                    <p><strong>Driver:</strong> {activeRide.captainName}</p>
                    <p><strong>Fare:</strong> ₹{activeRide.fare}</p>
                    <div className="mt-6">
                        <h4>Rate Your Captain</h4>
                        <div className="flex space-x-2 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    className={`px-3 py-1 rounded-full ${captainRating === num ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                    onClick={() => handleCaptainRating(num)}
                                >
                                    {num} ★
                                </button>
                            ))}
                        </div>
                        <button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                            onClick={handleRatingSubmit}
                        >
                            Submit Rating
                        </button>
                    </div>
                </div>
            ) : (
                <p>No active rides available.</p>
            )}
        </div>
    );
};

export default UserActiveRide;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserActiveRide = ({ userId }) => {
    const [rideData, setRideData] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [loadingRide, setLoadingRide] = useState(true);
    const [loadingRatings, setLoadingRatings] = useState(true);

    useEffect(() => {
        const fetchActiveRide = async () => {
            try {
                // Fetch active ride details
                const response = await axios.get(`/rides/${userId}/active`);
                setRideData(response.data);

                // Store ride data in local storage
                localStorage.setItem('activeRide', JSON.stringify(response.data));

                // Fetch ratings for the captain
                if (response.data?.captain?._id) {
                    fetchRatings(response.data.captain._id);
                } else {
                    console.error('Captain ID not found in active ride data');
                }
            } catch (error) {
                console.error('Error fetching active ride:', error);
            } finally {
                setLoadingRide(false);
            }
        };

        const fetchRatings = async (captainId) => {
            try {
                const response = await axios.get(`/ratings/${captainId}/ratings`);
                setRatings(response.data);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            } finally {
                setLoadingRatings(false);
            }
        };

        // Check for ride data in local storage
        const storedRide = localStorage.getItem('activeRide');
        if (storedRide) {
            const parsedRide = JSON.parse(storedRide);
            setRideData(parsedRide);
            if (parsedRide.captain?._id) {
                fetchRatings(parsedRide.captain._id);
            }
            setLoadingRide(false);
        } else {
            fetchActiveRide();
        }
    }, [userId]);

    return (
        <div>
            <h2>Active Ride Details</h2>
            {loadingRide ? (
                <p>Loading active ride details...</p>
            ) : rideData ? (
                <div>
                    <p>
                        Captain Name: {rideData.captain?.fullname?.firstname}{' '}
                        {rideData.captain?.fullname?.lastname || 'Not Available'}
                    </p>
                    <p>Pickup: {rideData.pickup}</p>
                    <p>Destination: {rideData.destination}</p>
                    <p>Fare: {rideData.fare} INR</p>
                    <p>
                        Vehicle: {rideData.captain?.vehicle?.vehicleType} -{' '}
                        {rideData.captain?.vehicle?.color}
                    </p>
                </div>
            ) : (
                <p>No active rides available.</p>
            )}

            <h2>Captain's Ratings</h2>
            {loadingRatings ? (
                <p>Loading captain ratings...</p>
            ) : ratings ? (
                <div>
                    <p>
                        Average Rating: {ratings.averageRating
                            ? ratings.averageRating.toFixed(2)
                            : 'N/A'}
                    </p>
                    <p>Total Ratings: {ratings.ratingCount}</p>
                </div>
            ) : (
                <p>No ratings available for this captain.</p>
            )}
        </div>
    );
};

export default UserActiveRide;
