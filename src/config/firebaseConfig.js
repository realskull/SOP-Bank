// src/config/firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore functions

console.log(process.env)

const firebaseConfig = {
  apiKey: "AIzaSyCjvZz_jcL0mnScgXsEp6ekdo5ii8vstfs",
  authDomain: "sop-bank.firebaseapp.com",
  projectId: "sop-bank",
  storageBucket: "sop-bank.appspot.com",
  messagingSenderId: "565256660932",
  appId: "1:565256660932:web:1705dec7d66c112d6c6691",
  measurementId: "G-WS183XGFXC"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Initialize Firestore

export { auth, db}; // Export Auth, Firestore, and Functions
