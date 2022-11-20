import React from "react";
import { BannerSvg } from "../../assets/svg";

const Banner = () => {
  return (
    <div className="banner bg-gredient-2">
      <img src={BannerSvg} alt="banner" />
      <h2 className="banner-heading text-white">
        You’re on leaderboard <span className="inline-block">rank #8!</span>
      </h2>
    </div>
  );
};

export default Banner;
