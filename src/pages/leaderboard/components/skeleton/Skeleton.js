import React from "react";

const Skeleton = () => {
  return (
    <div className="leaderboard-skeleton animate-pulse">
      <div className="flex md:flex-row flex-col gap-6">
        {Array(3)
          .fill("")
          .map((skeleton, ind) => {
            return (
              <div key={ind} className="top-cards flex gap-6 grow p-3">
                <div className="grow hidden md:block" />
                <div className="skeleton-bg profile-img p-5 rounded-full" />
                <div className="gap-3 flex flex-col">
                  <div className="line-1 skeleton-bg rounded" />
                  <div className="line-2 skeleton-bg  rounded" />
                  <div className="line-3 skeleton-bg rounded hidden md:block" />
                </div>
                <div className="grow hidden md:block" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Skeleton;
