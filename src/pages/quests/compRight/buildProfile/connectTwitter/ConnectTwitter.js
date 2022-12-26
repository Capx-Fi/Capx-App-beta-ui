import React, { useState } from "react";
import {
  GrayTwitterIconSvg,
  TwitterContainedwhiteSvg,
} from "../../../../../assets/svg";
import { HiArrowRight } from "react-icons/hi";
import { useLinkAuthProviders } from "../../../../../hooks/useLinkAuthProviders";
import ActionCompleteModal from "../../actionConpleteModal/ActionCompleteModal";
import { useEffect } from "react";
import useFirebaseReAuth from "../../../../../hooks/useFirebaseReAuth";
import { useNavigate } from "react-router-dom";

const ConnectTwitter = ({ actionData }) => {
  const navigate = useNavigate();
  const [showActionCompleteDialog, setShowActionCompleteDialog] =
    useState(false);
  const [fetchUpdatedToken, setFetchUpdatedToken] = useState(false);
  const { isPending, accessToken } = useFirebaseReAuth(fetchUpdatedToken);
  const [showClaimBtn, setShowClaimBtn] = useState(false);
  const {
    linkWithSocail,
    error: linkSocalError,
    isPending: isSOcialLinkPending,
    linkDone: linkDone,
  } = useLinkAuthProviders();

  const handleActionCompleteDialog = () => {
    setShowActionCompleteDialog((prev) => (prev ? false : true));
  };

  const handleSocialLink = async (method) => {
    linkWithSocail(method);
  };

  useEffect(() => {
    if (linkDone === true && !fetchUpdatedToken) {
      setFetchUpdatedToken(true);
    } else if (linkDone === true && fetchUpdatedToken && !isPending) {
      let input = {
        type: "connectTwitter",
        accessToken: accessToken,
      };
      actionData.handleCompleteAction(null, input);
    }
  }, [linkDone, isPending]);

  return (
    <>
      <div className="connect-twitter-action flex flex-col gap-3">
        <p className="action-heading">
          {actionData?.is_claimed === false
            ? actionData?.action_title
            : "ALL TASKS COMPLETE"}
        </p>
        {actionData?.action_order_status !== "COMPLETED" && (
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
        {actionData?.action_order_status === "COMPLETED" &&
          actionData.is_claimed === false && (
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
                <span>Twitter Connected</span>
              </div>
              <button
                onClick={(e) => {
                  // actionData.handleCompleteAction(e, { type: "profile", value: "" })
                  actionData?.claimRewardHandler();
                }}
                className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
              >
                Claim 1 xCapx
                <HiArrowRight className="text-xl " />
              </button>
            </>
          )}
        {actionData.action_order_status === "COMPLETED" &&
          actionData.is_claimed === true && (
            <button
              onClick={(e) => {
                // actionData.handleCompleteAction(e, { type: "profile", value: "" })
                navigate("/");
              }}
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
            >
              Go to Home Page
              <HiArrowRight className="text-xl " />
            </button>
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
