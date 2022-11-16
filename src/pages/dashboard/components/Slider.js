import React from "react";
import { PenSvg } from "../../../assets/svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider = ({ heading, data }) => {
  const settings = {
    speed: 500,
    infinite: false,
    swipeToSlide: true,
    slidesToShow: 3,
    arrows: false,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 2.2,
        },
      },
    ],
  };

  const Card = () => {
    return (
      <div className="p-3">
        <div className="flex flex-col items-start border-2 border-green-300 rounded-lg p-2">
          <div className="flex fs-10 bg-green-300 px-2 self-end rounded-lg font-Black mobile-primary-text mb-5">
            <span className="font-black">01 xCapx</span>
          </div>
          <h5 className="fs-16 font-black mobile-primary-text leading-5 mb-2">
            Claim daily sign in reward
          </h5>
          <button className="green-bg-gradient text-white fs-10 font-black px-3 py-1 rounded-lg">
            Claim quest
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center">
        <img className="mr-2" src={PenSvg} alt="pen" />
        <span className="fs-16 font-black text-gray-600">{heading}</span>
      </div>

      <div className="">
        <Slider {...settings}>
          {Array(6)
            .fill("")
            .map((card) => {
              return <Card />;
            })}
        </Slider>
      </div>
    </>
  );
};

export default CustomSlider;
