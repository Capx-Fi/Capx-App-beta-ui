import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "./firebase/firebase";

import Routes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
