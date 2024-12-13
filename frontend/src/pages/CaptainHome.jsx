import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SocketContext } from '../context/socketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { FaTachometerAlt, FaComments } from 'react-icons/fa';
import ChatBotPopUp from '../components/ChatBotPopUp'; 

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const [chatPopup, setChatPopup] = useState(false); // ChatBot visibility state

    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);

    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain',
        });
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    });
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        return () => clearInterval(locationInterval);
    }, [captain._id, socket]);

    socket.on('new-ride', (data) => {
        setRide(data);
        setRidePopupPanel(true);
    });

    async function confirmRide() {
        await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
            {

                rideId: ride._id,
                captainId: captain._id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
    }

    useGSAP(
        function () {
            if (ridePopupPanel) {
                gsap.to(ridePopupPanelRef.current, {
                    transform: 'translateY(0)',
                });
            } else {
                gsap.to(ridePopupPanelRef.current, {
                    transform: 'translateY(100%)',
                });
            }
        },
        [ridePopupPanel]
    );

    useGSAP(
        function () {
            if (confirmRidePopupPanel) {
                gsap.to(confirmRidePopupPanelRef.current, {
                    transform: 'translateY(0)',
                });
            } else {
                gsap.to(confirmRidePopupPanelRef.current, {
                    transform: 'translateY(100%)',
                });
            }
        },
        [confirmRidePopupPanel]
    );

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img
                    className='w-16'
                    src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
                    alt=''
                />
                <Link
                    to='/captain-home'
                    className='h-10 w-10 bg-white flex items-center justify-center rounded-full'
                >
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </Link>
                <Link to='/dashboard' className='text-xl text-gray-800 hover:text-blue-800'>
                    <FaTachometerAlt className='inline-block mr-2' />
                </Link>
            </div>
            <div className='h-3/5'>
                <img
                    className='h-full w-full object-cover'
                    src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'
                    alt=''
                />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div
                ref={ridePopupPanelRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
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
                className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
            >
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
            {chatPopup && (
                <div className='fixed bottom-0 right-0 w-full md:w-1/3 h-2/3 bg-white shadow-lg rounded-t-lg z-20'>
                    <ChatBotPopUp /> {/* Embedded ChatBot component */}
                    <button
                        onClick={() => setChatPopup(false)}
                        className='absolute top-2 right-2 text-red-500 text-xl'
                    >
                        &times;
                    </button>
                </div>
            )}
            <button
                onClick={() => setChatPopup(true)}
                className='fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600'
            >
                <FaComments className='text-xl' />
            </button>
        </div>
    );
};

export default CaptainHome;
