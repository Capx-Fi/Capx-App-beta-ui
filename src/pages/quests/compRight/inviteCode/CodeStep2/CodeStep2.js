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

const Codestep2 = ({ actionData }) => {
  const userInviteCode = useSelector((state) => state.user.invite_code);
  const [showSharingOptions, setShowSharingOptions] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareingPlatform, setShareingPlatform] = useState("");
  const [showCopiedBox, setShowCopiedBox] = useState(false);

  const handleshareModal = () => {
    setOpenShareModal(false);
    navigator.clipboard.writeText(
      "Join the Capx app closed alpha - app.capx-fi with my code - B5OCO"
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
        {!showSharingOptions &&
          actionData?.action_order_status !== "COMPLETED" && (
            <button
              className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl "
              onClick={() => {
                setShowSharingOptions(true);
              }}
            >
              Invite Your Frens
              <HiArrowRight className="text-xl ml-4" />
            </button>
          )}

        {showSharingOptions && actionData?.is_claimed === false && (
          <div className="codestep2-congrats w-full flex flex-col gap-6">
            <div className="codestep2-congrats-1 flex flex-col gap-4">
              <div className="social-icons flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    handleSocialShareButton("Twitter");
                  }}
                  className=" flex w-full rounded-xl border-2 border-primary-200"
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
                  className=" flex w-full rounded-xl border-2 border-primary-200"
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
                  className=" flex w-full rounded-xl border-2 border-primary-200"
                >
                  <img src={WhatsappIcon} alt="google" />
                  <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                    Share on Whatsapp
                  </span>
                </button>
              </div>
              <button
                className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl "
                onClick={(e) =>
                  actionData.handleCompleteAction(e, { type: "inviteCode" })
                }
              >
                Complete Quest
                <HiArrowRight className="text-xl ml-4" />
              </button>
            </div>
          </div>
        )}
        {actionData?.is_claimed === true && (
          <div className="codestep2-congrats w-full flex flex-col gap-6">
            <div className="codestep2-congrats-1 flex flex-col gap-4">
              <div className="social-icons flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    handleSocialShareButton("Twitter");
                  }}
                  className=" flex w-full rounded-xl border-2 border-primary-200"
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
                  className=" flex w-full rounded-xl border-2 border-primary-200"
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
                  className=" flex w-full rounded-xl border-2 border-primary-200"
                >
                  <img src={WhatsappIcon} alt="google" />
                  <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                    Share on Whatsapp
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ShareModal
        open={openShareModal}
        platform={shareingPlatform}
        handleClose={handleshareModal}
        inviteCode={userInviteCode}
      />
    </>
  );
};

export default Codestep2;
