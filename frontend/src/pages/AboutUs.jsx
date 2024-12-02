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
              Welcome to our Uber clone platform! This project is a testament to our commitment to innovation, teamwork, and technological excellence. 
              We are Swabhi Singh and Sanchay Kumar, students of B.Tech in Electronics and Communication Engineering at GB Pant DSEU Okhla-1 Campus.
              Together, we have crafted this ride-sharing application that combines modern technologies to deliver a seamless and efficient experience for users.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">What We Built</h3>
            <p className="text-lg text-gray-600">
              This Uber clone is designed with a robust architecture:
              <ul className="list-disc ml-5">
                <li>
                  <span className="font-semibold">Frontend:</span> Developed by <span className="text-blue-600" href ="https://github.com/swabhi16s">Swabhi Singh</span>, 
                  utilizing React, Vite, and Tailwind CSS for a responsive and dynamic user interface.
                </li>
                <li>
                  <span className="font-semibold">Backend:</span> Engineered by <span className="text-blue-600" href="https://github.com/santron1">Sanchay Kumar</span>, 
                  leveraging Node.js, Express.js, and Socket.IO for efficient API handling and real-time data communication.
                </li>
              </ul>
              The integration of Postman for API testing and JWT for secure authentication ensures the platform's reliability and safety.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Core Features</h3>
            <p className="text-lg text-gray-600">
              Our platform offers:
              <ul className="list-disc ml-5">
                <li>User registration, login, and profile management with secure JWT-based authentication.</li>
                <li>Ride creation and fare estimation features using real-time APIs.</li>
                <li>Driver registration, vehicle management, and ride monitoring for captains.</li>
                <li>Advanced mapping features for route suggestions, distance-time calculations, and coordinate retrieval.</li>
              </ul>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Technologies Used</h3>
            <p className="text-lg text-gray-600">
              The project employs cutting-edge technologies such as React with Vite for a blazing-fast development experience, and Tailwind CSS for streamlined styling. 
              The backend API is powered by Node.js and Express.js, with endpoints meticulously documented and tested using Postman. Socket.IO facilitates real-time communication, enhancing user interactions on the platform.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-lg text-gray-600">
            Our vision is to drive innovation by developing advanced applications and deepening our understanding of web development and emerging technologies. Looking ahead, we plan to enhance our platform with exciting features such as an AI-powered chatbot and a comprehensive dashboard for captains, ensuring a more seamless and intelligent user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
