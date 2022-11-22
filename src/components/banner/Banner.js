import React from "react";
import { BannerSvg } from "../../assets/svg";

const Banner = ({ heading }) => {
  return (
    <div className="banner bg-gredient-2">
      <img src={BannerSvg} alt="banner" />
      <h2 className="banner-heading text-white">{heading}</h2>
    </div>
  );
};

export default Banner;
