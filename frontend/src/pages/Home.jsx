import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/socketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { FaBars ,FaInfoCircle, FaLifeRing, FaSignOutAlt,FaComments} from 'react-icons/fa';
import { UserLogout } from './UserLogout';


const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null);

    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    useEffect(() => {
        socket.emit('join', { userType: 'user', userId: user._id });
    }, [user]);

    socket.on('ride-confirmed', (ride) => {
        setVehicleFound(false);
        setWaitingForDriver(true);
        setRide(ride);
    });

    socket.on('ride-started', (ride) => {
        //console.log('ride');
        setWaitingForDriver(false);
        navigate('/riding', { state: { ride } }); // Updated navigate to include ride data
    });

    const handlePickupChange = async (e) => {
        setPickup(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPickupSuggestions(response.data);
        } catch {
            // handle error
        }
    };

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setDestinationSuggestions(response.data);
        } catch {
            // handle error
        }
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null); // Reference to the menu
    const iconRef = useRef(null); // Reference to the menu icon

    // Toggle the menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close the menu if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                iconRef.current &&
                !iconRef.current.contains(event.target)
            ) {
                setMenuOpen(false); // Close the menu if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            });
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            });
        }
    }, [panelOpen]);

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [vehiclePanel]);

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [confirmRidePanel]);

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [vehicleFound]);

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [waitingForDriver]);


    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)


    }

    async function createRide() {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/create`,
            {
                pickup,
                destination,
                vehicleType,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
    }

    return (
        <div className="h-screen relative overflow-hidden">
            <button
                onClick={toggleMenu}
                className="text-3xl text-white-800 p-3 rounded-md absolute top-5 right-5 z-50 md:hidden"
                ref={iconRef}
            >
                <FaBars />
            </button>

            {/* Sidebar Menu */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 top-0 w-64 h-full bg-black bg-opacity-10 text-white p-4 z-40 backdrop-blur-lg"
                >
                    
                    <ul className="mt-6">
                    <li className="mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-white-800 text-2xl" />
                 <Link to="/about-us" onClick={() => setMenuOpen(false)} className="text-white-800 text-lg hover:text-gray-900 transition duration-300">
                 About Us
                  </Link>
                  </li>

        {/* Help Center */}
        <li className="mb-4 flex items-center">
        <FaLifeRing className="mr-2 text-white-800 text-2xl" />
       <Link to="/help-center" onClick={() => setMenuOpen(false)} className="text-white-800 text-lg hover:text-gray-900 transition duration-300">
         Help Center
        </Link>
        </li>

        {/* Chat with Us */}
<li className="mb-4 flex items-center">
  <FaComments className="mr-2 text-white-800 text-2xl" />
  <Link
    to="/chatbot"
    onClick={() => setMenuOpen(false)}
    className="text-white-800 text-lg hover:text-gray-900 transition duration-300"
  >
    Chat with Us
  </Link>
</li>
{/*
<li className="mb-4 flex items-center">
  <FaComments className="mr-2 text-white-800 text-2xl" />
  <Link
    to="/user-active-ride"
    onClick={() => setMenuOpen(false)}
    className="text-white-800 text-lg hover:text-gray-900 transition duration-300"
  >
    Current Ride
  </Link>
</li>
*/}
  
{/* Logout  */}
        <div className="flex items-center">
            <FaSignOutAlt className="mr-2 text-white-800 text-2xl" />
            <UserLogout />
        </div>

                    </ul>
                </div>
            )}

            <img
                className="w-16 absolute left-5 top-5"
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt=""
            />
            <div className="h-screen w-screen">
                {/* image for temporary use */}
                <LiveTracking/>
            </div>
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className="absolute opacity-0 right-6 top-6 text-2xl"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form className="relative py-3" onSubmit={(e) => submitHandler(e)}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('pickup');
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                            type="text"
                            placeholder="Add a pick-up location"
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('destination');
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
                    >
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className="bg-white h-0">
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>

            {/* Vehicle Panel */}
            <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            {/* Confirm Ride Panel */}
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* Vehicle Found Panel */}
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* Waiting For Driver Panel */}
            <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12">
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    );
};

export default Home;