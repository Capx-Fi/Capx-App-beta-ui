import React from "react";
import { BannerSvg } from "../../../../assets/svg";

const handleDragStart = (e) => e.preventDefault();

function HomeBanner() {
  return (
    <div className="banner flex flex-row w-full p-3 md:p-6 rounded-2xl md:rounded-3xl text-cgreen-100 gap-3">
      <div className="banner-panda">
        <img src={BannerSvg} className="" alt="" />
      </div>
      <div className="banner-content flex flex-col justify-center">
        <p className="text-2xl md:text-4xl font-black ">
          5 xCapx earned so today!
        </p>

        <p className="fs-13 font-semibold opacity-80 pt-2">
          Great going! We have more tasks lined up for you!
        </p>
      </div>
    </div>
  );
}

export default HomeBanner;
