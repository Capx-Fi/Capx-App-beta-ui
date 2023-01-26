import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  ContentCopySvg,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../../../../assets/svg";
import ShareModal from "../shareModal/ShareModal";

const Codestep1 = ({ actionData }) => {
  const userInviteCode = useSelector((state) => state.user.invite_code);
  const [showSharingOptions, setShowSharingOptions] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareingPlatform, setShareingPlatform] = useState("");
  const [showCopiedBox, setShowCopiedBox] = useState(false);
  const handleshareModal = () => {
    setOpenShareModal(false);
    navigator.clipboard.writeText(
      `Join the Capx app closed alpha - app.capx-fi with my code - ${userInviteCode}`
    );
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

  const handleSocialShareButton = (platform) => {
    setShareingPlatform(platform);
    setOpenShareModal(true);
  };

  const handleCopyTextButton = () => {
    navigator.clipboard.writeText(userInviteCode);
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };
  return (
    <>
      {actionData.is_claimed === false ? <div className="codestep flex-col  w-full">
      <p className="codestep-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">
        Action #1 : Generate the invite code to earn 2 xCapx tokens
      </p>
      <div className="flex flex-col gap-8">
        <div className="codestep-wrapper w-full flex flex-col gap-6  md:rounded-3xl rounded-2xl">
          <p className=" codestep-placeholder fs-22 font-bold px-5 md:pt-4 md:pb-2 pt-2 pb-1 w-full rounded-2xl">
            * * * * *
          </p>
        </div>
        <button
          onClick={(e) =>
            actionData.handleCompleteAction(e, { type: "inviteCode" })
          }
          className="bg-gredient-2 contained-effect action-btn self-stretch flex w-full justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl text-white font-semibold fs-16"
        >
          Generate Invite Code
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
    </div>:
    <div className="codestep2 relative flex flex-col gap-3">
      <p className="codestep2-title action-heading   ">
        Action #1 : Share Invite Code
      </p>
      {showCopiedBox && <p className="copied-box ">Copied!</p>}
      <div className="codestep2-wrapper mb-3">
        <div className="codestep2-placeholder px-5 py-4 rounded-2xl text-cgreen-700 flex justify-between">
          <span> {userInviteCode}</span>
          <button
            className="flex items-center justify-center"
            onClick={handleCopyTextButton}
          >
            <img src={ContentCopySvg} alt="copy" />
          </button>
        </div>
      </div>
      <div className="codestep2-congrats w-full flex flex-col gap-6">
        <div className="codestep2-congrats-1 flex flex-col gap-4">
          <div className="social-icons flex flex-col gap-3 w-full">
            <button
              onClick={() => {
                handleSocialShareButton("Twitter");
              }}
              className=" flex w-full outlined-effect rounded-xl border-2 border-primary-200"
            >
              <img src={TwitterIcon} alt="google" />
              <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                Share on Twitter
              </span>
            </button>
            <button
              onClick={() => {
                handleSocialShareButton("Instagram");
              }}
              className=" flex w-full outlined-effect rounded-xl border-2 border-primary-200"
            >
              <img src={InstagramIcon} alt="google" />
              <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                Share on Instagram
              </span>
            </button>
            <button
              onClick={() => {
                handleSocialShareButton("Whatsapp");
              }}
              className=" flex w-full outlined-effect rounded-xl border-2 border-primary-200"
            >
              <img src={WhatsappIcon} alt="google" />
              <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                Share on Whatsapp
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>}
    <ShareModal
        open={openShareModal}
        platform={shareingPlatform}
        handleClose={handleshareModal}
        inviteCode={userInviteCode}
    />
    </>
  );
};

export default Codestep1;
