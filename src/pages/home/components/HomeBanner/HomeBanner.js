import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BannerPanda } from '../../../../assets/images/wallet';

const handleDragStart = (e) => e.preventDefault();

function HomeBanner() {
  return (
      <div className="banner flex flex-row w-full p-3 md:p-6 rounded-2xl md:rounded-3xl text-cgreen-100 gap-3">
          <div className="banner-panda w-6/12 md:w-2/12	"><img src={BannerPanda} className="" alt=""/></div>
          <div className="banner-content flex flex-col justify-center">
            <p className="text-2xl md:text-4xl font-black ">5 xCapx</p>
            <p className="text-2xl md:text-4xl -mt-1 md:mt-1 font-black">earned so today!</p>
            <p className="fs-13 font-semibold opacity-80 pt-2">Great going! We have more tasks lined up for you!</p>
          </div>

      </div>
    );
};

export default HomeBanner;
