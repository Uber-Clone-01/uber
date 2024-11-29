import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA1L3Jhd3BpeGVsX29mZmljZV8zMF9hZXN0aGV0aWNfd2FsbHBhcGVyX2xvd19hbmdsZV9pbWFnZV9vZl9hX21pbl83NmY0MTFlYS05YmZjLTQyYjMtYTE2Yi02MDhmYjA1NmUwNmRfMS5qcGc.jpg')",
      }}
      className="bg-cover bg-bottom h-screen pt-8 flex justify-between flex-col w-full"
    >
      <img
        className="w-16 ml-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="bg-white pb-7 py-4 px-4">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link to='/login'className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
