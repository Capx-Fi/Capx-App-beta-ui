import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

export const useFirebaseForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const forgotPassword = async (email) => {
    try {
      setIsCompleted(false);
      setIsPending(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
      setIsPending(false);
      setIsCompleted(true);
    } catch (error) {
      setIsPending(false);
      setIsCompleted(false);
      setError(error);
    }
  };

  return { error, isPending, forgotPassword, isCompleted };
};
