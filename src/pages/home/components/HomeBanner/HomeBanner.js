import React from "react";
import Slider from "react-slick";
import { ImArrowRight2 } from "react-icons/im";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const handleDragStart = (e) => e.preventDefault();

function HomeBanner() {
  const userData = useSelector((state) => state.user);

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
          <div className="slide slider-1 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
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
          <div className="slide slider-3 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
          <div className="flex flex-col items-start  gap-6">
              <h2 className="gredient-text-2">
                Reminder! Your
                <br className="block md:hidden" /> Unclaimed
                <br className="hidden md:block" />
                xCapx
                <br className="block md:hidden" /> Tokens will expire
                <br className="block md:hidden" /> soon
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
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default HomeBanner;
