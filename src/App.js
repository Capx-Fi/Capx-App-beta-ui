import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import axios from "axios";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao",
  authDomain: "firestore-app-f637c.firebaseapp.com",
  projectId: "firestore-app-f637c",
  storageBucket: "firestore-app-f637c.appspot.com",
  messagingSenderId: "448546221885",
  appId: "1:448546221885:web:2d7e8e4a1c1d5d61351f54",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(auth);
const twitterProvider = new TwitterAuthProvider(auth);
const db = getFirestore(app);

console.log(db);

export default function App() {
  const handleLogin = async (method) => {
    try {
      const { user: userDetails } = await signInWithPopup(auth, method);
      const idtoken = await userDetails.getIdToken();
      console.log(userDetails.uid);
      const isUserExists = await axios.post(
        "https://firestore.googleapis.com/v1/projects/firestore-app-f637c/databases/(default)/documents:runQuery?key=AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao",
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
          `https://firestore.googleapis.com/v1/projects/firestore-app-f637c/databases/(default)/documents/users?key=AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao&documentId=${userDetails.uid}`,
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

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("sucess");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getData = async () => {
      const getUsers = await getDocs(userCollectionRef);
      console.log(getUsers.docs[0].data());
    };
    getData();
  }, [userCollectionRef]);

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            handleLogin(googleProvider);
          }}
        >
          google
        </button>
        <button
          onClick={() => {
            handleLogin(twitterProvider);
          }}
        >
          Twitter
        </button>
        <button onClick={signout}>Signout</button>
      </header>
      <main></main>
    </div>
  );
}
