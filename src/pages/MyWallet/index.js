import React from "react";
import { GetStatedSvg, QuestReportIcon } from "../../assets/svg";
import MyWalletData from "./components/MyWalletData/MyWalletData";
import WalletBanner from "./components/WalletBanner/WalletBanner";

function MyWallet() {
  return (
    <div className="wallet-main flex flex-row">
      <div className="wallet-content flex flex-col">
        <div className="wallet-wrapper flex flex-col md:flex-row p-5 md:p-10 h-full overflow-y-hidden">
          <div className="wallet-1 flex flex-col h-full gap-8	">
            {/* Import for Banner -----------------------------------------------------------------------------*/}

            <WalletBanner />

            {/* Wrapper for Table -----------------------------------------------------------------------------*/}
            <div className="wallet-inner flex flex-col gap-5 md:overflow-y-scroll pr-4 md:pr-8 ">
              <div className="wallet-title flex flex-row w-full items-center gap-5">
                <div className="wallet-title-wrapper flex flex-row gap-3 w-3/4 items-center">
                  <img src={QuestReportIcon} alt="" className="w-8" />
                  <p className="font-black fs-18 text-cgreen-700 opacity-80">
                    Quests Report
                  </p>
                </div>
              </div>
              <MyWalletData />
            </div>
          </div>

          {/* Wrapper for Right Image -----------------------------------------------------------------------------*/}
          <div className="wallet-2 flex-column ml-8 items-end h-full hidden md:flex">
            <img src={GetStatedSvg} alt="LadyonRight" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWallet;
