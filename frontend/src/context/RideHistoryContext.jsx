import React, { createContext, useContext, useState, useEffect } from 'react';

const RideHistoryContext = createContext();
export const useRideData = () => useContext(RideHistoryContext);

const RideDataContextProvider = ({ children }) => {
    const [rides, setRides] = useState([]); // Array of rides
    const [captainRatings, setCaptainRatings] = useState({}); // Object for captain ratings

    useEffect(() => {
        // Load rides and ratings from localStorage
        try {
            const storedRides = JSON.parse(localStorage.getItem('rides')) || [];
            const storedRatings = JSON.parse(localStorage.getItem('captainRatings')) || {};
            setRides(storedRides);
            setCaptainRatings(storedRatings);
        } catch (err) {
            console.error("Error loading data from localStorage:", err);
        }
    }, []);

    useEffect(() => {
        // Save rides and ratings to localStorage with debounce
        const timeoutId = setTimeout(() => {
            localStorage.setItem('rides', JSON.stringify(rides));
            localStorage.setItem('captainRatings', JSON.stringify(captainRatings));
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [rides, captainRatings]);

    const addRide = (ride) => {
        setRides((prev) => [...prev, ride]); // Add a new ride
    };

    const removeActiveRide = () => {
        setRides((prev) => prev.slice(1)); // Remove the first ride (active ride)
    };

    const addRating = (captainName, rating) => {
        setCaptainRatings((prev) => {
            const currentData = prev[captainName] || { totalRating: 0, count: 0 };
            return {
                ...prev,
                [captainName]: {
                    totalRating: currentData.totalRating + rating,
                    count: currentData.count + 1,
                },
            };
        });
    };

    return (
        <RideHistoryContext.Provider
            value={{
                rides,
                addRide,
                removeActiveRide,
                captainRatings,
                addRating,
            }}
        >
            {children}
        </RideHistoryContext.Provider>
    );
};

export default RideDataContextProvider;
/*
import React, { createContext, useContext, useState, useEffect } from 'react';

const RideHistoryContext = createContext();
export const useRideData = () => useContext(RideHistoryContext);

const RideDataContextProvider = ({ children }) => {
    const [rides, setRides] = useState([]);
    const [captainRatings, setCaptainRatings] = useState({}); // Initialize as object

    useEffect(() => {
        try {
            const storedRides = JSON.parse(localStorage.getItem('rides')) || [];
            const storedRatings = JSON.parse(localStorage.getItem('captainRatings')) || {};
            setRides(storedRides);
            setCaptainRatings(storedRatings);
        } catch (err) {
            console.error("Error parsing localStorage data:", err);
            setRides([]);
            setCaptainRatings({});
        }
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.setItem('rides', JSON.stringify(rides));
            localStorage.setItem('captainRatings', JSON.stringify(captainRatings));
        }, 300); // Debounce for 300ms

        return () => clearTimeout(timeoutId);
    }, [rides, captainRatings]);

    const addRide = (ride) => setRides((prev) => [...prev, ride]);

    const removeActiveRide = () => setRides((prev) => prev.slice(1)); // Removes first ride

    const addRating = (captainName, rating) => {
        setCaptainRatings((prev) => {
            const currentData = prev[captainName] || { totalRating: 0, count: 0 };
            return {
                ...prev,
                [captainName]: {
                    totalRating: currentData.totalRating + rating,
                    count: currentData.count + 1,
                },
            };
        });
    };

    return (
        <RideHistoryContext.Provider 
            value={{ 
                rides: rides || [], 
                addRide, 
                removeActiveRide, 
                captainRatings: captainRatings || {}, 
                addRating 
            }}
        >
            {children}
        </RideHistoryContext.Provider>
    );
};

export default RideDataContextProvider;

*/