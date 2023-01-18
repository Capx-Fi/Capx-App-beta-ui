import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Check,
  TwitterIcon,
  ConnectSo,
  FullName,
  ProfileSplash,
} from "../../assets/images/profile";
import { useApi } from "../../hooks/useApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../../components/Modal/Modal";
import { useLinkAuthProviders } from "../../hooks/useLinkAuthProviders";
import { useUploadProfileImage } from "../../hooks/useUploadProfileImage";
import {
  ContentCopySvg,
  DailyQuestsIcon,
  DiscordIcon,
  EditIconSvg,
  GoogleIcon,
} from "../../assets/svg";
import ErrorModal from "../quests/compRight/errorModal/ErrorModal";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { getURLParameter } from "../../utils";
import { auth } from "../../firebase/firebase";
import TopLoader from "../../components/topLoader/TopLoader";
import {
  AnnouncePng,
  CoinsPng,
  FirePng,
  LightningPng,
} from "../../assets/images";

function Profile() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [showModel, setShowModal] = useState(true);
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const [ModalHeading, setModalHeading] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showTwitterUnlinkBtn, setShowTwitterUnlinkBtn] = useState(false);
  const [inviteProgramData, setInviteProgramData] = useState(null);

  const handleErrorModal = () => {
    SetIsOpenErrorModal(false);
    setModalHeading("");
    formik.setFieldError("fullName", null);
  };

  const { isError, isPending, postData, data, getData } = useApi(
    config.API_URL,
    "POST"
  );

  const {
    linkWithSocail,
    error: linkSocalError,
    isPending: isSOcialLinkPending,
    getLinkResult,
    socialRedirectProvider,
    useAccessToken,
    unlinkWithSocail,
  } = useLinkAuthProviders();

  const {
    uploadImageToCloud,
    isPending: isUploadImgPending,
    error,
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

  const handleFormSubmit = async (value) => {
    if (value.fullName !== userData?.name || formik.values.imagefile !== null) {
      let apiDataObject = { data: {} };
      if (formik.values.imagefile !== null) {
        const imageUrl = await uploadImageToCloud(formik.values.imagefile);
        apiDataObject["data"]["image_url"] = imageUrl;
      }
      if (value.fullName !== userData?.name) {
        apiDataObject["data"]["name"] = value.fullName;
      }
      postData(apiDataObject, "/updateUserProfile");
      setImagePreview("");
      formik.resetForm();
    } else {
      setModalHeading("Nothing to update");
      SetIsOpenErrorModal(true);
    }
  };

  const formik = useFormik({
    initialValues: { fullName: "", imagefile: null },
    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .required("Full name is required")
        .matches(/^[a-zA-Z ]*$/, "Invalid Full Name"),
    }),
    validateOnChange: false,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (data && data.result.success === true) {
      setIsEditEnabled(false);
    }
    if (data && data.result.success === false) {
      setModalHeading(data.result?.message);
      SetIsOpenErrorModal(true);
    }
  }, [data]);

  useEffect(() => {
    formik.setFieldValue("fullName", userData?.name);
    if (
      auth.currentUser.providerData.length === 1 &&
      userData.socials.discord_id.length === 0
    ) {
      setShowTwitterUnlinkBtn(false);
    } else {
      setShowTwitterUnlinkBtn(true);
    }
  }, [userData]);

  const handleSocialLink = (method) => {
    linkWithSocail(method);
    if (linkSocalError) showModalFunc(true);
  };

  const handleImageUpload = async (e) => {
    let image = e.target.files[0];
    if (
      (image.type === "image/png" || image.type === "image/jpeg") &&
      image.size <= 50000
    ) {
      formik.setFieldValue("imagefile", image);
      var imagePreview = URL.createObjectURL(image);
      setImagePreview(imagePreview);
    } else {
      setModalHeading("File type/size not allowed");
      SetIsOpenErrorModal(true);
    }
  };

  const handleDiscordLink = () => {
    window.location.href = `${config.AUTH_ENDPOINT}/linkDiscord`;
  };

  const hanldeTwitterUnlink = (method) => {
    if (
      auth.currentUser.providerData.length === 1 &&
      userData.socials.discord_id.length === 0
    ) {
      SetIsOpenErrorModal(true);
      setModalHeading("You must have one social provider");
    } else {
      unlinkWithSocail(method);
      postData({ data: {} }, "/unlinkYourTwitter");
    }
  };

  useEffect(() => {
    if (!isSOcialLinkPending && !isPending && useAccessToken?.length > 0) {
      if (
        socialRedirectProvider === "twitter.com" &&
        userData.socials.twitter_id.length === 0
      ) {
        postData({ data: {} }, "/linkYourTwitter");
      } else if (
        socialRedirectProvider === "google.com" &&
        userData.socials.google_id.length === 0
      ) {
        postData({ data: {} }, "/linkYourGoogle");
      }
    }
  }, [isSOcialLinkPending, socialRedirectProvider, isPending]);

  useEffect(() => {
    let code = getURLParameter("code");
    if (code && !data && !isPending) {
      getData({ code: code }, "/linkAuthDiscord");
      navigate("/profile");
    } else {
      getLinkResult();
    }

    if (
      data &&
      (data.result?.inviteProgramRewards === 0 ||
        data.result?.inviteProgramRewards)
    ) {
      setInviteProgramData(data.result);
    }
  }, [data, isPending]);

  useEffect(() => {
    if (
      !isPending &&
      !inviteProgramData &&
      !isError &&
      userData.invite_code !== ""
    ) {
      getData(null, "/inviteProgramStats");
    }
  }, [isPending]);

  console.log(inviteProgramData);

  return (
    <>
      <div className="myProfile flex pp-4 md:p-8">
        <div className="pfp flex flex-col w-full">
          <div className="pfp-inner flex flex-col md:flex-row md:items-start pt-8 px-8 md:px-5 pb-14 md:pb-40 md:gap-0 gap-20">
            <div className="profile-section flex flex-col gap-4 ">
              <div className="profile-img-box flex justify-center">
                <div className="img-box-wrapper bg-gredient-2 p-1.5 rounded-full">
                  <div className="img-box rounded-full overflow-hidden">
                    {userData?.image_url ? (
                      <img className="img" src={userData?.image_url} alt="" />
                    ) : (
                      <h2 className="img">
                        {userData?.username.slice(0, 1).toUpperCase()}
                      </h2>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-1">
                <p className="username text-center capitalize">
                  {userData?.name}
                </p>
                <p className="name text-center capitalize">
                  {userData?.username}
                </p>
              </div>
              <div className="socials flex flex-col gap-5">
                <div className="social-heading flex items-center justify-center">
                  <img src={DailyQuestsIcon} alt="check" />
                  <p className="ml-2">Socials</p>
                </div>

                {userData?.socials.twitter_id.trim() !== "" ? (
                  <div
                    onClick={() => {
                      hanldeTwitterUnlink("twitter");
                    }}
                    className="social-box flex items-center"
                  >
                    <img src={TwitterIcon} alt="twitter" />
                    <p className="name ml-2">
                      {userData?.socials.twitter_username}
                    </p>
                    <div className="grow" />
                    <img src={Check} alt="check" />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSocialLink("twitter");
                    }}
                    className="social-box outlined-effect flex items-center"
                  >
                    <img src={TwitterIcon} alt="twitter" />
                    <p className="name ml-2">Connect you twitter</p>
                    <div className="grow" />
                  </button>
                )}
                {userData?.socials.discord_id.trim() !== "" ? (
                  <div className="social-box flex items-center">
                    <img src={DiscordIcon} alt="twitter" />
                    <p className="name ml-2">
                      {userData?.socials.discord_username}
                    </p>
                    <div className="grow" />
                    <img src={Check} alt="check" />
                  </div>
                ) : (
                  <button className="social-box outlined-effect flex items-center">
                    <img src={DiscordIcon} alt="twitter" />
                    <p className="name ml-2">Connect you discord</p>
                    <div className="grow" />
                  </button>
                )}
              </div>
            </div>
            <div className="statistics-section flex flex-col gap-6">
              <div className="heading flex items-center justify-center md:justify-start">
                <img src={FullName} alt="statistics" />
                <p className="ml-2">Invite Statistics</p>
              </div>
              <div className="statistics-box flex items-center">
                <img src={FirePng} alt="fire" />
                <p className="ml-2 text">
                  Invites
                  <br />
                  used
                </p>
                <span className="grow" />
                <p className="number">
                  {inviteProgramData?.inviteProgramStats.invitesUsed
                    ? inviteProgramData?.inviteProgramStats.invitesUsed
                    : 0}
                </p>
              </div>
              <div className="statistics-box flex items-center">
                <img src={LightningPng} alt="fire" />
                <p className="ml-2 text">
                  Invites
                  <br />
                  left
                </p>
                <span className="grow" />
                <p className="number">
                  {inviteProgramData?.inviteProgramStats.invitesLeft
                    ? inviteProgramData?.inviteProgramStats.invitesLeft
                    : 0}
                </p>
              </div>
              <div className="statistics-box flex items-center">
                <img src={CoinsPng} alt="fire" />
                <p className="ml-2 text">
                  Invites xCapx
                  <br />
                  earnings
                </p>
                <span className="grow" />
                <p className="number">
                  {inviteProgramData?.inviteProgramRewards
                    ? inviteProgramData?.inviteProgramRewards
                    : 0}
                </p>
              </div>
              {userData.invite_code !== "" ? (
                <div className="statistics-box flex flex-col gap-4">
                  <div className="flex items-center">
                    <img src={AnnouncePng} alt="fire" />
                    <p className="ml-2 text">Your invite Code</p>
                  </div>
                  <div className="invite-code-box flex items-center justify-between">
                    <p className="number">{userData.invite_code}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(userData.invite_code);
                      }}
                      className="copy-btn"
                    >
                      <img src={ContentCopySvg} alt="copy" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="statistics-box flex flex-col gap-4">
                  <div className="flex items-center">
                    <img src={AnnouncePng} alt="fire" />
                    <p className="ml-2 text">Your invite Code</p>
                  </div>
                  <div className="invite-code-box flex items-center justify-between">
                    <p className="number">*****</p>
                  </div>
                </div>
              )}
            </div>
            <div className="grow" />
            <img
              className="right-img self-center md:block hidden"
              src={ProfileSplash}
              alt="Profile"
            />
          </div>
        </div>
      </div>
      {(isPending || isSOcialLinkPending || isUploadImgPending) && (
        <TopLoader />
      )}
      {showModel && linkSocalError && (
        <Modal
          actions={{
            error: linkSocalError.message,
            showModalFunc: showModalFunc,
          }}
        />
      )}
      <ErrorModal
        heading={ModalHeading || formik.errors.fullName}
        open={isOpenErrorModal || !!formik.errors.fullName}
        handleClose={handleErrorModal}
      />
    </>
  );
}

export default Profile;
