import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect , useState} from "react";
import { publicRoutes,privateRoutes } from "./constants";

export default function Routes() {
    const [routes,setRoutes] = useState(publicRoutes);
    const isLoggedIn = useSelector((state)=>state.auth.loggedin)
    useEffect(()=>{
        if(isLoggedIn){
            console.log('user logged in')
            setRoutes((prevState)=>{
                if(prevState === privateRoutes){
                    return prevState;
                }else{
                    return privateRoutes;
                }
            });

        }else{
            console.log('user not logged in')
            setRoutes((prevState)=>{
                if(prevState === publicRoutes){
                    return prevState;
                }else{
                    return publicRoutes;
                }
            }); 
        }
    },[isLoggedIn])

    return (useRoutes(routes));
}