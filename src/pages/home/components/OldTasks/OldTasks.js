import React from "react";
import { CardCoinIcon, PeopleIcon } from "../../../../assets/svg";
// import { goldcoin, peopleicon } from "../../../../assets/images/home";

const handleDragStart = (e) => e.preventDefault();

const OldTasks = ({ quests }) => {
  return (
    <div className="oldtasks">
      <div className="oldtasks-wrapper flex flex-col gap-8 md:flex-col">
        {quests.map((data, ind) => {
          return (
            <div
              className={`oldtasks-card text-cgreen-600 border-x-2 border-t-2 border-b-8 rounded-2xl fs-14 font-semibold w-full p-5 flex flex-col gap-4 row${
                ind + 1
              }`}
              key={ind}
            >
              <div className="oldtask-row-1 flex flex-col gap-3 md:flex-row w-full justify-between">
                <div className="oldtask-chip flex flex-row py-1 px-2 gap-1 items-center rounded-xl border-2">
                  <img src={CardCoinIcon} className="w-5"></img>
                  <p className="fs-12 font-black">
                    {data.taskreward + " xCapx"}
                  </p>
                </div>

                <div className="oldtask-chip flex flex-row p-2 gap-1 items-center rounded-xl border-2">
                  <p className="fs-12  font-black">
                    Completed by {data.completed_by}
                  </p>
                  <img src={PeopleIcon} className="w-5"></img>
                </div>
              </div>
              <p className="oldtask-title fs-21 px-2 pt-4">{data.tasktitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OldTasks;
