import React from "react";
import { MdDone } from "react-icons/md";
import { RefreshSvg } from "../../../assets/svg";
import { MdOutlineFlag } from "react-icons/md";

const questLeft = ({ data }) => {
  const ActionStatus = () => {
    if(data.completed === true){
      return (
        <div className="actionstatus capitalize flex items-center justify-center">
          Completed
          <MdDone className="text-xl ml-1" />
        </div>
      );
    }else if(data.completed === false && data.id === data?.currentActionId ){
      return (
        <div className="actionstatus capitalize flex items-center justify-center">
          ongoing
          <img className="ml-1" src={RefreshSvg} alt="refresh" />
        </div>
      );
    }else{
      return (
        <div className="actionstatus action-pending capitalize flex items-center justify-center">
          start
          <MdOutlineFlag className="ml-1" />
        </div>
      );
    }
  };

  return (
    <div className="left-side flex flex-col w-full">
      <div className="actionsflex flex flex-col">
        <div className="actioncard flex flex-row items-center justify-between">
          <div className="action-row-1 flex flex-col items-start gap-2 justify-between">
            <h5 className="actionheading flex flex-row ">
              <span className="ml-2 capitalize cgreen-700 font-medium ">
                {data.title}
              </span>
            </h5>
            <p
              className={`actiontag ${data.actiontag.toLowerCase()} capitalize`}
            >
              {data.actiontag}
            </p>
          </div>
          <div className="action-row-2 flex flex-row items-center">
            {ActionStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default questLeft;
