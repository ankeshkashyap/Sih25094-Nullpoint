// Signup.js
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    studentClass: "",
    interests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save student profile to Firestore
      await setDoc(doc(db, "students", user.uid), {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        class: formData.studentClass,
        interests: formData.interests.split(",").map((i) => i.trim()), // store as array
        email: formData.email,
      });

      alert("Signup successful! Profile saved.");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Student Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="gender"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="studentClass"
          placeholder="Class (10th / 12th / Graduation)"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="interests"
          placeholder="Academic Interests (comma separated)"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
