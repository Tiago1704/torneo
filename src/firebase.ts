// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUw0WkXWvuu9QI0auX3NENzALf5Ebn5Fk",
  authDomain: "lol-app-5ddb3.firebaseapp.com",
  projectId: "lol-app-5ddb3",
  storageBucket: "lol-app-5ddb3.appspot.com",
  messagingSenderId: "267630711918",
  appId: "1:267630711918:web:f4e9a6452ca24c87e6c27f",
  measurementId: "G-QYJTK9VQXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
console.log(analytics)