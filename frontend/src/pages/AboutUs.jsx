import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
      
      <div className="w-full flex justify-between items-center mb-6">
        <Link to="/home" className="text-2xl text-gray-800 hover:text-blue-800">
          <FaHome />
        </Link>
        <h2 className="text-3xl font-semibold text-center text-gray-800">About Us</h2>
        <div className="w-8" />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <div className="space-y-6">
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Who We Are</h3>
            <p className="text-lg text-gray-600">
              Welcome to our Uber clone! We are a dynamic ride-sharing platform aimed at connecting passengers with drivers for a seamless travel experience. Our goal is to provide a reliable, safe, and affordable transportation service to everyone.
            </p>
          </div>

          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-lg text-gray-600">
              Our mission is to revolutionize the way people think about transportation. We aim to make commuting easier, quicker, and more comfortable for everyone, whether you're heading to work, running errands, or going on a trip.
            </p>
          </div>

          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Values</h3>
            <p className="text-lg text-gray-600">
              We are driven by a few core values that help guide our operations:
            </p>
            <ul className="list-disc pl-6 mt-2 text-lg text-gray-600">
              <li>Safety - We prioritize the safety of our passengers and drivers above all.</li>
              <li>Reliability - You can count on us to get you where you need to go, on time.</li>
              <li>Affordability - We offer competitive prices to ensure our service is accessible to everyone.</li>
              <li>Innovation - We continuously improve our services to meet your needs.</li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Story</h3>
            <p className="text-lg text-gray-600">
              We started as a small group of transportation enthusiasts who wanted to make commuting easier and more efficient. Over time, we've grown into a global platform, connecting millions of people to trusted drivers. Our journey has been fueled by a passion for innovation and service, and we look forward to continuing to evolve with our users.
            </p>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get In Touch</h3>
            <p className="text-lg text-gray-600">
              If you have any questions or would like to learn more about us, feel free to reach out. We would love to hear from you!
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

