import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao",
  authDomain: "firestore-app-f637c.firebaseapp.com",
  projectId: "firestore-app-f637c",
  storageBucket: "firestore-app-f637c.appspot.com",
  messagingSenderId: "448546221885",
  appId: "1:448546221885:web:2d7e8e4a1c1d5d61351f54",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleLoginProvider = new GoogleAuthProvider(auth);
export const twitterLoginProvider = new TwitterAuthProvider(auth);
export const facebookLoginProvider = new FacebookAuthProvider(auth);
