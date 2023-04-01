import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { config } from "../../../../config";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";

const ConnectWallet = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [showCopiedBox, setShowCopiedBox] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isChainAddedToWallet, setIsChainAddedToWallet] = useState(true);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  const userData = useSelector((state) => state.user);
  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_COLLECTION}/` +
      actionData.questID +
      `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    ["__name__", "==", String(actionData.action_order_id)]
  );

  useEffect(() => {
    if (data) {
      setActionDetails(data[0]);
      if (window.keplr) {
        setIsWalletInstalled(true);
      } else {
        setIsWalletInstalled(false);
      }
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleWalletConnection = async () => {
    try {
      await window.keplr.enable("comdex");
      setIsChainAddedToWallet(true);
      const offlineSigner = await window.getOfflineSigner("comdex");
      const keplrAccounts = await offlineSigner.getAccounts();
      setWalletAddress(keplrAccounts[0].address);
    } catch (error) {
      if (error.message === "There is no chain info for comdex") {
        setIsChainAddedToWallet(false);
      }
    }
  };

  const handleCopyTextButton = () => {
    navigator.clipboard.writeText(walletAddress);
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

  return (
    <div className="connect-wallet flex flex-col gap-3">
      <p className="reward-title action-heading">
        {userData.wallets?.cosmos?.comdex
          ? "Wallet Connected"
          : !isWalletInstalled
          ? "Action #2 : Download extention"
          : actionDetails?.action_order_title}
      </p>
      {userData.wallets?.cosmos?.comdex ? (
        <div className="createtweet relative flex flex-col gap-3">
          {showCopiedBox && <p className="copied-box ">Copied!</p>}

          <div className="createtweet-wrapper p-4 w-full border-2 rounded-3xl flex flex-col gap-8">
            <div className="createtweet-1 flex flex-col gap-1">
              <p className="heading text-cgreen-700 opacity-50 font-medium pl-2 fs-15">
                Click the below block to copy Wallet address
              </p>
              <button
                onClick={handleCopyTextButton}
                className="copy-tweet p-4 items-start text-left"
              >
                {userData.wallets?.cosmos?.comdex}
              </button>
            </div>
          </div>
        </div>
      ) : !isWalletInstalled ? (
        <>
          <p className="quest-text text-center">
            You have not installed the wallet extention, please install the
            extension and connect to the comdex chain and refresh the page
          </p>
          <button
            onClick={() => {
              window.open("https://www.keplr.app/download");
            }}
            className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full"
          >
            Download the extension
          </button>
        </>
      ) : walletAddress.length > 0 ? (
        <div className="createtweet relative flex flex-col gap-3">
          {showCopiedBox && <p className="copied-box ">Copied!</p>}

          <div className="createtweet-wrapper p-4 w-full border-2 rounded-3xl flex flex-col gap-8">
            <div className="createtweet-1 flex flex-col gap-1">
              <p className="heading text-cgreen-700 opacity-50 font-medium pl-2 fs-15">
                Click the below block to copy Wallet address
              </p>
              <button
                onClick={handleCopyTextButton}
                className="copy-tweet p-4 items-start text-left"
              >
                {walletAddress}
              </button>
            </div>

            <button
              className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full"
              onClick={(e) => {
                actionData.handleCompleteAction(e, {
                  type: "harborAirdrop",
                  value: { address: walletAddress },
                });
              }}
            >
              {actionDetails?.action_order_cta}
              <HiArrowRight className="text-xl ml-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={handleWalletConnection}
            className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full"
          >
            Connect your wallet
          </button>
          {!isChainAddedToWallet && (
            <p className="quest-text text-center">
              Please add comdex chain into your wallet.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
