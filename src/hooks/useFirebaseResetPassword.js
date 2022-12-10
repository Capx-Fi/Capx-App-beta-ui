import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

export const useFirebaseResetPassword = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const resetPassword = async (oobCode, newPassword) => {
    setIsPending(true);
    setError(null);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
    } catch (error) {
      setError(error);
    }
    setIsPending(false);
  };

  return { error, isPending, resetPassword };
};
