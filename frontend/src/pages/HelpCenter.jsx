import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMailBulk, FaPhone } from 'react-icons/fa'; // Correct import for all icons

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
      
      <div className="w-full flex justify-between items-center mb-6">
        <Link to="/home" className="text-2xl text-gray-800 hover:text-blue-800">
          <FaHome />
        </Link>
        <h2 className="text-3xl font-semibold text-center text-gray-800">Help Center</h2>
        <div className="w-8" /> 
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <div className="space-y-6">
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">How can we help you?</h3>
            <p className="text-lg text-gray-600">
              If you have any questions or issues, we are here to assist you. Please explore the following resources:
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Frequently Asked Questions</h3>
            <ul className="space-y-4">
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <strong>How do I book a ride?</strong>
                <p className="text-gray-700">
                  To book a ride, open the app and enter your pick-up and drop-off locations. Once entered, you'll see available ride options. Choose your preferred ride and confirm your booking.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <strong>What payment methods are accepted?</strong>
                <p className="text-gray-700">
                  We accept a variety of payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and some local payment methods depending on your region.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <strong>How do I contact support?</strong>
                <p className="text-gray-700">
                  You can contact support directly from the app. Go to the menu, select "Help Center," and choose the "Contact Support" option. Alternatively, you can email us at support@uberclone.com.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <strong>Can I rate my driver?</strong>
                <p className="text-gray-700">
                  Yes! After each ride, you can rate your driver from 1 to 5 stars and provide feedback to help us improve our service.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <strong>How do I cancel my ride?</strong>
                <p className="text-gray-700">
                  To cancel a ride, go to the "Active Ride" section and select the "Cancel Ride" button. Cancellation fees may apply depending on the timing.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Need Further Assistance?</h3>
            <p className="text-lg text-gray-600">
              If your issue is not covered in the FAQs, you can reach out to our support team for further assistance.
            </p>

            <p className="text-lg text-gray-600 mt-4">
              You can contact us through the following methods:
            </p>

            
            <div className="flex items-center mt-4">
              <FaMailBulk className="h-6 w-6 text-gray-600 mr-2" />
              <a href="mailto:support@uberclone.com" className="text-lg text-blue-600 hover:text-blue-800">
                support@uberclone.com
              </a>
            </div>

            <div className="flex items-center mt-4">
              <FaPhone className="h-6 w-6 text-gray-600 mr-2" />
              <a href="tel:+1234567890" className="text-lg text-blue-600 hover:text-blue-800">
                +1 (234) 567-890
              </a>
            </div>

           
            <div className="flex items-center space-x-6 mt-4">
              <a href="https://www.facebook.com/uberclone" className="text-gray-600 hover:text-blue-800">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/uberclone" className="text-gray-600 hover:text-blue-800">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/uberclone" className="text-gray-600 hover:text-blue-800">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/company/uberclone" className="text-gray-600 hover:text-blue-800">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;


