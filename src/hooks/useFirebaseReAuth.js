import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";

export default function useFirebaseReAuth(fetchUpdatedData) {
  const [isPending, setIsPending] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    setIsPending(true);
    const unsub = onAuthStateChanged(auth, async (user) => {
      //dispatch auth is ready redux change
      if (user) {
        setAccessToken(user.accessToken);
        setIsPending(false);
      } else {
        setIsPending(false);
      }
    });
    unsub();
  }, [fetchUpdatedData]);

  return { accessToken: accessToken, isPending: isPending };
}
