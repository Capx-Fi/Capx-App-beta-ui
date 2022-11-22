import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "./firebase/firebase";
import { useAuth } from "./firebase/firebase";

import Routes from "./routes";

export default function App() {
  const currentUser = useAuth();
  console.log(currentUser);
  return (
    <BrowserRouter>
      {currentUser !== undefined && <Routes isloggedIn={!!currentUser} />}
      {/* <Routes isloggedIn={!!currentUser} /> */}
    </BrowserRouter>
  );
}
