import { async } from "@firebase/util";
import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

const useFirebaseResetPassword = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const resetPassword = async (oobCode, newPassword) => {
    try {
      setIsPending(true);
      setError(null);
      await confirmPasswordReset(auth, oobCode, newPassword);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      setError(error);
    }
  };

  return { error, isPending, resetPassword };
};

export default useFirebaseResetPassword;
