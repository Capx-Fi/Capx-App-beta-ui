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
              <h2>
                Daily Rewards,
                <br className="md:hidden block" /> Gamified{" "}
                <br className="md:block hidden" />
                Quests, <br className="md:hidden block" />
                and more Benefits!
              </h2>
              <button className="flex items-center justify-between ">
                <span className="fs-16 font-black mr-3">Claim now</span>
                <ImArrowRight2 />
              </button>
            </div>
          </div>
          <div className="slide slider-2 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2>
                Greate going,
                <br className="md:hidden block" /> You have earned
                <br className="md:hidden block" />
                <br className="md:block hidden" /> {userData.earned_rewards}{" "}
                xCapx today!
              </h2>
              <button className="flex items-center justify-between ">
                <span className="fs-16 font-black mr-3">
                  Complete more quests
                </span>
                <ImArrowRight2 />
              </button>
            </div>
          </div>
          <div className="slide slider-3 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2>
                Reminder! Your <br className="md:hidden block" />
                unclaimed xCapx <br className="md:block hidden" /> rewards
                <br className="md:hidden block" /> are expiring soon
              </h2>
              <button className="flex items-center justify-between ">
                <span className="fs-16 font-black mr-3">Claim now</span>
                <ImArrowRight2 />
              </button>
            </div>
          </div>
          <div className="slide slider-4 flex flex-row w-full rounded-2xl md:rounded-3xl text-cgreen-100">
            <div className="flex flex-col items-start  gap-6">
              <h2>
                Join the Capx
                <br className="md:hidden block" /> Meme Contest
                <br className="md:block hidden" /> and{" "}
                <br className="md:hidden block" />
                earn upto 100 xCapx!
              </h2>
              <button className="flex items-center justify-between ">
                <span className="fs-16 font-black mr-3">Register now</span>
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
