# Uber Clone

This project is a fully functional Uber-like application built with modern web technologies. It includes features such as user authentication, ride booking, real-time updates via sockets, and a driver/captain dashboard. Below is an overview of the project setup, features, and installation instructions.

---

## 🚀 Features

### User Features
- **User Authentication:** Sign up, log in, and log out.
- **Location Search:** Autocomplete for pick-up and destination addresses.
- **Ride Booking:** Choose vehicle type and confirm rides.
- **Live Tracking:** Real-time ride updates and location tracking.
- **Chat Support:** Integrated chatbot for user assistance.

### Captain (Driver) Features
- **Captain Authentication:** Log in and log out.
- **Ride Management:** View, accept, and start rides.
- **Live Tracking:** Update ride status and send location updates to the server.

---

## 🛠️ Tech Stack

### Frontend
- **React.js:** Component-based user interface.
- **Tailwind CSS:** Styling framework.
- **GSAP:** Animations.
- **Socket.IO:** Real-time communication for ride status and tracking.
- **React Router:** Navigation between pages.

### Backend
- **Node.js & Express:** Server-side logic and API endpoints.
- **MongoDB:** Database for storing user, ride, and vehicle information.
- **JWT:** Token-based authentication.
- **Socket.IO:** Real-time ride tracking and updates.

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/uber-clone.git
   cd uber-clone
   ```

2. **Install dependencies for both frontend and backend:**
   ```bash
   cd frontend
   npm install
   cd backend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory.
   - Add the following:
     ```env
     MONGO_URI=your-mongodb-uri
     JWT_SECRET=your-secret-key
     BASE_URL=http://localhost:5000
     ```
   - Create a `.env` file in the `frontend` directory.
   - Add the following:
     ```env
     VITE_BASE_URL=http://localhost:4000
     ```

4. **Start the development servers:**
   - For the backend:
     ```bash
     cd backend
     npx nodemon
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm run dev
     ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

---

## 📂 Folder Structure

### Frontend
- **`src/components`**: Reusable React components (e.g., `LocationSearchPanel`, `VehiclePanel`, `ConfirmRide`).
- **`src/pages`**: Main application pages (e.g., `Home`, `Login`, `CaptainDashboard`).
- **`src/context`**: Context API setup for user and captain state.

### Backend
- **`routes/`**: Express routes for user, captain, and ride management.
- **`models/`**: Mongoose schemas for User, Ride, and Vehicle.
- **`controllers/`**: Business logic for handling API requests.
- **`middlewares/`**: Authentication and error handling.

---

## 🔗 API Endpoints

### Authentication
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user.
- `GET /api/users/logout`: Log out a user.

### Rides
- `POST /api/rides/create`: Create a new ride.
- `GET /api/rides/get-fare`: Fetch fare estimate.
- `PATCH /api/rides/update-status`: Update ride status (e.g., started, completed).

### Captains
- `POST /api/captains/login`: Authenticate a captain.
- `GET /api/captains/logout`: Log out a captain.
- `GET /api/captains/rides`: Get available rides for a captain.

---

## ⚡ Real-Time Features

- **Socket.IO Integration:**
  - Join rooms for user and captain.
  - Emit events for ride confirmation, status updates, and live location tracking.

---

## 📜 Scripts

### Frontend
- `npm run dev`: Start the React development server.
- `npm run build`: Build the production-ready app.

### Backend
- `npm start`: Start the Node.js server.
- `npx nodemon`: Start the server in development mode using Nodemon.

---

## 🌟 Future Enhancements

- Add payment gateway integration.
- Implement push notifications.
- Enhance error handling and logging.
- Add multi-language support.

---


## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## 🙏 Acknowledgments

This project is inspired by Uber and is intended for educational purposes only.

