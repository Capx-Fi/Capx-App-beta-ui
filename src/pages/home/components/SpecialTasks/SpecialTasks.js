import React from "react";
import { ImArrowRight2 } from "react-icons/im";
import Slider from "react-slick";
import { InviteFriends } from "../../../../assets/images";
import { CardCoinIcon } from "../../../../assets/svg";
import SliderArrow from "../../../../components/SliderArrow/SliderArrow";

const SpecialTasks = () => {
  const SliderSettings = {
    dots: false,
    infinite: false,
    accessibility: true,
    variableWidth: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <SliderArrow direction="left" />,
    nextArrow: <SliderArrow direction="right" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 490,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="special-quests bg-green-12">
      <div className="wrapper">
        <Slider {...SliderSettings}>
          {Array(5)
            .fill("")
            .map((el, ind) => {
              return (
                <div
                  key={"unique" + ind}
                  className="specialcards-main flex pr-5"
                >
                  <div className="wrapper flex flex-col items-stretch rounded-xl p-3 gap-3">
                    <div className="img-box rounded-xl overflow-hidden">
                      <img
                        className="w-full h-fit card-img"
                        src={InviteFriends}
                        alt="invite"
                      />
                      <div className="card-chip md:hidden flex items-center">
                        <img src={CardCoinIcon} alt="coin" />
                        <span>4 xCapx</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="card-title">Generate Invite Code</p>
                      <div className="card-chip md:flex hidden items-center ml-10">
                        <img src={CardCoinIcon} alt="coin" />
                        <span className="ml-1">4 xCapx</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialTasks;
