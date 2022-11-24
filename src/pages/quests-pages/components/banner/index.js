import React from "react";
import { BannerPlayIcon, CoinSvg } from "../../../../assets/svg";

const Banner = ({ heading }) => {
  return (
    <div className="quest-banner bg-gredient-2">
      <img src={BannerPlayIcon} alt="banner" />
      <h2 className="banner-heading text-white ml-5">What is Capx App?</h2>
      <div className="flex-grow" />
      <div className="capx-chip">
        <img src={CoinSvg} alt="coin" />
        <p className="text-white ml-4">1x Capx</p>
      </div>
    </div>
  );
};

export default Banner;
