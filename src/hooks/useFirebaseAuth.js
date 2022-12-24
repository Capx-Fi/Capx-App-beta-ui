import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "./../store/slices/authSlice";
import { setUser } from "./../store/slices/userSlice";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export const useFireBaseAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      //dispatch auth is ready redux change
      if (user) {
        try {
          console.log(user);
          const userDoc = doc(db, "xusers", user.uid);
          const docSnap = await getDoc(userDoc);
          console.log(docSnap.data());
          if (docSnap.data() !== undefined && docSnap.exists()) {
            const userQuestCollection = collection(db, `xusers/${user.uid}/quest-order`);
            const questDataQuery = query(userQuestCollection,where("docType", "==", "Aggregate"));
            let quests = [];
            let result = []
            const userQuestData = await getDocs(questDataQuery);
            userQuestData.forEach((doc)=>{result.push(doc.data())})
            if(result.length>0 && result[0].quests){
              Object.keys(result[0].quests).forEach((key) => {
                quests.push({
                  ...result[0].quests[key],
                  questID: key.split("|")[0],
                  quest_order_id: key,
                });
              });
            }
            dispatch(setUser({...docSnap.data(),userQuest:quests}));
          }
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
            })
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("i fired");
        dispatch(
          setAuthStatus({
            isAuthReady: true,
            user: null,
            isUserProfileSet: false,
          })
        );
      }
    });

    return unsub();
  }, []);
};
