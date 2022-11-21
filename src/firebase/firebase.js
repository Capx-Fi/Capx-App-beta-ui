import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import "firebase/functions";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "../config";

const firebaseConfig = {
  apiKey: config.APIKey,
  authDomain: config.AuthDomain,
  storageBucket: config.storageBucket,
  projectId: config.ProjectId,
  messagingSenderId: config.MessagingSenderId,
  appId: config.AppId,
  measurementId: config.MeasurementId,
};

const app = initializeApp(firebaseConfig);

export const handleFirebaseLogin = async (method) => {
  try {
    const { user: userDetails } = await signInWithPopup(auth, method);
    const idtoken = await userDetails.getIdToken();
    console.log(idtoken);

    const name = userDetails.displayName;
    const email = userDetails.email;
    return { name, email };
  } catch (err) {
    console.log(err);
  }
};

export const signupWithEmail = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  console.log(response);
};

export const handleFirebaseSignout = () => {
  signOut(auth)
    .then(() => {
      console.log("sucess");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleLoginProvider = new GoogleAuthProvider(auth);
export const twitterLoginProvider = new TwitterAuthProvider(auth);
export const facebookLoginProvider = new FacebookAuthProvider(auth);
