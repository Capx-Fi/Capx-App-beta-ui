import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../store/slices/authSlice";
import { analytics } from "../firebase/firebase";
import { logEvent,setUserProperties } from "firebase/analytics";

export const useFirebaseSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const signupUsingEmail = async (email, password) => {
    setError(null);
    setIsPending(true);
    setIsSuccess(false);
    logEvent(analytics, 'SIGNUP_ATTEMPT_EMAIL' , {email})
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!response) {
        throw new Error("Could not complete signup");
      }
      setUserProperties(analytics, {userId :response.user.uid })
      logEvent(analytics, 'SIGNUP_SUCCESS_EMAIL' , {email,user:response.user.uid,newUser:false})
      dispatch(
        setLoggedInUser({ user: response.user, isUserProfileSet: false })
      );
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        setIsSuccess(true);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
        setIsSuccess(false);
      }
    }
  };

  return {
    _error: error,
    _isPending: isPending,
    signupUsingEmail: signupUsingEmail,
    _isSuccess: isSuccess,
  };
};
