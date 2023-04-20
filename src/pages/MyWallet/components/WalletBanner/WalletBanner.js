import React, { useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blueWalletSvg, ContentCopySvg } from "../../../../assets/svg";

const WalletBanner = () => {
  const [showCopiedBox, setShowCopiedBox] = useState(false);
  const userData = useSelector((state) => state.user);

  const handleAddressCopy = () => {
    navigator.clipboard.writeText(userData.wallets.evm);
    setShowCopiedBox(true);
    setTimeout(() => {
      setShowCopiedBox(false);
    }, 1500);
  };

  return (
    <>
      <div className="wallet-banner rounded-2xl w-full md:rounded-3xl">
        <div className="flex flex-col items-start  gap-6">
          <div className="flex md:gap-6 gap-3 flex-wrap">
            <div className="balance-wrapper flex flex-col md:gap-3 gap-2">
              <h4 className="text-center mt-2">{userData.earned_rewards}</h4>
              <p className="text-center">xCapx</p>
            </div>
            <div className="balance-wrapper flex flex-col md:gap-3 gap-2">
              <h4 className="text-center mt-2">
                {userData.comdex_earned_rewards}
              </h4>
              <p className="text-center">xHARBOR</p>
            </div>
            {userData.wallets.evm && userData.wallets.evm.length > 0 && (
              <div className="address-wrapper relative md:flex flex-col md:gap-3 gap-2 hidden">
                {showCopiedBox && <p className="copy-not">Copied!</p>}

                <h4 className="address-title">Your Capx App Wallet Address</h4>
                <div className="adress-box flex items-center justify-between">
                  <span className="address">
                    {userData.wallets.evm.slice(0, 9)}...
                    {userData.wallets.evm.slice(
                      userData.wallets.evm.length - 7,
                      userData.wallets.evm.length
                    )}
                  </span>
                  <button onClick={handleAddressCopy}>
                    <img src={ContentCopySvg} alt="copy" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {userData.wallets.evm && userData.wallets.evm.length > 0 && (
        <>
          {showCopiedBox && <p className="copy-not">Copied!</p>}
          <div className="address-wrapper relative flex flex-col md:gap-3 gap-2 md:hidden">
            <div className="flex items-center gap-2">
              <img src={blueWalletSvg} alt="wallet" />
              <h4 className="address-title">Your Capx App Wallet Address</h4>
            </div>
            <div className="adress-box flex items-center justify-between">
              <span className="address">
                {userData.wallets.evm.slice(0, 9)}...
                {userData.wallets.evm.slice(
                  userData.wallets.evm.length - 7,
                  userData.wallets.evm.length
                )}
              </span>
              <button onClick={handleAddressCopy}>
                <img src={ContentCopySvg} alt="copy" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WalletBanner;
