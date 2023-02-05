import { useState } from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import { resetUser } from "../store/slices/userSlice";
import { resetQuestData } from "../store/slices/questSlice";
import { analytics } from "../firebase/firebase";
import { logEvent } from "firebase/analytics";

export const useFireBaseLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
 

  const signOutUser = async () => {
    setError(null);
    setIsPending(false);
    logEvent(analytics, 'LOGOUT_SUCCESS' , {user:auth.currentUser.uid})
    try {
      const response = await signOut(auth);
      
      //dispatch action to clear user state
      
      dispatch(logoutUser());

      dispatch(resetUser());
      dispatch(resetQuestData());
      setData(true);

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  return { error: error, isPending: isPending, signOutUser: signOutUser, data };
};
