import React from "react";

const token_name = {
  IOU: "xCapx",
  CMDX: "xCMDX",
};
const QuestTable = ({ quests }) => {
  return (
    <div className="quest-table">
      <div className="table-wrapper">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-heading text-start">Date</th>
              <th className="table-heading text-start">Quest Details</th>
              <th className="table-heading">Total Earnings</th>
            </tr>
          </thead>
          <tbody>
            {quests.map((details, ind) => {
              return (
                <tr>
                  <td className="table-data whitespace-nowrap">
                    {details.date}
                  </td>
                  <td className="table-data text-start">{details.title}</td>
                  <td className="table-data text-center whitespace-nowrap">
                    {details.earned_rewards} {token_name[details.rewards_type]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestTable;
