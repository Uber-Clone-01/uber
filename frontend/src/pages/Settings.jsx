import React, { useState, useEffect } from "react";

const Settings = () => {
  const [captainData, setCaptainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
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

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found.");
        return;
      }

      const response = await fetch("http://localhost:4000/captains/update", {
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
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Settings</h1>
      {successMessage && <div className="success">{successMessage}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Vehicle Color:</label>
          <input
            type="text"
            name="vehicleColor"
            value={formData.vehicleColor}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Vehicle Plate:</label>
          <input
            type="text"
            name="vehiclePlate"
            value={formData.vehiclePlate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Vehicle Capacity:</label>
          <input
            type="number"
            name="vehicleCapacity"
            value={formData.vehicleCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Details</button>
      </form>
    </div>
  );
};

export default Settings;
