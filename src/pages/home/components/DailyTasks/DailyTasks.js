import React, { useEffect, useState } from "react";
import { CardCoinIcon, dailyTaskCardIcon } from "../../../../assets/svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";

const handleDragStart = (e) => e.preventDefault();

const DailyTasks = ({ quests }) => {
  console.log(quests);
  const navigate = useNavigate();
  const [questId, setQuestId] = useState(null);
  const [url, setUrl] = useState(
    "https://capx-gateway-cnfe7xc8.uc.gateway.dev"
  );
  const { isError, isPending, postData, data } = useApi(url, "POST");

  const dailytaskdata = [...quests];

  const handleClick = (e, questId) => {
    e.preventDefault();
    console.log(questId);
    setQuestId(questId);
    const apiDataObject = { data: { questId: questId } };
    postData(apiDataObject, "/registerUserForQuest");
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      navigate("/quest?", {
        state: { questID: "f7ILwJaAwQ+2n4D8euNpQ0lVuFJJAYLvw9O2niisDZM=_1" },
      });
    }
  }, [data]);

  return (
    <div className="dailycards">
      <div className="dailycards-wrapper flex flex-col gap-8 pr-8 md:flex-row">
        {dailytaskdata.map((data, ind) => {
          return (
            <div
              className={`dailycard-main justify-between px-4 pb-8 pt-3 basis-1/3 border-2 rounded-3xl flex flex-col gap-12 row${
                ind + 1
              }`}
              key={ind}
            >
              <div className="fs-14 font-black text-cgreen-600 rounded-xl flex justify-between items-center">
                <img src={dailyTaskCardIcon} alt="Coin" />
                <div className="taskchip fs-14 font-black text-cgreen-600 rounded-xl flex items-center">
                  <img src={CardCoinIcon} alt="Coin" />
                  <span>1 xCapx</span>
                </div>
              </div>
              <div className="taskdetailswrapper flex flex-col gap-4">
                <div className="tasktitle fs-22 font-black text-cgreen-600 user text-start">
                  {data.tasktitle}
                </div>
                <button
                  className="taskbtn w-full bg-cgreen-500 py-3 px-4 rounded-xl flex flex-row font-extrabold text-cgreen-100 task items-center place-content-between"
                  onClick={(e) => {
                    handleClick(e, data.id);
                  }}
                >
                  <div className="reward-icon flex flex-row gap-2 items-center">
                    <img src={CardCoinIcon} className="w-5" />
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

export default DailyTasks;
