import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { PandaHandImg } from "../../../assets/images";

const Banner = () => {
  return (
    <>
      {/* dekstop banner */}
      <div className="dark-bg-gradient-2 rounded-xl px-10 py-16 mb-6 md:block hidden">
        <div class="grid md:grid-cols-1 md:grid-cols-3 gap-3">
          <div class="md:col-span-2 col-span-1 md:mb-0 mb-6">
            <h2 className="text-white leading-tight fs-44 text-4xl font-semibold">
              Congratulations!
              <br /> You made it to Day 2
            </h2>
            <p className="text-white fs-18 font-normal">
              We have the next set of quests, challenges and more ready for you!
            </p>
          </div>
          <div class="col-span-1 flex flex-col md:pr-7">
            <button className="fs-16 text-center flex justify-center items-center whitespace-no-wrap font-bold text-white light-bg-gradient flex mb-6 rounded-lg px-6 py-4">
              <span>Claim today’s Sign in reward</span>
              <BiRightArrowAlt className="text-2xl" />
            </button>
            <button className="fs-16 text-center flex justify-center items-center whitespace-no-wrap font-bold text-white light-bg-gradient flex rounded-lg px-6 py-4">
              <span>Complete next quest</span>
              <BiRightArrowAlt className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile banner */}
      <div className="green-bg-gradient rounded-xl p-4 mb-6 md:hidden block">
        <div class="grid md:grid-cols-1 md:grid-cols-3 gap-3">
          <div class="md:col-span-2 col-span-1 md:mb-0">
            <div className="flex">
              <div className="mb-4">
                <img
                  className="inline-block h-14 w-14 rounded-full mr-2  yellow-bg-gradient"
                  src={PandaHandImg}
                  alt="Avatar"
                />
              </div>
              <h2 className="text-white leading-7 fs-24 font-semibold">
                Welcome back!
                <br /> You made it to Day 2
              </h2>
            </div>
            <p className="text-white fs-13 font-medium leading-4">
              Great going! We have new quests and interesting updates lined up
              for you
            </p>
          </div>
          <div class="col-span-1 flex flex-col md:pr-7"></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
