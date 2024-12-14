import React from 'react';
import { Line } from 'react-chartjs-2';
import { useRideData } from '../context/RideHistoryContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Earnings = () => {
    const { rides } = useRideData();

    // Calculate earnings for each "Day X"
    const dailyEarnings = rides.reduce((acc, ride, index) => {
        acc[index] = ride.fare || 0;
        return acc;
    }, []);

    const totalEarnings = dailyEarnings.reduce((sum, fare) => sum + fare, 0);

    const data = {
        labels: dailyEarnings.map((_, index) => `Day ${index + 1}`), // Day 1, Day 2, ...
        datasets: [
            {
                label: 'Daily Earnings (₹)',
                data: dailyEarnings,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-semibold text-gray-800">
                Total Earnings: ₹{totalEarnings}
            </h2>
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <Line data={data} />
            </div>
        </div>
    );
};

export default Earnings;

