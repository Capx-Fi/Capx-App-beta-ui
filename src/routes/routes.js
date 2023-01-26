import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRoutes, privateRoutes, semiProtectedRoutes, verificationRoute } from "./constants";

export default function Routes() {
  const [routes, setRoutes] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isUserProfileSet = useSelector((state) => state.auth.isUserProfileSet);
  const isEmailVerified = useSelector((state) => state.auth.emailVerified);
  const providerData = useSelector((state)=>state.auth.user?.providerData[0]);
  const kd = useSelector((state)=>state.auth.user);
  console.log(kd);


  useEffect(() => {
    
    if (isLoggedIn ) {
      console.log("user logged in");
      if (isUserProfileSet && isEmailVerified) {
        console.log("user profile set");
        setRoutes((prevState) => {
          if (prevState === privateRoutes) {
            return prevState;
          } else {
            return privateRoutes;
          }
        });
      } else if(!isUserProfileSet && !isEmailVerified) {
        console.log("user profile not set verification required");
        if(providerData && providerData.providerId === "twitter.com" && providerData.phoneNumber!==null && providerData.email === null ){
          setRoutes((prevState) => {
            if (prevState === semiProtectedRoutes) {
              return prevState;
            } else {
              return semiProtectedRoutes;
            }
          });
        }else{
          setRoutes((prevState) => {
            if (prevState === verificationRoute) {
              return prevState;
            } else {
              return verificationRoute;
            }
          });
        }
      }else if(isUserProfileSet && !isEmailVerified) {
        console.log("user profile set");
        setRoutes((prevState) => {
          if (prevState === privateRoutes) {
            return prevState;
          } else {
            return privateRoutes;
          }
        });
      }else if(!isUserProfileSet && isEmailVerified) {
        console.log("user profile not set");
        setRoutes((prevState) => {
          if (prevState === semiProtectedRoutes) {
            return prevState;
          } else {
            return semiProtectedRoutes;
          }
        });
      }
    } else {
      console.log("user not logged in");
      setRoutes((prevState) => {
        if (prevState === publicRoutes) {
          return prevState;
        } else {
          return publicRoutes;
        }
      });
    }
  }, [isLoggedIn, isUserProfileSet, isEmailVerified,providerData]);

  return useRoutes(routes);
}
