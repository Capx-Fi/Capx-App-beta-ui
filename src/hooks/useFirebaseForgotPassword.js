import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

export const useFirebaseForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const forgotPassword = async (email) => {
    try {
      setIsPending(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      setError(error);
    }
  };

  return { error, isPending, forgotPassword };
};
