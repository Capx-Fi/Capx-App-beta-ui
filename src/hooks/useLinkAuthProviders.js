import {
  GoogleAuthProvider,
  linkWithPopup,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase";

const useLinkAuthProviders = () => {
  const twitterProvider = new TwitterAuthProvider();
  const GoogleProvider = new GoogleAuthProvider();
  const user = auth.currentUser;

  const linkTwitter = () => {
    linkWithPopup(user, twitterProvider)
      .then((result) => {
        // Accounts successfully linked.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        console.log(credential);
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        // ...
      });
  };

  const linkGoogle = () => {
    linkWithPopup(user, GoogleProvider)
      .then((result) => {
        // Accounts successfully linked.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        // ...
      });
  };

  return { linkTwitter, linkGoogle };
};

export default useLinkAuthProviders;
