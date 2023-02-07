import React from "react";
import { QuestsIcon } from "../../../assets/images";
import { CoinSvg } from "../../../assets/svg";

const Banner = ({ data }) => {
  return (
    <div className="quest-banner flex flex-col md:flex-row md:place-content-between w-full gap-4 sticky top-0">
      <div className="banner-wrapper flex flex-row self-start items-center">
        <img src={QuestsIcon} alt="banner" />
        <h2 className="banner-heading ml-2 ">{data.title}</h2>
      </div>
      {data.rewards > 0 && (
        <div className="capx-chip flex flex-row self-start">
          <div className="text-left">
            <p className="">Reward</p>
          </div>
          <div className="text-right flex items-center">
            <img src={CoinSvg} alt="coin" className="" />
            <span className="ml-2 md:ml-2">{data.rewards + " xCapx"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
