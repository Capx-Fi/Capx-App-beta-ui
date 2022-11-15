import React from "react";

const QuestCard = () => {
  return (
    <div className="bg-gray-200 w-full flex rounded-2xl p-4">
      <div
        className="h-48 lg:h-auto w-40 lg:w-40 bg-white rounded-xl flex-none bg-cover text-center overflow-hidden"
        title="Woman holding a mug"
      ></div>
      <div className="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-start pl-2 leading-normal">
        <div className="mb-4">
          <div className="text-gray-900 font-semibold fs-20 text-xl mb-2">
            What is Capx App?
          </div>
          <p className="text-gray-700 text-base fs-15 font-medium">
            Reward: 10 xCapx
          </p>
          <p className="text-gray-700 text-baseb fs-15 font-medium">
            Ending: 10 days 24 hours 45 mins
          </p>
        </div>
        <div className="flex items-center">
          <button className="fs-14 bg-transparent hover:bg-gray-900 text-gray-900 font-medium hover:text-white py-1 px-3 border border-gray-900 hover:border-transparent rounded-xl">
            Start now
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
