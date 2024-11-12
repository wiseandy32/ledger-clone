// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoGRp53axNiD5ImlQaZTQh1L68tPjlFWA",
  authDomain: "ledger-d2e3d.firebaseapp.com",
  projectId: "ledger-d2e3d",
  storageBucket: "ledger-d2e3d.firebasestorage.app",
  messagingSenderId: "610950432413",
  appId: "1:610950432413:web:0f11bbf095a4cf12adb674",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
