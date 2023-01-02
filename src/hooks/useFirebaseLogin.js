import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { config } from "../config";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const useFireBaseLogin = () => {
  const dispatch = useDispatch();
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signInUser = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (!response) {
        throw new Error("Could not complete signin");
      }
      //dispatch action to set user state
      if (response.user) {
        const isProfileSet = await setUerDetails(response.user);
        dispatch(
          setLoggedInUser({
            user: response.user,
            isUserProfileSet: isProfileSet,
          })
        );
      }
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      setIsPending(false);
      console.log(isCancelled);
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  const signInUserUsingSocial = async (method) => {
    if (method) {
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

      setError(null);
      setIsPending(true);
      try {
        await signInWithRedirect(auth, provider);
      } catch (error) {
        console.log(error);
        setIsPending(false);
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
        }
      }
    } else {
      setError("No Social selected");
      setIsPending(false);
    }
  };

  const setUerDetails = async (userDetails) => {
    let userprofile = null;
    if (userDetails) {
      try {
        const userDoc = doc(db, config.USER_COLLECTION, userDetails.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userQuest = await getUserQuestData(userDetails.uid);
          dispatch(setUser({ ...docSnap.data(), userQuest: userQuest }));
          userprofile = true;
        } else {
          userprofile = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return userprofile;
  };

  const getUserQuestData = async (userId) => {
    const userQuestCollection = collection(
      db,
      `${config.USER_COLLECTION}/${userId}/quest-order`
    );
    const questDataQuery = query(
      userQuestCollection,
      where("docType", "==", "Aggregate")
    );
    let quests = [];
    try {
      let result = [];
      const userQuestData = await getDocs(questDataQuery);
      userQuestData.forEach((doc) => {
        result.push(doc.data());
      });
      if (result.length > 0) {
        Object.keys(result[0].quests).forEach((key) => {
          quests.push({
            ...result[0].quests[key],
            questID: key.split("|")[0],
            quest_order_id: key,
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
    return quests;
  };

  const getSigninResult = async () => {
    try {
      const response = await getRedirectResult(auth);

      if (!response) {
        throw new Error("Could not complete signin");
      }
      if (response) {
        const { user: userDetails } = response;
        const isProfileSet = await setUerDetails(userDetails);
        dispatch(
          setLoggedInUser({
            user: userDetails,
            isUserProfileSet: isProfileSet,
          })
        );
      }
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //cleanup function to abort the request
  // useEffect(()=>{
  //     return () => setIsCancelled(true);
  // },[])

  return {
    error: error,
    isPending: isPending,
    signInUser: signInUser,
    signInUserUsingSocial: signInUserUsingSocial,
    getSigninResult,
  };
};
