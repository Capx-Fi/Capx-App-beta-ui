// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtAptKjErKi7DyKOBTvvmP9cRXBg-FWog",
  authDomain: "capx-x-web3auth.firebaseapp.com",
  projectId: "capx-x-web3auth",
  storageBucket: "capx-x-web3auth.appspot.com",
  messagingSenderId: "991366839944",
  appId: "1:991366839944:web:0223a49d20fdd5bbe6693d",
  measurementId: "G-B91G4H2ZPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
export const auth = getAuth()