import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Badge,
  Check,
  CommProf,
  TwitterIcon,
  DiscordIcon,
  IGIcon,
  ConnectSo,
  FullName,
} from "../../assets/images/profile";
import { db, useAuth } from "../../firebase/firebase";

function Profile() {
  const currentUser = useAuth();
  const [useData, setUserData] = useState();
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const getUserDetails = useCallback(async () => {
    try {
      if (currentUser) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        const userDatails = querySnapshot.docs[0].data();
        setUserData(userDatails);
        console.log(userDatails);
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentUser]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <div className="myProfile flex flex-row h-full ">
      <div className="pfp flex flex-col w-full">
        <div className="pfp-inner flex flex-col md:flex-row items-center md:items-start pt-16 pb-40 h-full">
          <div className="pfp-inner1 flex flex-col basis-1/3 items-center">
            {/* Wrapper for Profile Image -----------------------------------------------------------------------------*/}
            <div className="pfp-bg flex flex-col items-center">
              <img
                src={useData?.image_url}
                alt=""
                className="pfp-background rounded-full w-4/5 p-1"
              />
            </div>

            {/* Wrapper for Level Chip --------------------------------------------------------------------------------*/}
            <div className="level-badge flex flex-row items-center justify-center gap-2 rounded-xl">
              <img src={Badge} alt="" className="w-8" />
              {/* Target the below paragraph for changing User Level */}
              <p className="font-black fs-14">Level OO</p>
            </div>

            {/* Wrapper for Username Chip ----------------------------------------------------------------------------*/}
            <div className="pfp-username py-3 px-6 rounded-xl my-5">
              {/* Target the below paragraph for changing Username */}
              <p className="fs-18 font-black">{useData?.username}</p>
            </div>

            {/* Wrapper for Level Progressbar -----------------------------------------------------------------------*/}
            <div className="pfp-progress flex flex-col gap-3.5 mt-6 ">
              <div className="pfp-progress-title flex flex-row gap-2 items-center">
                <img src={CommProf} alt="" className="w-6" />
                <p className="font-black fs-18 text-cgreen-700 opacity-80">
                  Community Status
                </p>
              </div>

              <div className="pfp-progressbar w-full h-5">
                {/* Target the below class for changing Progressbar fill */}
                <div className="pfp-progressbar-inner h-5"></div>
              </div>

              <div className="pfp-levels flex flex-row justify-between fs-13 font-black c-green-700">
                <div className="pfp-levels-current flex flex-col items-center gap-1">
                  <p className="c-green-700 opacity-70">Level 00</p>
                  <p className=" pfp-chip px-3 py-1.5 rounded-xl border-1">
                    0 xCapx
                  </p>
                </div>

                <div className="pfp-levels-current flex flex-col items-center gap-1">
                  <p className="c-green-700 opacity-70">Level 01</p>
                  <p className=" pfp-chip px-3 py-1.5 rounded-xl border-1">
                    12 xCapx
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pfp-inner2 flex flex-col basis-1/3 items-center gap-10 pt-8">
            <div className="w-3/4 flex justify-center md:justify-start">
              <Link className="fs-14 underline font-black text-cgreen-700 opacity-60">
                Edit Profile
              </Link>
            </div>

            {/* Wrapper for Full Name Chip -------------------------------------------------------------------------*/}

            <div className="social-title flex flex-col w-full items-center gap-5">
              <div className="pfp-progress-title flex flex-row gap-3 w-full md:w-3/4 items-center">
                <img src={FullName} alt="" className="w-6" />
                <p className="font-black fs-18 text-cgreen-700 opacity-80">
                  Full Name
                </p>
              </div>

              <div className="fullname flex flex-row w-full md:w-3/4 py-3 px-4 justify-between items-center rounded-2xl">
                {/* Target the below class for linking Fullname */}
                <p className="fs-16 font-bold text-cgreen-700 opacity-75">
                  {useData?.name}
                </p>
                <img
                  src={Check}
                  alt=""
                  className="pfp-background rounded-full w-7"
                />
              </div>
            </div>

            {/* Wrapper for Social Link Chips ------------------------------------------------------------------------*/}

            <div className="social-title flex flex-col w-full items-start md:items-center gap-5">
              <div className="pfp-progress-title flex flex-row gap-3 w-full md:w-3/4 items-center">
                <img src={ConnectSo} alt="" className="w-8" />
                <p className="font-black fs-18 text-cgreen-700 opacity-80">
                  Social
                </p>
              </div>

              <div className="social-wrapper w-full md:w-3/4 gap-6 flex flex-col">
                <div className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl">
                  <div className="flex flex-row gap-3">
                    <img
                      src={TwitterIcon}
                      alt=""
                      className="pfp-background w-6"
                    />
                    {/* Target the below class for changing Twitter Handle */}
                    <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                      {useData?.socials.twitter_id !== ""
                        ? useData?.socials.twitter_id
                        : "Connect your Twitter"}
                    </p>
                  </div>
                  <img
                    src={Check}
                    alt=""
                    className="pfp-background rounded-full w-7 hidden"
                  />
                </div>

                <div className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl">
                  <div className="flex flex-row gap-3">
                    <img
                      src={DiscordIcon}
                      alt=""
                      className="pfp-background w-6"
                    />
                    {/* Target the below class for changing Twitter Handle */}
                    <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                      Connect your Discord
                    </p>
                  </div>
                  <img
                    src={Check}
                    alt=""
                    className="pfp-background rounded-full w-7 hidden"
                  />
                </div>

                <div className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl">
                  <div className="flex flex-row gap-3">
                    <img src={IGIcon} alt="" className="pfp-background w-6" />
                    {/* Target the below class for changing Twitter Handle */}
                    <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                      Connect your Instagram
                    </p>
                  </div>
                  <img
                    src={Check}
                    alt=""
                    className="pfp-background rounded-full w-7 hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Wrapper for Background Image ---------------------------------------------------------------*/}

          <div className="pfp-inner3 flex flex-col basis-1/3 justify-center items-start h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
