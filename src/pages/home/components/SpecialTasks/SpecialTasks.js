import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const SpecialTasks = () => {
  const dailytaskdata = [
    {
      taskchip: "Exclusive",
      tasktitle: "Join our Capx meme contest",
      taskbtntext: "Start now",
      taskreward: "Upto 100 xCapx!",
      taskcategory: "exclusive"
    },
  ];

  return (
    <div className="special w-full">
      <div className="special-wrapper w-64 flex flex-col gap-5 md:flex-row">
        {dailytaskdata.map((data, ind) => {
          return (
              <div className={`special-main p-6 basis-1/3  bg-slate-50 md:w-full rounded-2xl flex flex-col gap-12 row${ind + 1}`}>
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

export default SpecialTasks;
