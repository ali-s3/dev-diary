import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9CQxFTrAEH8qNK0qkM5loWQa9TuPoTH0",
  authDomain: "devdiary-72539.firebaseapp.com",
  projectId: "devdiary-72539",
  storageBucket: "devdiary-72539.firebasestorage.app",
  messagingSenderId: "788082147117",
  appId: "1:788082147117:web:bcfd0e255bc3b878a55da4",
  measurementId: "G-SS6VCWSLV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };