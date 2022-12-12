import { initializeApp } from "firebase/app";
import { config } from "./config";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const app = initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

const storage = getStorage();

//init auth
const auth = getAuth();

export { db, auth, storage };
