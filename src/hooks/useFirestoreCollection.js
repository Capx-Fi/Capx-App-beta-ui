import { db } from "../firebase/firebase"
import { onSnapshot,collection,where,query } from "firebase/firestore"
import { useState ,useEffect, useRef } from "react"

export const useFirestoreCollection = (_collection,queryObject={}) => {
    const [ data,setData ] = useState(null);
    const [isPending,setIsPending] = useState(false);
	const [error,setError] = useState(null);
    
    const q = useRef(queryObject).current;

    useEffect(() => {
        setIsPending(true);
        let ref = collection(db,_collection)
        console.log(q);
        if(q){
            ref = query(ref,where(...q))
        } 
        console.log('i executed') 
        console.log(_collection,queryObject)      
        const unsub = onSnapshot(ref, (snapshot) => {
            console.log(snapshot)
            if(snapshot.empty){
                setError('No data to Load');
                setIsPending(false);
            }else{
                let results = [];
                snapshot.docs.forEach(doc => {
                    results.push({...doc.data(), id:doc.id})
                })
                console.log(results);
                setData(results);
                setIsPending(false);
            }
        }, (error) => {
            console.log(error)
            setError(error.message);
            setIsPending(false);
        })

        return () => unsub()

    },[_collection,q])

    return { data:data ,isPending:isPending, error:error }

}