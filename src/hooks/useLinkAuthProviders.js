import { async } from "@firebase/util";
import {
  getRedirectResult,
  GoogleAuthProvider,
  linkWithPopup,
  linkWithRedirect,
  TwitterAuthProvider,
  unlink,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

export const useLinkAuthProviders = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [linkDone, setLinkDone] = useState(false);
  const [useAccessToken, setUseActionToken] = useState(null);
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
        const tokenDetails = await auth.currentUser.getIdTokenResult();
        if (method.toUpperCase() === "TWITTER") {
          if (!tokenDetails.claims?.firebase.identities["twitter.com"]) {
            await linkWithRedirect(user, provider);
          } else if (!useAccessToken) {
            console.log("Token", tokenDetails.token);
            setUseActionToken(tokenDetails.token);
          }
        } else {
          if (!tokenDetails.claims?.firebase.identities["google.com"]) {
            await linkWithRedirect(user, provider);
          } else if (!useAccessToken) {
            console.log("Token", tokenDetails.token);
            setUseActionToken(tokenDetails.token);
          }
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

  const getLinkResult = async () => {
    setIsPending(true);
    setError(null);
    try {
      const userdata = await getRedirectResult(auth);
      console.log(userdata);
      if (userdata && userdata.user) {
        setUseActionToken(userdata.user.accessToken);
      }
    } catch (error) {
      console.log(error);

      setError(error);
    }
    setIsPending(false);
  };

  return {
    linkWithSocail,
    unlinkWithSocail,
    useAccessToken,
    error,
    isPending,
    linkDone,
    getLinkResult,
  };
};
