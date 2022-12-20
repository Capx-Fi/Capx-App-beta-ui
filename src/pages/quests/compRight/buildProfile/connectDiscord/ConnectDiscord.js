import React, { useState } from "react";
import { DiscordContainedSvg } from "../../../../../assets/svg";
import { HiArrowRight } from "react-icons/hi";
import ActionCompleteModal from "../../actionConpleteModal/ActionCompleteModal";

const ConnectDiscord = () => {
  const [showClaimBtn, setShowClaimBtn] = useState(false);
  const [showActionCompleteDialog, setShowActionCompleteDialog] =
    useState(false);

  const handleShowClaimBtn = () => {
    setShowClaimBtn((prev) => (prev ? false : true));
  };

  const handleActionCompleteDialog = () => {
    setShowActionCompleteDialog((prev) => (prev ? false : true));
  };

  return (
    <>
      <div className="connect-discord-action flex flex-col gap-3">
        <p className="action-heading">
          Action #3 : Connect your Twitter to earn 2 xCapx
        </p>
        {!showClaimBtn && (
          <button
            onClick={handleShowClaimBtn}
            className="twitter-box flex items-center justify-center"
          >
            <span>Connect your Twitter</span>
            <img className="ml-2" src={DiscordContainedSvg} alt="twitter" />
          </button>
        )}
        {showClaimBtn && (
          <>
            <div className="twitter-box disable flex items-center justify-center">
              <img
                className="mr-2 hidden md:block"
                src={DiscordContainedSvg}
                alt="twitter"
              />
              <img
                className="mr-2 block md:hidden"
                src={DiscordContainedSvg}
                alt="twitter"
              />
              <span>Connected : @johndoe88</span>
            </div>
            <button
              onClick={handleActionCompleteDialog}
              className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
            >
              Claim 2 xCapx
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

export default ConnectDiscord;
