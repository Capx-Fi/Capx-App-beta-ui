import { db } from "../firebase/firebase"
import { doc,onSnapshot,where } from "firebase/firestore"
import { useState ,useEffect } from "react"

export const useFirestoreDoc = (_collection,id,queryObject={}) => {
    const [ data,setData ] = useState(null);
    const [isPending,setIsPending] = useState(false);
	const [error,setError] = useState(null);
    const [options,setOptions] = useState(null);

    useEffect(() => {
			setIsPending(true);
			console.log(_collection,id,queryObject)
			let ref = null;
			if(id===-1){
				console.log('i executed')
				ref = doc(db,_collection,where(queryObject.key , "==",queryObject.value))
			}else{
				ref = doc(db,_collection,id)
			}
			const unsub = onSnapshot(ref, (snapshot) => {
					console.log(snapshot.data())
					if(snapshot.exists()){
							
							let results = {};
							console.log(snapshot.data())
							results = snapshot.data();
							setData(results);
							setIsPending(false);
					}else{
							console.log('no data')
							setError(-1);
							setIsPending(false);
					}
			}, (error) => {
					setError(error.message);
					setIsPending(false);
			})

			return () => unsub()

    },[_collection,id])

    return { data:data ,isPending:isPending, error:error }

}