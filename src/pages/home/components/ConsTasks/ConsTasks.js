import React from "react";
import { CardCoinIcon } from "../../../../assets/svg";

const handleDragStart = (e) => e.preventDefault();

const ConsTasks = ({ quests }) => {
  const dailytaskdata = [...quests];

  return (
    <div className="constcards">
      <div className="constcards-wrapper flex flex-col gap-8 pr-8 md:flex-row">
        {dailytaskdata.map((data, ind) => {
          return (
            <div
              className={`constcards-main justify-between px-4 pb-8 pt-3 basis-1/3 border-2 w-72 rounded-3xl flex flex-col gap-32 row${
                ind + 1
              }`}
            >
              <div className="taskchip fs-14 font-black text-cgreen-600 self-end rounded-xl">
                {data.taskchip}
              </div>
              <div className="">
                <div className="tasktitle fs-22 font-black text-cgreen-600 user text-start">
                  {data.tasktitle}
                </div>
                <button className="taskbtn w-full bg-cgreen-500 py-3 px-4 rounded-xl flex flex-row font-extrabold text-cgreen-100 task items-center place-content-between">
                  <div className="reward-icon flex flex-row gap-2 items-center">
                    <img src={CardCoinIcon} className="w-5" alt="" />
                    <p className="fs-15">{data.taskreward + " xCapx"}</p>
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

{
  /* <div
              className={`constcards-main px-4 pb-8 pt-3 basis-1/3 border-2 w-72 rounded-3xl flex flex-col gap-32 row${
                ind + 1
              }`}
              key={data.key + String(ind)}
            >
              <div className="taskchip fs-14 font-black text-cgreen-600 self-end rounded-xl">
                {data.taskchip}
              </div>

              <div className="taskdetailswrapper flex flex-col gap-4">
                <div className="tasktitle fs-22 font-black text-cgreen-600 user text-start">
                  {data.tasktitle}
                </div>
                <button className="taskbtn w-full bg-cgreen-500 py-3 px-4 rounded-xl flex flex-row font-extrabold text-cgreen-100 task items-center place-content-between">
                  <div className="reward-icon flex flex-row gap-2 items-center">
                    <img src={CardCoinIcon} className="w-5" alt="" />
                    <p className="fs-15">{data.taskreward + " xCapx"}</p>
                  </div>
                  <p>{data.taskbtntext}</p>
                </button>
              </div>
            </div> */
}
