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

const UserActiveRide = ({ activeRide, onClose, onSubmitRating }) => {
    const [rating, setRating] = useState(0);
    const [timerExpired, setTimerExpired] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimerExpired(true);
            if (typeof onClose === 'function') {
                onClose();
            }
        }, 120000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const submitRating = () => {
        if (!rating) {
            alert('Please select a rating.');
            return;
        }
        onSubmitRating(activeRide._id, activeRide.captainId, rating);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2>Rate Your Captain</h2>
                <p>{`Captain: ${activeRide.captainName}`}</p>
                <div>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            onClick={() => setRating(num)}
                            className={`px-4 py-2 rounded ${rating === num ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {num} ★
                        </button>
                    ))}
                </div>
                <button onClick={submitRating} disabled={timerExpired}>
                    Submit Rating
                </button>
                <button onClick={onClose}>Skip</button>
            </div>
        </div>
    );
};

export default UserActiveRide;
