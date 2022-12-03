import React from "react";
import { HiArrowRight } from "react-icons/hi";

const watchVideo = () => {
  return (
    <div className="watch-video flex-col md:ml-20 px-5 md:px-0">
      <p className="action-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : What is Capx App?</p>
      <div className="video-wrapper p-2 pb-5 bg-slate-50 w-full rounded-3xl border-2 mb-10">
        <iframe src='https://www.youtube.com/embed/GvhWAIFosF8'
        frameborder='0' allow='autoplay; encrypted-media'
        allowfullscreen title='video' className="rounded-2xl"/>
      </div>
        <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full">
            Complete Action
            <HiArrowRight className="text-xl ml-4" />
          </button>
    </div>
  );
};

export default watchVideo;
