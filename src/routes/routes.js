import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRoutes, privateRoutes, semiProtectedRoutes } from "./constants";

export default function Routes() {
  const [routes, setRoutes] = useState([...publicRoutes, ...privateRoutes]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isUserProfileSet = useSelector((state) => state.auth.isUserProfileSet);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("user logged in");
      if (isUserProfileSet) {
        console.log("user profile set");
        setRoutes((prevState) => {
          if (prevState === privateRoutes) {
            return prevState;
          } else {
            return privateRoutes;
          }
        });
      } else {
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
  }, [isLoggedIn, isUserProfileSet]);

  return useRoutes(routes);
}
