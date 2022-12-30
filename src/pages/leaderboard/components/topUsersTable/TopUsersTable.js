import React from "react";

const TopUsersTable = ({ userData }) => {
  return (
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
            {userData.slice(3, 10).map((user, ind) => {
              console.log(user);
              return (
                <tr key={user.username + ind}>
                  <td className="table-data">#{user.position}</td>
                  <td className="table-data text-center">{user.username}</td>
                  <td className="table-data text-center">
                    {user.quests} Quests
                  </td>
                  <td className="table-data text-center">
                    {user.earned_rewards} xCapx
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

export default TopUsersTable;
