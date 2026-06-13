// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAlGPoXZSo6Ti9r2GfUmUOQYw8xnCnbHg",
  authDomain: "chatbee-3ea23.firebaseapp.com",
  projectId: "chatbee-3ea23",
  storageBucket: "chatbee-3ea23.firebasestorage.app",
  messagingSenderId: "648134838106",
  appId: "1:648134838106:web:f64827f9625ec0d8641563",
  measurementId: "G-RQKB498451",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
