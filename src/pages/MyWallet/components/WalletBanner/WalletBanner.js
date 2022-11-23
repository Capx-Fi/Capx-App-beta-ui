import React from "react";
import { BannerSvg } from "../../../../assets/svg";
// import { BannerPanda } from '../../../../assets/images/wallet';

function WalletBanner() {
  return (
    <div className="banner flex flex-row w-full py-3 px-2 md:p-6 rounded-3xl md:rounder-3xl text-cgreen-100 gap-3">
      <div className="banner-panda w-6/12 md:w-2/12	">
        <img src={BannerSvg} className="" alt="" />
      </div>
      <div className="banner-content flex flex-col justify-center">
        <p className="text-2xl md:text-4xl font-black ">115 Capx</p>
        <p className="text-2xl md:text-4xl -mt-1 md:mt-0 font-black">
          earned so far!
        </p>
        <p className="fs-15 font-semibold opacity-80 pt-4">
          Great going! We have more tasks lined up for you!
        </p>
      </div>
    </div>
  );
}

export default WalletBanner;
