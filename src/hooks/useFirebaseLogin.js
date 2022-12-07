import { useState,useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,TwitterAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../store/slices/authSlice";
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
        setIsPending(true);
        try{
            const response = await signInWithEmailAndPassword(auth,email,password);
            if(!response){
                throw new Error('Could not complete signin')
            }
            //dispatch action to set user state
            if(response.user){
				const isProfileSet = await setUerDetails(response.user)
                dispatch(setLoggedInUser({user:response.user,isUserProfileSet:isProfileSet}));
            }
            if(!isCancelled){
                setIsPending(false);
                setError(null);
            }
        }catch(error){
			setIsPending(false);
			console.log(isCancelled);
            if(!isCancelled){
                setError(error.message);
                setIsPending(false);
            }
        }
    }

    const signInUserUsingSocial = async (method) => {
			if(method){
				let provider = null
				switch(method.toUpperCase()){
					case "GOOGLE" : {provider = new GoogleAuthProvider();
													}
					case "TWITTER" : {provider = new TwitterAuthProvider();
													}
					default : {provider = new GoogleAuthProvider();
										}
				}
				
				setError(null);
				setIsPending(true);
				try{
					const { user: userDetails } = await signInWithPopup(auth,provider);
					if(!userDetails){
						throw new Error('Could not complete signin')
					}
					if(userDetails){
						const idtoken = await userDetails.getIdToken();
						console.log(idtoken);
						console.log(userDetails.uid);
						const isProfileSet = await setUerDetails(userDetails)
						dispatch(setLoggedInUser({user:userDetails,isUserProfileSet:isProfileSet}));
					}
					if(!isCancelled){
						setIsPending(false);
						setError(null);
					}	
				}catch(error){
					setIsPending(false);
					if(!isCancelled){
						setError(error.message);
						setIsPending(false);
					}
				}
			}else{
				setError('No Social selected');
				setIsPending(false);
			}	
    }

		const setUerDetails = async (userDetails) => {
			let userprofile = null;
			if(userDetails){
				try{
					console.log(userDetails);
					const userDoc = doc(db, "users",userDetails.uid);
					const docSnap = await getDoc(userDoc);
					console.log(docSnap.data());
					if (docSnap.exists()) {
							console.log('i entered here')
							dispatch(setUser(docSnap.data()));
							userprofile = true;
					}else{
						userprofile = false
					}
				}catch(error){
						console.log(error);
				}
			}
			return userprofile;
		}
    //cleanup function to abort the request
    // useEffect(()=>{
    //     return () => setIsCancelled(true);
    // },[])

    return { error:error, isPending:isPending, signInUser:signInUser, signInUserUsingSocial:signInUserUsingSocial}
  
}
