// Profile.jsx
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Load user details from localStorage (set at login)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleRetakeTest = () => {
    alert("Redirecting to Aptitude Test...");
    // Example: window.location.href = "/aptitude-test";
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No user data found. Please login first.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-12 font-sans">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
        {/* Profile Image */}
        <img
          src={user.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
        />

        {/* User Info */}
        <h2 className="text-xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.qualification}</p>

        {/* Courses */}
        {user.courses && (
          <div className="mt-3">
            <p className="font-semibold">Courses:</p>
            <ul className="text-gray-700">
              {user.courses.map((course, index) => (
                <li key={index}>📘 {course}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Retake Button */}
        <button
          onClick={handleRetakeTest}
          className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Retake Aptitude Test
        </button>
      </div>
    </div>
  );
};

export default Profile;
