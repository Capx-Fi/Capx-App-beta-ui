import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImArrowRight2 } from "react-icons/im";

function HomeBanner() {
  const sliderSettings = {
    dots: true,
    dotsClass: "slick-dots line-indicator",
    fade: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-banner  rounded-2xl md:rounded-3xl ">
      <div className="w-full">
        <Slider {...sliderSettings}>
          {/* <div className="slide slider-1 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2 className="gredient-text-2">
                Explore the World of Web3
                <br /> with Quests, Challenges
                <br className="block md:hidden" /> &{" "}
                <br className="hidden md:block" />
                Weekly Contests
              </h2>
            </div>
          </div>
          <div className="slide slider-2 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2 className="gredient-text-2">
                Earn Unlimited
                <br className="block md:hidden" /> Rewards &{" "}
                <br className="hidden md:block" />
                Build
                <br className="block md:hidden" /> your On-chain
                <br className="block md:hidden" /> Reputation
              </h2>
            </div>
          </div>
          <div className="slide slider-4 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2 className="gredient-text-2">
                Capx Meme Contest
                <br /> Earn upto 100xCapx
                <br /> Coming Soon!
              </h2>
            </div>
          </div> */}
          <div className="slide slider-1 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2 className="gredient-text-2">
                Come join hundreds of <br className="md:hidden block" /> others
                in the
                <br className="hidden md:block" /> gang-gang
                <br className="md:hidden block" /> contest to earn big!
              </h2>
              <button className="banner-btn contained-effect flex items-center bg-gredient-2 hidden md:flex justify-between">
                <span className="fs-16 font-black mr-3">Participate</span>
                <ImArrowRight2 />
              </button>
            </div>
          </div>
          <div className="slide slider-2 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2 className="gredient-text-2">
                Tweet a little, flex a lot,
                <br /> to earn 5 xCapx tokens
              </h2>
              <button className="banner-btn contained-effect flex items-center bg-gredient-2 hidden md:flex justify-between">
                <span className="fs-16 font-black mr-3">Begin Quest</span>
                <ImArrowRight2 />
              </button>
            </div>
          </div>
          <div className="slide slider-3 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2 className="gredient-text-2">
                Capx App is your one
                <br className="md:hidden block" /> place to learn,
                <br className="md:block hidden" /> explore,
                <br className="md:hidden block" /> contribute & earn IOU
                <br className="md:hidden block" /> tokens!
              </h2>
              <button className="banner-btn contained-effect flex items-center bg-gredient-2 hidden md:flex justify-between">
                <span className="fs-16 font-black mr-3">Begin Quests</span>
                <ImArrowRight2 />
              </button>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default HomeBanner;
