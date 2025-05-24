// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsP3xxJe46mXXhTmc_DPrJg8CPnTfGfUM",
  authDomain: "stockmanagement-e9be1.firebaseapp.com",
  projectId: "stockmanagement-e9be1",
  storageBucket: "stockmanagement-e9be1.firebasestorage.app",
  messagingSenderId: "746927507281",
  appId: "1:746927507281:web:9ebb23fa498a9046afb570",
  measurementId: "G-CLE1RKLK61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth, analytics };