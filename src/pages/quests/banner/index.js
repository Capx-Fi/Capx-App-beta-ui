import React from "react";
import { BannerPlayIcon, CoinSvg } from "../../../assets/svg";

const Banner = ({ data }) => {
  console.log(data);
  return (
    <div className="quest-banner flex flex-col md:flex-row md:place-content-between w-full gap-4 sticky top-0">
      <div className="banner-wrapper flex flex-row self-start items-center">
        <img src={BannerPlayIcon} alt="banner" />
        <h2 className="banner-heading ml-2 capitalize">{data.title}</h2>
      </div>
      <div className="capx-chip flex flex-row self-start">
        <img src={CoinSvg} alt="coin" className="" />
        <p className=" ml-2 md:ml-4">{data.rewards + " xCapx"}</p>
      </div>
    </div>
  );
};

export default Banner;
