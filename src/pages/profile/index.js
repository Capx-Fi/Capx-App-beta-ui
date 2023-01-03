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
import { EditIconSvg, GoogleIcon } from "../../assets/svg";
import ErrorModal from "../quests/compRight/errorModal/ErrorModal";
import { config } from "../../config";

function Profile() {
  const inputRef = useRef();
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [showModel, setShowModal] = useState(true);
  const userData = useSelector((state) => state.user);
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const [ModalHeading, setModalHeading] = useState("");

  const handleErrorModal = () => {
    SetIsOpenErrorModal(false);
  };

  const { isError, isPending, postData, data } = useApi(config.API_URL, "POST");

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
    getLinkResult,
    useAccessToken,
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
  };

  const handleFormSubmit = (value) => {
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

  useEffect(() => {
    formik.setFieldValue("fullName", userData?.name);
  }, [userData]);

  const handleSocialLink = (method) => {
    linkWithSocail(method);
    if (linkSocalError) showModalFunc(true);
  };

  const handleImageUpload = async (e) => {
    let image = e.target.files[0];
    console.log(e.target.files[0]);
    if (
      (image.type === "image/png" || image.type === "image/jpeg") &&
      image.size <= 100000
    ) {
      console.log(image);
      const imageUrl = await uploadImageToCloud(image);
      const apiDataObject = { data: { image_url: imageUrl } };
      imageUploadPostData(apiDataObject);
    } else {
      setModalHeading("File type/size not allowed");
      SetIsOpenErrorModal(true);
    }
  };

  useEffect(() => {
    if (!isSOcialLinkPending && useAccessToken && useAccessToken.length > 0) {
      postData({ data: {} }, "/linkYourTwitter");
    }
  }, [useAccessToken, isSOcialLinkPending]);

  useEffect(() => {
    getLinkResult();
  }, []);

  console.log(imageUrl);
  return (
    <>
      <div className="myProfile flex pp-4 md:p-8">
        <div className="pfp flex flex-col w-full">
          <div className="pfp-inner flex flex-col md:flex-row md:items-start pt-8 px-8 md:px-5 pb-14 md:pb-40 gap-20">
            <div className="pfp-inner1 flex flex-col gap-8">
              {/* Wrapper for Profile Image -----------------------------------------------------------------------------*/}
              <div
                onClick={(e) => {
                  if (isEditEnabled) inputRef.current.click();
                }}
                className="img-box relative bg-gredient-2"
              >
                <input
                  ref={inputRef}
                  className="hidden"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/png,image/jpeg"
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
                <button
                  onClick={(e) => {
                    handleEditProfile(e);
                  }}
                  className="fs-14 underline font-black text-cgreen-700 opacity-60"
                >
                  {!isEditEnabled ? "  Edit Profile" : " Cancel Edit"}
                </button>
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
                    {/* <img
                      src={Check}
                      alt=""
                      className="pfp-background rounded-full w-7"
                    /> */}
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

                  {userData?.socials.google_id.trim() !== "" ? (
                    <div className="fullname flex flex-row justify-between items-center rounded-2xl">
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={GoogleIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">
                          {userData?.socials.google_id !== ""
                            ? userData?.email
                            : "Connect your Google"}
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
                        handleSocialLink("google");
                      }}
                      className="fullname flex flex-row justify-between items-center rounded-2xl"
                    >
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={GoogleIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">Connect your Google</p>
                      </div>
                    </button>
                  )}

                  {userData.socials.instagram_id &&
                  userData?.socials.instagram_id.trim() !== "" ? (
                    <div className="fullname flex flex-row justify-between items-center rounded-2xl">
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={IGIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">
                          {userData.socials.instagram_id &&
                          userData?.socials.instagram_id !== ""
                            ? userData?.socials.instagram_id
                            : "Connect your Instagram"}
                        </p>
                      </div>
                      <img
                        src={Check}
                        alt=""
                        className="pfp-background rounded-full w-7 hidden"
                      />
                    </div>
                  ) : (
                    <button className="fullname flex flex-row justify-between items-center rounded-2xl">
                      <div className="flex  items-center flex-row gap-3">
                        <img
                          src={IGIcon}
                          alt=""
                          className="pfp-background w-6"
                        />
                        {/* Target the below class for changing Twitter Handle */}
                        <p className="">Connect your Instagram</p>
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
      <ErrorModal
        heading={ModalHeading}
        open={isOpenErrorModal}
        handleClose={handleErrorModal}
      />
    </>
  );
}

export default Profile;
