import { db } from "../firebase/firebase";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";

export const useFirestoreCollection = (_collection, queryObject = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [reFetchState, setReFetchState] = useState(null);

  const q = useRef(queryObject).current;

  const reFetchData = (refetch)=>{
    if(refetch.status === true && refetch.data.length>0){
      setReFetchState(refetch.data)
    }
  }

  useEffect(() => {
    setIsPending(true);
    let ref = collection(db, _collection);
    if(reFetchState && reFetchState.length>0){
      ref = query(ref, where(...reFetchState));
    }else{
      if (q) {
        ref = query(ref, where(...q));
      }
    }
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.empty) {
          setError("No data to Load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, [_collection, q,reFetchState]);

  return { data: data, isPending: isPending, error: error ,reFetchData:reFetchData};
};
