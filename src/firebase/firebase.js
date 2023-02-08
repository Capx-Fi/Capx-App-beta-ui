import { initializeApp } from "firebase/app";
import { config } from "../config.js";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


//initialize firebase config
const firebaseConfig = {
  apiKey: config.APIKey,
  authDomain: config.AuthDomain,
  storageBucket: config.storageBucket,
  projectId: config.ProjectId,
  messagingSenderId: config.MessagingSenderId,
  appId: config.AppId,
  measurementId: config.MeasurementId,
};

//init firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

const storage = getStorage();

//init auth
const auth = getAuth();

const analytics = getAnalytics();

export { db, auth, storage, analytics };
