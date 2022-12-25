import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import React from 'react'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

export default function useFirebaseReAuth(fetchUpdatedData) {
  const dispatch = useDispatch()
	const [isPending,setIsPending] = useState(false);
	const [accessToken, setAccessToken] = useState('')
	useEffect(()=>{
		setIsPending(true)
		const unsub = onAuthStateChanged(auth, async (user) => {
      //dispatch auth is ready redux change
      if (user) {
		setAccessToken(user.accessToken);
		setIsPending(false)
      } else {
        setIsPending(false)
      }
    });
	unsub();
  }, [fetchUpdatedData]);

	return { accessToken: accessToken, isPending: isPending};
  
}
