import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa"; // Import Home icon from react-icons
import { Link } from "react-router-dom"; // Import Link for navigation

const Settings = () => {
  const [captainData, setCaptainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    vehicleColor: "",
    vehicleType: "",
    vehiclePlate: "",
    vehicleCapacity: "",
    currentPassword: "",
  });

  useEffect(() => {
    const fetchCaptainDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found.");
          return;
        }

        const response = await fetch("https://uber-clone-backend-t531.onrender.com/captains/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.captain) {
          setCaptainData(data.captain);
          setFormData({
            firstname: data.captain.fullname.firstname,
            lastname: data.captain.fullname.lastname,
            email: data.captain.email,
            vehicleColor: data.captain.vehicle.color,
            vehicleType: data.captain.vehicle.vehicleType,
            vehiclePlate: data.captain.vehicle.plate,
            vehicleCapacity: data.captain.vehicle.capacity,
            currentPassword: "",
          });
        } else {
          setError("No captain data returned.");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCaptainDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setError(null);
    setIsUpdating(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found.");
        return;
      }

      const response = await fetch("https://uber-clone-backend-t531.onrender.com/captains/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          fullname: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          vehicle: {
            color: formData.vehicleColor,
            plate: formData.vehiclePlate,
            capacity: parseInt(formData.vehicleCapacity) || 0,
            vehicleType: formData.vehicleType,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const updatedData = await response.json();
      setCaptainData(updatedData.captain);
      setSuccessMessage("Details updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(`Error updating details: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 relative">
      {/* Home button with Link and icon */}
      <Link
  to="/captain-home" // Using the Link component to navigate to Captain's home
  className="absolute top-5 right-5 flex items-center space-x-2 text-gray-800 hover:text-blue-600"
>
  <FaHome className="text-3xl" />

</Link>


      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h1>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Vehicle Color</label>
            <input
              type="text"
              name="vehicleColor"
              value={formData.vehicleColor}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Vehicle Plate</label>
            <input
              type="text"
              name="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Vehicle Capacity</label>
            <input
              type="number"
              name="vehicleCapacity"
              value={formData.vehicleCapacity}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-6 text-white font-medium rounded-lg shadow-md ${isUpdating ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"}`}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Details"}
        </button>
      </form>
    </div>
  );
};

export default Settings;

