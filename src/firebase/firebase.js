import axios from "axios";
import { initializeApp } from "firebase/app";
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
};

const app = initializeApp(firebaseConfig);

export const handleFirebaseLogin = async (method) => {
  try {
    const { user: userDetails } = await signInWithPopup(auth, method);
    const idtoken = await userDetails.getIdToken();
    const isUserExists = await axios.post(
      `${config.APIEndpoint}/documents:runQuery?key=AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao`,
      {
        structuredQuery: {
          from: [{ collectionId: "users" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "email" },
              op: "EQUAL",
              value: { stringValue: userDetails.email },
            },
          },
        },
      },
      {
        headers: {
          Authorization: "Bearer " + idtoken,
        },
      }
    );

    if (!isUserExists.data[0].document) {
      const writeResponse = await axios.post(
        `${config.APIEndpoint}/documents/users?key=AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao&documentId=${userDetails.uid}`,
        {
          fields: {
            name: { stringValue: userDetails.displayName },
            email: { stringValue: userDetails.email },
          },
        },
        {
          headers: {
            Authorization: "Bearer " + idtoken, //the token is a variable which holds the token
          },
        }
      );
      console.log("wrote user data");
    } else {
      console.log("user already exist");
    }
  } catch (err) {
    console.log(err.message);
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
