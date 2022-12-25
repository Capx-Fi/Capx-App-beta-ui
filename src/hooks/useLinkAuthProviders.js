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
  const user = auth.currentUser;

  const linkWithSocail = async (method) => {
    if (method) {
      setError(null);
      setIsPending(true);

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
        await linkWithPopup(user, provider);
      } catch (error) {
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
        await unlink(user, provider);
      } catch (error) {
        setError(error);
      }
      setLinkDone(true);
      setIsPending(false);
    } else {
      setError("No Social selected");
      setIsPending(false);
    }
  };

  return { linkWithSocail,unlinkWithSocail, error, isPending, linkDone };
};
