import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Check,
  TwitterIcon,
  FullName,
  ProfileSplash,
} from "../../assets/images/profile";
import { useApi } from "../../hooks/useApi";
import Modal from "../../components/Modal/Modal";
import { useLinkAuthProviders } from "../../hooks/useLinkAuthProviders";
import { ContentCopySvg, DailyQuestsIcon, DiscordIcon } from "../../assets/svg";
import ErrorModal from "../quests/compRight/errorModal/ErrorModal";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { getURLParameter } from "../../utils";
import TopLoader from "../../components/topLoader/TopLoader";
import {
  AnnouncePng,
  CoinsPng,
  FirePng,
  LightningPng,
} from "../../assets/images";

function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const [ModalHeading, setModalHeading] = useState("");
  const [inviteProgramData, setInviteProgramData] = useState(null);
  const [showCopiedBox, setShowCopiedBox] = useState(false);

  const handleErrorModal = () => {
    SetIsOpenErrorModal(false);
    setModalHeading("");
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
  } = useLinkAuthProviders();

  useEffect(() => {
    if (data && data.result.success === false) {
      setModalHeading(data.result?.error);
      SetIsOpenErrorModal(true);
    }
    if (isError) {
      setModalHeading(isError);
      SetIsOpenErrorModal(true);
    }
  }, [data, isError]);

  const handleSocialLink = (method) => {
    linkWithSocail(method);
  };

  useEffect(() => {
    if (linkSocalError) {
      SetIsOpenErrorModal(true);
      setModalHeading(linkSocalError?.message);
    }
  }, [linkSocalError]);

  const handleDiscordLink = () => {
    window.location.href = `${config.AUTH_ENDPOINT}/linkDiscord`;
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
    if (
      code &&
      !isPending &&
      (inviteProgramData || userData.invite_code === "")
    ) {
      getData({ code: code }, "/linkAuthDiscord");
      navigate("/profile");
    } else {
      getLinkResult();
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
    if (
      data &&
      (data.result?.inviteProgramRewards === 0 ||
        data.result?.inviteProgramRewards)
    ) {
      setInviteProgramData(data.result);
    }
  }, [userData, isPending]);

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(userData.invite_code);
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

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
                <p className="name text-center ">@{userData?.username}</p>
              </div>
              <div className="socials flex flex-col gap-5">
                <div className="social-heading flex items-center justify-center">
                  <img src={DailyQuestsIcon} alt="check" />
                  <p className="ml-2">Socials</p>
                </div>

                {userData?.socials.twitter_id.trim() !== "" ? (
                  <div className="social-box flex items-center">
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
                  <button
                    onClick={handleDiscordLink}
                    className="social-box outlined-effect flex items-center"
                  >
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
              <div className="statistics-box invite-statistics flex items-center">
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
              <div className="statistics-box invite-statistics flex items-center">
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
              <div className="statistics-box invite-statistics flex items-center">
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
              {showCopiedBox && (
                <p className="copied-box block md:hidden">Copied!</p>
              )}
              {userData.invite_code !== "" ? (
                <div className="statistics-box invite-statistics flex flex-col relative gap-4">
                  {showCopiedBox && (
                    <p className="copied-box hidden md:block">Copied!</p>
                  )}
                  <div className="flex items-center">
                    <img src={AnnouncePng} alt="fire" />
                    <p className="ml-2 text">Your invite Code</p>
                  </div>
                  <div className="invite-code-box flex items-center justify-between">
                    <p className="number">{userData.invite_code}</p>
                    <button onClick={handleCopyInviteCode} className="copy-btn">
                      <img src={ContentCopySvg} alt="copy" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="statistics-box invite-statistics flex flex-col gap-4">
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
            <div className="statistics-section flex flex-col gap-6">
              <div className="heading flex items-center justify-center md:justify-start">
                <img src={FullName} alt="statistics" />
                <p className="ml-2">OG Invite Statistics</p>
              </div>
              <div className="statistics-box og-invite-statistics flex items-center">
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
              <div className="statistics-box og-invite-statistics flex items-center">
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
              <div className="statistics-box og-invite-statistics flex items-center">
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
              {showCopiedBox && (
                <p className="copied-box block md:hidden">Copied!</p>
              )}
              {userData.invite_code !== "" ? (
                <div className="statistics-box og-invite-statistics flex flex-col relative gap-4">
                  {showCopiedBox && (
                    <p className="copied-box hidden md:block">Copied!</p>
                  )}
                  <div className="flex items-center">
                    <img src={AnnouncePng} alt="fire" />
                    <p className="ml-2 text">Your invite Code</p>
                  </div>
                  <div className="invite-code-box flex items-center justify-between">
                    <p className="number">{userData.invite_code}</p>
                    <button onClick={handleCopyInviteCode} className="copy-btn">
                      <img src={ContentCopySvg} alt="copy" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="statistics-box og-invite-statistics flex flex-col gap-4">
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
            {/* <div className="grow" />
            <img
              className="right-img self-center md:block hidden"
              src={ProfileSplash}
              alt="Profile"
            /> */}
          </div>
        </div>
      </div>
      {(isPending || isSOcialLinkPending) && <TopLoader />}

      <ErrorModal
        heading={ModalHeading}
        open={isOpenErrorModal}
        handleClose={handleErrorModal}
      />
    </>
  );
}

export default Profile;
