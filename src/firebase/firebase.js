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
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import config from "../config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

export const firebaseConfig = {
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
    console.log(userDetails.uid);

    return userDetails;
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

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  const [firebaseUser, setFirebaseUser] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        console.log(user);
        const userDoc = doc(db, "users", auth.currentUser?.uid);
        const docSnap = await getDoc(userDoc);
        console.log(docSnap.data());
        if (docSnap.exists()) {
          setCurrentUser(docSnap.data());
          dispatch(setUser(docSnap.data()));
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      }
    });

    return unsub;
  }, []);
  return currentUser;
}
