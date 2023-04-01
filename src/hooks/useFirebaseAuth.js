import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { auth, db, analytics } from "../firebase/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setAuthStatus } from "./../store/slices/authSlice";
import { setUser } from "./../store/slices/userSlice";
import { config } from "../config";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { logEvent, setUserId } from "firebase/analytics";

export const useFireBaseAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      //dispatch auth is ready redux change
      if (user) {
        try {
          const tokenDetails = auth.currentUser.getIdTokenResult();
          const userDoc = doc(db, "xusers", user.uid);
          const docSnap = await getDoc(userDoc);
          setUserId(analytics, { userId: user.uid });
          if (docSnap.data() !== undefined && docSnap.exists()) {
            const userQuestCollection = collection(
              db,
              `${config.USER_COLLECTION}/${user.uid}/quest-order`
            );

            const questDataQuery = query(
              userQuestCollection,
              where("docType", "==", "Aggregate")
            );
            let quests = [];
            let result = [];
            const userQuestData = await getDocs(questDataQuery);
            userQuestData.forEach((doc) => {
              result.push(doc.data());
            });

            for (let x = 0; x < result.length; x++) {
              if (result[x].quests) {
                Object.keys(result[x].quests).forEach((key) => {
                  quests.push({
                    ...result[x].quests[key],
                    questID: key.split("|")[0],
                    quest_order_id: key,
                  });
                });
              }
            }
            logEvent(analytics, "USER_SESSION_WITH_PROFILE", {
              user: user.uid,
            });
            dispatch(setUser({ ...docSnap.data(), userQuest: quests }));
          }
          logEvent(analytics, "USER_SESSION_WITHOUT_PROFILE", {
            user: user.uid,
          });
          dispatch(
            setAuthStatus({
              isAuthReady: true,
              user: user,
              isUserProfileSet:
                docSnap.data() !== undefined &&
                docSnap.data().username &&
                docSnap.data().username.trim().length > 0
                  ? true
                  : false,
              tokenDetails: tokenDetails,
            })
          );
        } catch (error) {
          console.log(error);
          dispatch(
            setAuthStatus({
              isAuthReady: true,
              user: null,
              isUserProfileSet: false,
              tokenDetails: null,
            })
          );
        }
      } else {
        dispatch(
          setAuthStatus({
            isAuthReady: true,
            user: null,
            isUserProfileSet: false,
            tokenDetails: null,
          })
        );
      }
    });

    onIdTokenChanged(auth, async (user) => {
      if (user) {
        dispatch(setAccessToken(user.stsTokenManager.accessToken));
      }
    });

    return unsub();
  }, []);
};
