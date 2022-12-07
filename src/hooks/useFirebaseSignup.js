import { useState,useEffect } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../store/slices/authSlice"


export const useFirebaseSignup = () => {
    const [isCancelled,setIsCancelled] = useState(false);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false); 
    const dispatch = useDispatch();
    const signupUsingEmail = async (email,password) => {
        setError(null);
        setIsPending(true);
        setIsSuccess(false);
        try{
            const response = await createUserWithEmailAndPassword(auth,email,password);
            if(!response){
                throw new Error('Could not complete signup')
            }
            console.log(response);
            dispatch(setLoggedInUser({user:response.user,isUserProfileSet:false}));
            if(!isCancelled){
                setIsPending(false);
                setError(null);
                setIsSuccess(true);
            }
        }catch(err){
            //console.log(error.message);
            if(!isCancelled){
                //console.log(error.message);
                setError(err.message);
                setIsPending(false);
                setIsSuccess(false);
            }
            //console.log(error,isPending)
        }
    }
    //cleanup function to abort the request
    // useEffect(()=>{
    //     return () => setIsCancelled(true);
    // },[])
    //console.log(error,isPending)
    return { _error:error, _isPending:isPending, signupUsingEmail:signupUsingEmail, _isSuccess:isSuccess }
}
