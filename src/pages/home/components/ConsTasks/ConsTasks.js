import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {goldcoin,} from "../../../../assets/images/home";

const handleDragStart = (e) => e.preventDefault();

const ConsTasks = () => {
  const dailytaskdata = [
    {
      taskchip: "Daily Reward",
      tasktitle: "Your daily sign in rewards are here",
      taskbtntext: "Claim now",
      taskreward: "1 xCapx",
      taskcategory: "constant"
    },
    {
      taskchip: "Daily Reward",
      tasktitle: "Generate your referral code",
      taskbtntext: "Claim now",
      taskreward: "1 xCapx",
      taskcategory: "constant"
    },
    {
      taskchip: "Daily Reward",
      tasktitle: "Generate your referral code",
      taskbtntext: "Claim now",
      taskreward: "1 xCapx",
      taskcategory: "constant"
    },
    
  ];

  return (
    <div className="constcards">
      <div className="constcards-wrapper flex flex-col gap-8 pr-8 md:flex-row">
        {dailytaskdata.map((data, ind) => {
          return (
              <div className={`constcards-main px-4 pb-8 pt-3 basis-1/3 border-2 w-72 rounded-3xl flex flex-col gap-32 row${ind + 1}`}>
              <div className="taskchip fs-14 font-black text-cgreen-600 self-end rounded-xl">{data.taskchip}</div>
              <div className="taskdetailswrapper flex flex-col gap-4">
              <div className="tasktitle fs-22 font-black text-cgreen-600 user text-start">{data.tasktitle}</div>
              <button className="taskbtn w-full bg-cgreen-500 py-3 px-4 rounded-xl flex flex-row font-extrabold text-cgreen-100 task items-center place-content-between">
                <div className="reward-icon flex flex-row gap-2 items-center">
                  <img src={goldcoin} className="w-5"></img>
                  <p className="fs-15">{data.taskreward}</p>
                </div>
                <p>{data.taskbtntext}</p>
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsTasks;
