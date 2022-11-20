import React from "react";

const Table = () => {
  const tableData = [
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
    {
      rank: "01",
      user: "@johndoe",
      task: "1",
      earned: "18 xCapx",
    },
  ];

  return (
    <div className="leaderboard-table w-full">
      <div className="thead">
        <div className="tr">
          <div className="th rank text-start">Rank</div>
          <div className="th user text-center">User</div>
          <div className="th task text-center">Tasks Completed</div>
          <div className="th earned text-start">xCapx Earned</div>
        </div>
      </div>

      <div className="tbody">
        {tableData.map((data, ind) => {
          return (
            <div className={`tr row${ind + 1}`}>
              <div className="td rank ">{data.rank}</div>
              <div className="td user text-center">{data.user}</div>
              <div className="td task text-center">{data.task}</div>
              <div className="td earned">{data.earned}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
