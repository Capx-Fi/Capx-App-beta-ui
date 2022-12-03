import { onAuthStateChanged } from "firebase/auth"
import { auth,db } from "../firebase/firebase"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setAuthStatus } from "./../store/slices/authSlice";
import { setUser } from "./../store/slices/userSlice"
import {
    doc,
    getDoc,
} from "firebase/firestore";


export const useFireBaseAuth = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,async (user) => {
            //dispatch auth is ready redux change 
            if(user){
                try{
                    console.log(user);
                    const userDoc = doc(db, "users",user.uid);
                    const docSnap = await getDoc(userDoc);
                    console.log(docSnap.data());
                    if (docSnap.exists()) {
                        console.log('i entered here')
                        dispatch(setUser(docSnap.data()));
                    }
                }catch(error){
                    console.log(error);
                }
            }
            dispatch(setAuthStatus({isAuthReady:true,user:user}));
        })

        return unsub();
    },[])
}
