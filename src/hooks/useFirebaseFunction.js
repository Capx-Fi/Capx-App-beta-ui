import { getFunctions, httpsCallable } from "firebase/functions";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFirebaseFunction = () => {
    const [isCancelled,setIsCancelled] = useState(false);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false); 
    const dispatch = useDispatch();
		const functions = getFunctions();

    const cloudFunctionCall =async (params,functionName) => { 
			console.log('i was called')
      setError(null);
			setIsPending(true);
			setIsSuccess(false);
			try{
				const checkIfUsernameAvailable = httpsCallable(
					functions,
					functionName
				);
				const response = await checkIfUsernameAvailable({
					username: params.username,
				});
				if(!response){
					throw new Error('Could not complete request')
				}
				console.log(response);
				if(!isCancelled){
					setIsPending(false);
					setError(null);
					setIsSuccess(true);
				}
			}catch(err){
				if(!isCancelled){
					//console.log(error.message);
					setError(err.message);
					setIsPending(false);
					setIsSuccess(false);
				}
			}
    }

		return {_error:error, _isPending:isPending, cloudFunctionCall:cloudFunctionCall, _isSuccess:isSuccess}
}
