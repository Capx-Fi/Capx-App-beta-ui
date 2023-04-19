import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { config } from "../../../../config";
import { auth } from "../../../../firebase/firebase";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import  {useWeb3Auth}  from "../../../../hooks/useWeb3Auth";
import Web3 from "web3";
import { WALLET_ADAPTERS } from "@web3auth/base";

const ConnectWalletEth = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [showCopiedBox, setShowCopiedBox] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isChainAddedToWallet, setIsChainAddedToWallet] = useState(true);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const  web3AuthInstance  = useWeb3Auth();
  const [provider,setProvider] = useState(null);

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
      setIsWalletInstalled(true);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(()=>{
    const run = async () => {
        console.log(web3AuthInstance)
        if(!web3AuthInstance.provider){
            console.log("provider not initialized yet");
            return;
        }else{
            const web3 = new Web3(web3AuthInstance.provider);
            const userAccounts = await web3.eth.getAccounts();
            console.log(userAccounts);
            setWalletAddress(userAccounts[0]);
        }
        await web3AuthInstance.logout();
    }
    run()
    .then(() => {})
    .catch(error => console.log(`[Error] ${error.message}`))
  },[web3AuthInstance])

  const handleWalletConnection = async () => {
    try {
        const idToken = await auth.currentUser.getIdToken(true);
        await web3AuthInstance.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "jwt",
            extraLoginOptions: {
            id_token: idToken,
            verifierIdField: "sub", // same as your JWT Verifier ID
            domain: "http://localhost:3000",
            },
        });
        setProvider(web3AuthInstance);
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
        {actionDetails?.action_order_title}
      </p>
      {userData.wallets?.evm ? (
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
                {userData.wallets?.evm}
              </button>
            </div>
          </div>
        </div>
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
                  type: "capxWallet",
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
            Create your wallet
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

export default ConnectWalletEth;
