import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);
    const [ride, setRide] = useState(null);

    
    const mockRideData = {
        _id: 'ride123',
        passengerName: 'John Doe',
        pickupLocation: '123 Main Street',
        dropoffLocation: '456 Elm Street',
    };

    
    const handleNewRide = () => {
        setRide(mockRideData);
        setRidePopupPanel(true);
    };

    const confirmRide = () => {
        
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
    };

    
    useGSAP(() => {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [ridePopupPanel]);

    
    useGSAP(() => {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [confirmRidePopupPanel]);

    return (
        <div className="h-screen">
            
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img
                    className="w-16"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                />
                <Link
                    to="/captain-home"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            
            <div className="h-3/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Captain Background"
                />
            </div>

            
            <div className="h-2/5 p-6">
                <CaptainDetails />
                <button
                    onClick={handleNewRide}
                    className="bg-black text-white px-4 py-2 rounded-lg mt-3"
                >
                    Simulate New Ride
                </button>
            </div>

          
            <div
                ref={ridePopupPanelRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            
            <div
                ref={confirmRidePopupPanelRef}
                className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    );
};

export default CaptainHome;
