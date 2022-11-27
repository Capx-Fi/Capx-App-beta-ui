import React from "react";
import { BannerPlayIcon, CoinSvg } from "../../../assets/svg";

const Banner = ({ title }) => {
  return (
    <div className="quest-banner bg-gredient-2 flex flex-col md:flex-row md:place-content-between w-full gap-4 sticky top-0">
      <div className="banner-wrapper flex flex-row self-start items-center">
      <img src={BannerPlayIcon} alt="banner" />
      <h2 className="banner-heading text-cgreen-100 ml-2">{title.qtitle}</h2>
      </div>
      <div className="capx-chip flex flex-row self-start">
        <img src={CoinSvg} alt="coin" className=""/>
        <p className="text-white ml-4">{title.qreward}</p>
      </div>
    </div>
  );
};

export default Banner;
