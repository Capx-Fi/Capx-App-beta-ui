import React from "react";
import { HiArrowRight } from "react-icons/hi";

const singleQuiz = () => {
return (

<div className="quiz md:pl-10 px-3">
<p className="quiz-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #2 : Answer the questions below</p>
<div className="quiz-box self-stretch mb-10 py-5 pl-5 pr-10 border-1 rounded-2xl">
  <h5 className="quiz-question mb-4 fs-16 font-semibold text-cgreen-700">
    What do you earn as rewards from Capx app ?
  </h5>
  <div className="quiz-answers fs-15 text-cgreen-700 font-medium flex flex-col gap-3 ">
    <a className="answer p-1 px-4 border-1 rounded-xl">IOU Rewards</a>
    <a className="answer p-1 px-4 border-1 rounded-xl">XP Rewards</a>
    <a className="answer p-1 px-4 border-1 rounded-xl">Point Rewards</a>
  </div>
</div>

<button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full">
    Submit Response <HiArrowRight className="text-xl ml-4" />
  </button>

</div>

);
};

export default singleQuiz;