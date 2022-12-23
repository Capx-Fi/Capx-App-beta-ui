import React, { useEffect, useRef, useState } from "react";
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
import { useUploadProfileImage } from "../../hooks/useUploadProfileImage";
import { EditIconSvg } from "../../assets/svg";
import { app, auth } from "../../firebase/firebase";

function Profile() {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [showModel, setShowModal] = useState(true);
  const userData = useSelector((state) => state.user);

  const inputRef = useRef();

  const [url, setUrl] = useState(
    "https://capx-gateway-cnfe7xc8.uc.gateway.dev"
  );
  const { isError, isPending, postData, data } = useApi(url, "POST");

  const {
    error: ApiError,
    isPending: isAPiPending,
    postData: imageUploadPostData,
  } = useApi(
    "https://capx-gateway-cnfe7xc8.uc.gateway.dev/updateUserProfileImg",
    "POST"
  );

  const {
    linkWithSocail,
    error: linkSocalError,
    isPending: isSOcialLinkPending,
  } = useLinkAuthProviders();

  const {
    uploadImageToCloud,
    isPending: isUploadImgPending,
    error,
    imageUrl,
  } = useUploadProfileImage();

  const showModalFunc = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

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

  const handleImageUpload = async (e) => {
    const imageUrl = await uploadImageToCloud(e.target.files[0]);
    if (imageUrl) {
      const apiDataObject = { data: { image_url: imageUrl } };
      imageUploadPostData(apiDataObject);
    }
  };

  const handleDiscordConnect = async () => {
    function getURLParameter(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            // eslint-disable-next-line no-restricted-globals
            location.search
          ) || [null, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    }

    function getFirebaseProjectId() {
      return app.options.authDomain.split(".")[0];
    }

    function tokenReceived(data) {
      if (data.token) {
        auth.signInWithCustomToken(data.token).then(async function () {
          const token = await auth.currentUser.getIdToken();
          console.log("JWT Token", token);
          window.close();
        });
      } else {
        console.error(data);
        document.body.innerText = "Error in the token Function: " + data.error;
      }
    }

    var code = getURLParameter("code");
    var state = getURLParameter("state");
    var error = getURLParameter("error");

    if (error) {
      document.body.innerText =
        "Error back from the Spotify auth page: " + error;
    } else if (!code) {
      // Start the auth flow.
      window.location.href =
        "https://us-central1-" +
        getFirebaseProjectId() +
        ".cloudfunctions.net/discord/link";
    } else {
      const token = await auth.currentUser.getIdToken();
      console.log("Code Found", token);
      // // Use JSONP to load the 'token' Firebase Function to exchange the auth code against a Firebase custom token.
      const script = document.createElement("script");
      script.type = "text/javascript";
      // // This is the URL to the HTTP triggered 'token' Firebase Function.
      // // See https://firebase.google.com/docs/functions.
      var tokenFunctionURL =
        "https://us-central1-" +
        getFirebaseProjectId() +
        ".cloudfunctions.net/discord/link-auth";
      script.src =
        tokenFunctionURL +
        "?code=" +
        encodeURIComponent(code) +
        `&auth_token=` +
        encodeURIComponent(token) +
        "&callback=" +
        tokenReceived.name;
      document.head.appendChild(script);
    }
  };
  useEffect(() => {}, []);

  console.log(imageUrl);
  return (
    <>
      <div className="myProfile flex pp-4 md:p-8">
        <div className="pfp flex flex-col w-full">
          <div className="pfp-inner flex flex-col md:flex-row md:items-start pt-8 px-8 md:px-5 pb-14 md:pb-40 gap-20">
            <div className="pfp-inner1 flex flex-col gap-8">
              {/* Wrapper for Profile Image -----------------------------------------------------------------------------*/}
              <div
                onClick={(e) => inputRef.current.click()}
                className="img-box relative bg-gredient-2"
              >
                <input
                  ref={inputRef}
                  className="hidden"
                  type="file"
                  onChange={handleImageUpload}
                />
                <div className="img-wrapper relative">
                  {userData?.image_url ? (
                    <img
                      src={userData?.image_url}
                      alt=""
                      className="profile-img absolute inset-0"
                    />
                  ) : (
                    <h2 className="img-text absolute text-white">
                      {userData?.username.slice(0, 1).toUpperCase()}
                    </h2>
                  )}
                </div>
              </div>

              {/* Wrapper for Username Chip ----------------------------------------------------------------------------*/}
              <div className="pfp-username flex justify-between capitalize">
                {/* Target the below paragraph for changing Username */}
                <p className="grow text-center">{userData?.username}</p>
                <button>
                  <img src={EditIconSvg} alt="edit" />
                </button>
              </div>
            </div>

            <div className="pfp-inner2 flex flex-col gap-10 pt-3">
              <div className="flex justify-center md:justify-start">
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

              <div className="social-title flex flex-col w-full  gap-5">
                <div className="pfp-progress-title flex flex-row gap-3 items-center">
                  <img src={FullName} alt="" className="w-6" />
                  <p className="font-black fs-18 text-cgreen-700 opacity-80">
                    Full Name
                  </p>
                </div>

                {!isEditEnabled ? (
                  <div className="fullname flex flex-row justify-between items-center rounded-2xl">
                    {/* Target the below class for linking Fullname */}
                    <p className="fs-16 font-bold text-cgreen-700 opacity-7 capitalize">
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
                    className="fullname flex flex-row py-3 px-4 justify-between items-center rounded-2xl border-2"
                  />
                )}
              </div>

              {/* Wrapper for Social Link Chips ------------------------------------------------------------------------*/}

              <div className="social-title flex flex-col w-full  gap-5">
                <div className="pfp-progress-title flex flex-row gap-3 items-center self-start">
                  <img src={ConnectSo} alt="" className="w-8" />
                  <p className="font-black fs-18 text-cgreen-700 opacity-80">
                    Social
                  </p>
                </div>

                <div className="social-wrapper gap-6 flex flex-col">
                  {userData?.socials.twitter_id.trim() !== "" ? (
                    <div className="fullname flex flex-row justify-between items-center rounded-2xl">
                      <div className="flex items-center flex-row gap-3">
                        <img
                          src={TwitterIcon}
                          alt=""
                          className="pfp-background w-6"
                        />

                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">
                          {userData?.socials.twitter_id !== ""
                            ? userData?.socials.twitter_username
                            : "Connect your Twitter"}
                        </p>
                      </div>
                      <img
                        src={Check}
                        alt=""
                        className="pfp-background rounded-full w-7"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleSocialLink("twitter");
                      }}
                      className="fullname flex flex-row justify-between items-center rounded-2xl"
                    >
                      <div className="flex items-center flex-row gap-3">
                        <img
                          src={TwitterIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">Connect your Twitter</p>
                      </div>
                    </button>
                  )}

                  {userData?.socials.twitter_id.trim() !== "" ? (
                    <div className="fullname flex flex-row justify-between items-center rounded-2xl">
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={DiscordIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">
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
                      className="fullname flex flex-row justify-between items-center rounded-2xl"
                    >
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={DiscordIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">Connect your Google</p>
                      </div>
                    </button>
                  )}

                  {userData.socials.discord_id &&
                  userData?.socials.discord_id.trim() !== "" ? (
                    <div className="fullname flex flex-row justify-between items-center rounded-2xl">
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={IGIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">
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
                    <button
                      onClick={handleDiscordConnect}
                      className="fullname flex flex-row justify-between items-center rounded-2xl"
                    >
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={IGIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">Connect your Discord</p>
                      </div>
                    </button>
                  )}
                  {isEditEnabled && (
                    <div className="submit-btn p-4 bg-gredient-2 flex justify-center rounded-2xl">
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

            <div className="pfp-inner3 flex flex-col grow justify-center items-start h-full"></div>
          </div>
        </div>
      </div>
      {(isPending ||
        isSOcialLinkPending ||
        isAPiPending ||
        isUploadImgPending) && <Modal />}
      {showModel && linkSocalError && (
        <Modal
          actions={{
            error: linkSocalError.message,
            showModalFunc: showModalFunc,
          }}
        />
      )}
    </>
  );
}

export default Profile;
