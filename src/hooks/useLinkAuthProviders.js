import {
  GoogleAuthProvider,
  linkWithPopup,
  TwitterAuthProvider,
  unlink
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

export const useLinkAuthProviders = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [linkDone,setLinkDone] = useState(false);
  const [useAccessToken, setUseActionToken] = useState(null)
  const user = auth.currentUser;

  const linkWithSocail = async (method) => {
    if (method) {
      setError(null);
      setIsPending(true);
      setUseActionToken(null);
      let provider = null;
      switch (method.toUpperCase()) {
        case "GOOGLE": {
          provider = new GoogleAuthProvider();
          break;
        }
        case "TWITTER": {
          provider = new TwitterAuthProvider();
          break;
        }
        default: {
          provider = new GoogleAuthProvider();
        }
      }

      try {
       const userdata =  await linkWithPopup(user, provider);
       if(userdata && userdata.user){  
        setUseActionToken(userdata.user.accessToken);
       }
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLinkDone(true);
      setIsPending(false);
    } else {
      setError("No Social selected");
      setIsPending(false);
    }
  };

  const unlinkWithSocail = async (method) => {
    if (method) {
      setError(null);
      setIsPending(true);
      setUseActionToken(null);
      let provider = null;
      switch (method.toUpperCase()) {
        case "GOOGLE": {
          provider = new GoogleAuthProvider();
          break;
        }
        case "TWITTER": {
          provider = new TwitterAuthProvider();
          break;
        }
        default: {
          provider = new GoogleAuthProvider();
        }
      }

      try {
        await unlink(user, provider.providerId);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLinkDone(true);
      setIsPending(false);
    } else {
      setError("No Social selected");
      setIsPending(false);
    }
  };

  return { linkWithSocail,unlinkWithSocail,useAccessToken, error, isPending, linkDone };
};
