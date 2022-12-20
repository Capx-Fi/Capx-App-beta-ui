import React, { useState } from "react";
import {
  GrayTwitterIconSvg,
  TwitterContainedwhiteSvg,
} from "../../../../../assets/svg";
import { HiArrowRight } from "react-icons/hi";
import { useLinkAuthProviders } from "../../../../../hooks/useLinkAuthProviders";
import ActionCompleteModal from "../../actionConpleteModal/ActionCompleteModal";

const ConnectTwitter = ({ actionData }) => {
  const [showActionCompleteDialog, setShowActionCompleteDialog] =
    useState(false);
  const {
    linkWithSocail,
    error: linkSocalError,
    isPending: isSOcialLinkPending,
  } = useLinkAuthProviders();

  const handleActionCompleteDialog = () => {
    setShowActionCompleteDialog((prev) => (prev ? false : true));
  };

  const handleSocialLink = async (method) => {
    linkWithSocail(method);
    //if (linkSocalError) showModalFunc(true);
  };

  return (
    <>
      <div className="connect-twitter-action flex flex-col gap-3">
        <p className="action-heading">
          {actionData?.action_title}
        </p>
        {actionData?.action_order_status !== 'COMPLETED' && (
          <button
            onClick={() => {
              handleSocialLink("twitter");
            }}
            className="twitter-box flex items-center justify-center"
          >
            <span>Connect your Twitter</span>
            <img
              className="ml-2"
              src={TwitterContainedwhiteSvg}
              alt="twitter"
            />
          </button>
        )}
        {actionData?.action_order_status === 'COMPLETED' && (
          <>
            <div className="twitter-box disable flex items-center justify-center">
              <img
                className="mr-2 hidden md:block"
                src={TwitterContainedwhiteSvg}
                alt="twitter"
              />
              <img
                className="mr-2 block md:hidden"
                src={GrayTwitterIconSvg}
                alt="twitter"
              />
              <span>Connected : @johndoe88</span>
            </div>
            <button
              onClick={handleActionCompleteDialog}
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
            >
              Claim 1 xCapx
              <HiArrowRight className="text-xl " />
            </button>
          </>
        )}
      </div>
      <ActionCompleteModal
        open={showActionCompleteDialog}
        handleClose={handleActionCompleteDialog}
      />
    </>
  );
};

export default ConnectTwitter;
