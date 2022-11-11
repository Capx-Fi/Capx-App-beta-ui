import axios from "axios";
import { signInWithPopup, signOut } from "firebase/auth";
import React from "react";
import {
  auth,
  facebookLoginProvider,
  googleLoginProvider,
  twitterLoginProvider,
} from "../../firebase/firebase";

const Login = () => {
  const handleLogin = async (method) => {
    try {
      const { user: userDetails } = await signInWithPopup(auth, method);
      const idtoken = await userDetails.getIdToken();
      console.log(userDetails);
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

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            handleLogin(googleLoginProvider);
          }}
        >
          google
        </button>
        <button
          onClick={() => {
            handleLogin(twitterLoginProvider);
          }}
        >
          Twitter
        </button>
        <button
          onClick={() => {
            handleLogin(facebookLoginProvider);
          }}
        >
          Facebook
        </button>
        <button onClick={signout}>Signout</button>
      </header>
      <main></main>
    </div>
  );
};

export default Login;
