import React from "react";

const MyWalletData = () => {
  const walletData = [
    {
      serial: "01",
      taskDetails: "Claim Daily Sign In Rewards",
      taskCategory: "Daily Quest",
      completionDate: "17th Nov. 2022",
      earned: "+1 xCapx",
    },
    {
      serial: "02",
      taskDetails: "Participate in Capx meme contest",
      completionDate: "17th Nov. 2022",
      taskCategory: "Exclusive",
      earned: "+3 xCapx",
    },
    {
      serial: "03",
      taskDetails: "Invite 2 friends",
      completionDate: "17th Nov. 2022",
      taskCategory: "Daily Quest",
      earned: "+2 xCapx",
    },
    {
      serial: "04",
      taskDetails: "What is Capx App",
      completionDate: "17th Nov. 2022",
      taskCategory: "Daily Quest",
      earned: "+1 xCapx",
    },
    {
      serial: "05",
      taskDetails: "Tweet a link from your account",
      completionDate: "18th Nov. 2022",
      taskCategory: "Social Quest",
      earned: "+1 xCapx",
    },
    {
      serial: "06",
      taskDetails: "Build your profile",
      taskCategory: "Mandatory",
      completionDate: "18th Nov. 2022",
      earned: "+1 xCapx",
    },
    {
      serial: "07",
      taskDetails: "Entered email listing",
      taskCategory: "Special",
      completionDate: "18th Nov. 2022",
      earned: "+1 xCapx",
    },
    {
      serial: "04",
      taskDetails: "What is Capx App",
      completionDate: "17th Nov. 2022",
      taskCategory: "Daily Quest",
      earned: "+1 xCapx",
    },
    {
      serial: "05",
      taskDetails: "Tweet a link from your account",
      completionDate: "18th Nov. 2022",
      taskCategory: "Social Quest",
      earned: "+1 xCapx",
    },
    {
      serial: "06",
      taskDetails: "Build your profile",
      taskCategory: "Mandatory",
      completionDate: "18th Nov. 2022",
      earned: "+1 xCapx",
    },
    {
      serial: "07",
      taskDetails: "Entered email listing",
      taskCategory: "Special",
      completionDate: "18th Nov. 2022",
      earned: "+1 xCapx",
    },
  ];

  return (
    <div className="wallettable w-full fs-14 text-cgreen-700 ">
      <table className="wallet-theading flex flex-col gap-2 font-black hidden md:flex">
        <tr className="wallet-th2 tr flex flex-row border-2 py-4 px-4 rounded-2xl">
          <td className="th serial text-start opacity-80">Sl.No</td>
          <td className="th quest-details text-start opacity-80">
            Quest Details
          </td>
          <td className="th quest-category text-start opacity-80">Category</td>
          <td className="th quest-date text-start opacity-80">Completed on</td>
          <td className="th quest-rewards text-start opacity-80">Rewards</td>
        </tr>

        <tr className="wallet-tbody flex flex-col rounded-2xl border-2 font-semibold pb-4 pt-2 opacity-90 ">
          {walletData.map((data, ind) => {
            return (
              <td
                className={`wallet-tr flex px-4 py-3 flex-row border-b-2 row${
                  ind + 1
                }`}
              >
                <td className="td serial">{data.serial}</td>
                <td className="td quest-details text-start">
                  {data.taskDetails}
                </td>
                <td className="td quest-category text-start">
                  {data.taskCategory}
                </td>
                <td className="td quest-date text-start">
                  {data.completionDate}
                </td>
                <td className="td quest-rewards earned">{data.earned}</td>
              </td>
            );
          })}
        </tr>
      </table>

      <div className="questhistory-wrapper">
        {walletData.map((data, ind) => {
          return (
            <div
              className={`wallet-tr fs-14 flex px-4 py-3 font-bold flex-col border-b-2 gap-2 md:hidden opacity-80 row${
                ind + 1
              }`}
            >
              <div className="serialno">
                <span className="inline opacity-80 font-semibold">
                  Task No :{" "}
                </span>{" "}
                {data.serial}
              </div>
              <div className="questDetails">
                <span className="inline opacity-80">Task Details : </span>{" "}
                {data.taskDetails}
              </div>
              <div className="questCategory">
                <span className="inline opacity-80">Task Category : </span>{" "}
                {data.taskCategory}
              </div>
              <div className="questDate">
                <span className="inline opacity-80">Completed on : </span>{" "}
                {data.completionDate}
              </div>
              <div className="questRewards">
                <span className="inline opacity-80">Total Earned : </span>{" "}
                {data.earned}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWalletData;
