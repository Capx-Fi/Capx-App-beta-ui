import { sendEmailVerification,applyActionCode } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

export const useFirebaseEmailVerification = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCompleted, setIsCompleted] = useState(null);

  const verifyEmail = async () => {
    try {
      setIsCompleted(false);
      setIsPending(true);
      setError(null);
      await sendEmailVerification(auth.currentUser);
      setIsPending(false);
      setIsCompleted(true);
    } catch (error) {
      setIsPending(false);
      setIsCompleted(false);
      setError(error);
    }
  };

  const verifyEmailCall = async (actionCode) => {
    try {
      setIsCompleted(false);
      setIsPending(true);
      setError(null);
      const resp  = await applyActionCode(auth,actionCode);
      setIsPending(false);
      setIsCompleted(true);
    } catch (error) {
      setIsPending(false);
      setIsCompleted(true);
      setError(error.message);
    }
  }

  return { error, isPending, verifyEmail, verifyEmailCall , isCompleted };
};