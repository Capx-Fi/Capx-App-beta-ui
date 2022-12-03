import { useState,useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import {
    doc,
    getDoc,
} from "firebase/firestore";


export const useFireBaseLogin = () => {
    const dispatch = useDispatch();
    const [isCancelled,setIsCancelled] = useState(false);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(false);

    const signInUser = async (email,password) => {
        setError(null);
        setIsPending(false);
        try{
            const response = await signInWithEmailAndPassword(auth,email,password);
            if(!response){
                throw new Error('Could not complete signin')
            }
            //dispatch action to clear user state
            if(response.user){
                dispatch(setAuthStatus({isAuthReady:true,user:response.user}));
                try{
                    console.log(response.user);
                    const userDoc = doc(db, "users",response.user.uid);
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
            if(!isCancelled){
                setIsPending(false);
                setError(null);
            }
        }catch(error){
            if(!isCancelled){
                setError(error.message);
                setIsPending(false);
            }
        }
    }
    //cleanup function to abort the request
    useEffect(()=>{
        return () => setIsCancelled(true);
    },[])

    return { error:error, isPending:isPending, signInUser:signInUser }
  
}
