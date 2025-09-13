import React from "react";
import Login from "./Login";
import Dashboard from "./pages/dashboard"; 
import "./styles/dashboard.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import profileForm from "./profileForm";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data());
        else setProfile(null);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on whether profile exists
      if (profile) {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    }
    if(!user && !loading) {
      navigate("/login");
    }
  }, [loading, user, profile, navigate]);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = () => signOut(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div style={{ textAlign: "center", padding: 30 }}>
            <button onClick={login} style={{ fontSize: 18, padding: "10px 20px", cursor: "pointer" }}>
              Login with Google
            </button>
          </div>
        }
      />

      <Route
        path="/profile"
        element={user ? <ProfileForm user={user} setProfile={setProfile} logout={logout} /> : <div>Please login first</div>}
      />

      <Route
        path="/dashboard"
        element={user && profile ? <Dashboard profile={profile} logout={logout} /> : <div>Please login and complete profile first</div>}
      />

      {/* Redirect all unknown routes to login */}
      <Route path="*" element={<div>Page not found. Go to <a href="/login">Login</a></div>} />
    </Routes>
  );
}

export default App;


function App() {
  return (
    <div className="App">
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;
