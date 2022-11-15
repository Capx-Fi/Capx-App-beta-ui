import React from "react";

const QuestCard = () => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg rounded-2xl  p-4 card">
      <div className="h-32 w-100 bg-white rounded-xl mb-2"></div>
      <div class="">
        <h3 class="font-bold fs-20 mb-2">The Coldest Sunset</h3>
        <p class="text-gray-700 fs-15 text-base font-medium mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
        <p class="text-gray-700 fs-15 text-base font-medium">
          Reward: 10 xCapx
        </p>
        <p class="text-gray-700 fs-15 text-base font-medium mb-4">
          Ending: 10 days 24 hours 45 mins
        </p>
      </div>
      <button className="fs-14 bg-transparent hover:bg-gray-900 text-gray-900 font-medium hover:text-white py-1 px-3 border border-gray-900 hover:border-transparent rounded-xl">
        Start now
      </button>
    </div>
  );
};

export default QuestCard;
