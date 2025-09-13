import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHw02aWGftVR8yCJe1zfTwqeE5-ZBbwEw",
    authDomain: "nullpoint-19578.firebaseapp.com",
    projectId: "nullpoint-19578",
    storageBucket: "nullpoint-19578.firebasestorage.app",
    messagingSenderId: "283009711654",
    appId: "1:283009711654:web:b82fc0ea816dcad8ce70e7",
    measurementId: "G-57G7QL5LPM"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
