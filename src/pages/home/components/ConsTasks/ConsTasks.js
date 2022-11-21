import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const DailyTasks = () => {
  const dailytaskdata = [
    {
      taskchip: "Daily Reward",
      tasktitle: "Your daily sign in rewards are here",
      taskbtntext: "Claim now",
      taskreward: "1 xCapx",
      taskcategory: "constant"
    },
    {
      taskchip: "Exclusive",
      tasktitle: "Generate your referral code",
      taskbtntext: "Claim now",
      taskreward: "1 xCapx",
      taskcategory: "constant"
    },
    {
      taskchip: "Daily Reward",
      tasktitle: "Your daily sign in rewards are here",
      taskbtntext: "Claim now",
      taskreward: "1 xCapx",
      taskcategory: "constant"
    },
    
  ];

  return (
    <div className="constcards w-full">
      <div className="constcards-wrapper flex flex-col gap-5 md:flex-row">
        {dailytaskdata.map((data, ind) => {
          return (
              <div className={`constcard-main p-6 basis-1/3 bg-slate-50 rounded-2xl flex flex-col gap-12 row${ind + 1}`}>
              <div className="taskchip fs-14 font-black text-cgreen-600 rounded-xl">{data.taskchip}</div>
              <div className="taskdetailswrapper flex flex-col gap-4">
              <div className="tasktitle fs-22 font-black text-cgreen-600 user text-start">{data.tasktitle}</div>
              <button className="taskbtn w-full bg-cgreen-500 p-2 rounded-2xl font-extrabold text-cgreen-100 task text-start">{data.taskbtntext}</button>
              <div className="reward earned">{data.taskreward}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyTasks;
