import React from "react";
import { BannerPlayIcon, CoinSvg } from "../../../../assets/svg";

const Banner = () => {
  return (
    <div className="new-quest-banner flex flex-col md:flex-row md:items-center items-start justify-between gap-3">
      <div className="flex items-center">
        <img className="banner-icon" src={BannerPlayIcon} alt="play" />
        <h2 className="banner-heading md:ml-5 ml-2">What is Capx App?</h2>
      </div>
      <div className="banner-chip flex items-center">
        <img className="" src={CoinSvg} alt="coin" />
        <span className="ml-2">4 xCapx</span>
      </div>
    </div>
  );
};

export default Banner;
