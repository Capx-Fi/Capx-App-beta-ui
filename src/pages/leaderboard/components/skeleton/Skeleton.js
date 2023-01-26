import React from "react";
import { LeaderboardSplash } from "../../../../assets/images";

const Skeleton = () => {
  return (
    <div className="leaderboard-skeleton flex flex-col gap-6 animate-pulse">
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
      <div className="flex">
        <div className="top-users-table">
          <div className="table-wrapper">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-heading">
                    <span className="md:inline-block hidden">User</span>{" "}
                    <span>Rank</span>
                  </th>
                  <th className="table-heading">User Name</th>
                  <th className="table-heading">No. of Quests Completed</th>
                  <th className="table-heading">Total Earnings</th>
                </tr>
              </thead>
              <tbody>
                {Array(7)
                  .fill("")
                  .map((user, ind) => {
                    return (
                      <tr key={user.username + ind}>
                        <td className="table-data">
                          <div className="flex justify-start">
                            <div className="skeleton-bg rounded position" />
                          </div>
                        </td>
                        <td className="table-data text-center">
                          <div className="flex justify-center">
                            <div className="skeleton-bg rounded name" />
                          </div>
                        </td>
                        <td className="table-data text-center">
                          <div className="flex justify-center">
                            <div className="skeleton-bg rounded quests" />
                          </div>
                        </td>
                        <td className="table-data text-center">
                          <div className="flex justify-center">
                            <div className="skeleton-bg rounded earned" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="splash-img grow md:flex justify-center items-center hidden ">
          <img src={LeaderboardSplash} alt="Trophy" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
