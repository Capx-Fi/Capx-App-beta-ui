import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInAnonymously
} from "firebase/auth";
import axios from "axios";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao",
  authDomain: "firestore-app-f637c.firebaseapp.com",
  projectId: "firestore-app-f637c",
  storageBucket: "firestore-app-f637c.appspot.com",
  messagingSenderId: "448546221885",
  appId: "1:448546221885:web:2d7e8e4a1c1d5d61351f54"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const provider = new GoogleAuthProvider(auth);
// const db = getFirestore();

// console.log(db);

export default function App() {
  // const handleLogin = async () => {
  //   // getting user details here from firebaseAuth
  //   const { user: userDetails } = await signInWithPopup(auth, provider);
  //   const idtoken = await userDetails.getIdToken();
  //   // checking user existance in db

  //   console.log(userDetails.uid);
  //   const isUserExists = await axios.post(
  //     "https://firestore.googleapis.com/v1/projects/firestore-app-f637c/databases/(default)/documents:runQuery?key=AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao",
  //     {
  //       structuredQuery: {
  //         from: [{ collectionId: "users" }],
  //         where: {
  //           fieldFilter: {
  //             field: { fieldPath: "email" },
  //             op: "EQUAL",
  //             value: { stringValue: userDetails.email },
  //           },
  //         },
  //       },
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + idtoken,
  //       },
  //     }
  //   );

  //   if (!isUserExists.data[0].document) {
  //     const writeResponse = await axios.post(
  //       `https://firestore.googleapis.com/v1/projects/firestore-app-f637c/databases/(default)/documents/users?key=AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao&documentId=${userDetails.uid}`,
  //       {
  //         fields: {
  //           name: { stringValue: userDetails.displayName },
  //           email: { stringValue: userDetails.email },
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + idtoken, //the token is a variable which holds the token
  //         },
  //       }
  //     );
  //     console.log("wrote user data");
  //   } else {
  //     console.log("user already exist");
  //   }

  //   // const data = await axios.get(
  //   //   "https://content-firestore.googleapis.com/v1/projects/firestore-app-f637c/databases/(default)/documents/users?key=AIzaSyCw6h_oHvYbIAuJ76PtjvctKm1e8vqnUao",
  //   //   {
  //   //     headers: {
  //   //       Authorization: `Bearer ${userDetails.accessToken}"`,
  //   //     },
  //   //   }
  //   // );

  //   // console.log(data);
  // };

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("sucess");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const connectWallet = async() => {
    if(!window.ethereum) {
      alert("Please install Metamask");
    } else {

    }
  }
  
  const handleLoginAnonymous = async () => {

    signInAnonymously(auth)
      .then(async() => {
        console.log(await auth.currentUser.getIdToken());
      })
      .catch((err) => {
        console.log("Error", err.message);
      })
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWallet}>Sign-In</button>
        {/* <button onClick={handleLogin}>google</button> */}
        <button onClick={signout}>Signout</button>
      </header>
    </div>
  );
}
