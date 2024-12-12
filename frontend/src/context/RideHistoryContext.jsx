import React, { createContext, useState } from 'react';

export const RideHistoryContext = createContext();

const RideHistoryProvider = ({ children }) => {
    const [rideHistory, setRideHistory] = useState([]);

    const addTripToHistory = (trip) => {
        setRideHistory((prevHistory) => [...prevHistory, trip]);
    };

    const deleteTripFromHistory = (index) => {
        setRideHistory((prevHistory) =>
            prevHistory.filter((_, i) => i !== index)
        );
    };

    return (
        <RideHistoryContext.Provider
            value={{
                rideHistory,
                addTripToHistory,
                deleteTripFromHistory,
            }}
        >
            {children}
        </RideHistoryContext.Provider>
    );
};

export default RideHistoryProvider;

