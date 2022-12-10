import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { useApi } from "../../hooks/useApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../../components/Modal/Modal";
import { useLinkAuthProviders } from "../../hooks/useLinkAuthProviders";

function Profile() {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [showModel, setShowModal] = useState(true);
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const [url, setUrl] = useState(
    "https://capx-gateway-cnfe7xc8.uc.gateway.dev"
  );
  const { isError, isPending, postData, data } = useApi(url, "POST");
  const {
    linkWithSocail,
    error: linkSocalError,
    isPending: isSOcialLinkPending,
  } = useLinkAuthProviders();

  const showModalFunc = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  // console.log(linkSocalError.message);
  console.log(isSOcialLinkPending);

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsEditEnabled((prevState) => !prevState);
    console.log(isEditEnabled);
  };

  const handleFormSubmit = (value) => {
    console.log(isEditEnabled);
    if (value.fullName.trim().length > 0 && isEditEnabled) {
      const apiDataObject = { data: { name: value.fullName } };
      postData(apiDataObject, "/updateUserFullName");
    }
    // resetForm();
  };

  const formik = useFormik({
    initialValues: { fullName: "" },
    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .required("Full name is required")
        .matches(/^[a-zA-Z ]*$/, "Invalid Full Name"),
    }),
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (data && data.result.success === true) {
      setIsEditEnabled(false);
      console.log(data);
    }
  }, [data]);

  const handleSocialLink = (method) => {
    linkWithSocail(method);
    if (linkSocalError) showModalFunc(true);
  };

  return (
    <div className="myProfile flex flex-row">
      <div className="pfp flex flex-col w-full">
        <div className="pfp-inner flex flex-col md:flex-row items-center md:items-start pt-16 pb-40">
          <div className="pfp-inner1 flex flex-col basis-1/3 items-center">
            {/* Wrapper for Profile Image -----------------------------------------------------------------------------*/}
            <div className="pfp-bg flex flex-col justify-center items-center">
              {userData?.image_url ? (
                <img
                  src={userData?.image_url}
                  alt=""
                  className="pfp-background rounded-full"
                />
              ) : (
                <p className="text-white text-2xl">
                  {userData?.username.slice(0, 1).toUpperCase()}
                </p>
              )}
            </div>

            {/* Wrapper for Level Chip --------------------------------------------------------------------------------*/}
            <div className="level-badge flex flex-row items-center justify-center gap-2 rounded-xl">
              <img src={Badge} alt="" className="w-8" />
              {/* Target the below paragraph for changing User Level */}
              <p className="font-black fs-14">
                level {userData && userData.level}
              </p>
            </div>

            {/* Wrapper for Username Chip ----------------------------------------------------------------------------*/}
            <div className="pfp-username py-3 px-6 rounded-xl my-5">
              {/* Target the below paragraph for changing Username */}
              <p className="fs-18 font-black">{userData?.username}</p>
            </div>

            {/* Wrapper for Level Progressbar -----------------------------------------------------------------------*/}
            <div className="pfp-progress flex flex-col gap-3.5 mt-6">
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
                  <p className="c-green-700 opacity-70">
                    Level {userData && userData.level}
                  </p>
                  <p className=" pfp-chip px-3 py-1.5 rounded-xl border-1">
                    0 xCapx
                  </p>
                </div>

                <div className="pfp-levels-current flex flex-col items-center gap-1">
                  <p className="c-green-700 opacity-70">
                    Level {userData && Number(userData.level) + 1}
                  </p>
                  <p className=" pfp-chip px-3 py-1.5 rounded-xl border-1">
                    12 xCapx
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pfp-inner2 flex flex-col basis-1/3 items-center gap-10 pt-8">
            <div className="w-3/4 flex justify-center md:justify-start">
              {!isEditEnabled ? (
                <button
                  onClick={(e) => {
                    handleEditProfile(e);
                  }}
                  className="fs-14 underline font-black text-cgreen-700 opacity-60"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    handleEditProfile(e);
                  }}
                  className="fs-14 underline font-black text-cgreen-700 opacity-60"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* Wrapper for Full Name Chip -------------------------------------------------------------------------*/}

            <div className="social-title flex flex-col w-full items-center gap-5">
              <div className="pfp-progress-title flex flex-row gap-3 w-full md:w-3/4 items-center">
                <img src={FullName} alt="" className="w-6" />
                <p className="font-black fs-18 text-cgreen-700 opacity-80">
                  Full Name
                </p>
              </div>

              {!isEditEnabled ? (
                <div className="fullname flex flex-row w-full md:w-3/4 py-3 px-4 justify-between items-center rounded-2xl">
                  {/* Target the below class for linking Fullname */}
                  <p className="fs-16 font-bold text-cgreen-700 opacity-75">
                    {userData?.name}
                  </p>
                  <img
                    src={Check}
                    alt=""
                    className="pfp-background rounded-full w-7"
                  />
                </div>
              ) : (
                <input
                  placeholder="Enter your Full Name"
                  label="fullName"
                  type="text"
                  name="fullName"
                  autoFocus
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  className="fullname flex flex-row  w-3/4 py-3 px-4 justify-between items-center rounded-2xl border-2"
                />
              )}
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
                {userData?.socials.twitter_id.trim() !== "" ? (
                  <div className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl">
                    <div className="flex flex-row gap-3">
                      <img
                        src={TwitterIcon}
                        alt=""
                        className="pfp-background w-6"
                      />

                      {/* Target the below class for changing Twitter Handle */}
                      <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                        {userData?.socials.twitter_id !== ""
                          ? userData?.socials.twitter_username
                          : "Connect your Twitter"}
                      </p>
                    </div>
                    <img
                      src={Check}
                      alt=""
                      className="pfp-background rounded-full w-7 hidden"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSocialLink("twitter");
                    }}
                    className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl"
                  >
                    <div className="flex flex-row gap-3">
                      <img
                        src={TwitterIcon}
                        alt=""
                        className="pfp-background w-6"
                      />
                      {/* Target the below class for changing Twitter Handle */}
                      <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                        Connect your Twitter
                      </p>
                    </div>
                  </button>
                )}

                {userData?.socials.twitter_id.trim() !== "" ? (
                  <div className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl">
                    <div className="flex flex-row gap-3">
                      <img
                        src={DiscordIcon}
                        alt=""
                        className="pfp-background w-6"
                      />
                      {/* Target the below class for changing Twitter Handle */}
                      <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                        {userData?.socials.google_id !== ""
                          ? userData?.socials.google_id
                          : "Connect your google"}
                      </p>
                    </div>
                    <img
                      src={Check}
                      alt=""
                      className="pfp-background rounded-full w-7 hidden"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSocialLink("google");
                    }}
                    className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl"
                  >
                    <div className="flex flex-row gap-3">
                      <img
                        src={DiscordIcon}
                        alt=""
                        className="pfp-background w-6"
                      />
                      {/* Target the below class for changing Twitter Handle */}
                      <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                        Connect your Google
                      </p>
                    </div>
                  </button>
                )}

                {userData.socials.discord_id &&
                userData?.socials.discord_id.trim() !== "" ? (
                  <div className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl">
                    <div className="flex flex-row gap-3">
                      <img src={IGIcon} alt="" className="pfp-background w-6" />
                      {/* Target the below class for changing Twitter Handle */}
                      <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                        {userData.socials.discord_id &&
                        userData?.socials.discord_id !== ""
                          ? userData?.socials.discord_id
                          : "Connect your Discord"}
                      </p>
                    </div>
                    <img
                      src={Check}
                      alt=""
                      className="pfp-background rounded-full w-7 hidden"
                    />
                  </div>
                ) : (
                  <button className="fullname flex flex-row py-3 px-5 justify-between items-center rounded-2xl">
                    <div className="flex flex-row gap-3">
                      <img src={IGIcon} alt="" className="pfp-background w-6" />
                      {/* Target the below class for changing Twitter Handle */}
                      <p className="fs-16 font-bold text-cgreen-700 pt-0.5 opacity-75">
                        Connect your Discord
                      </p>
                    </div>
                  </button>
                )}
                {isEditEnabled && (
                  <div className="submit-btn p-4 w-3/4 flex justify-center rounded-2xl">
                    <button
                      type="buttom"
                      onClick={formik.handleSubmit}
                      className="fs-14 font-bold tracking-normal text-cgreen-100"
                    >
                      Save Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Wrapper for Background Image ---------------------------------------------------------------*/}

          <div className="pfp-inner3 flex flex-col basis-1/3 justify-center items-start h-full"></div>
        </div>
      </div>
      {(isPending || isSOcialLinkPending) && <Modal />}
      {showModel && linkSocalError && (
        <Modal
          actions={{
            error: linkSocalError.message,
            showModalFunc: showModalFunc,
          }}
        />
      )}
    </div>
  );
}

export default Profile;
