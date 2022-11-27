import React from "react";
import { MdDone } from "react-icons/md";

const questLeft = ({details})=> {
  return (
   
    <div className="left-side flex flex-col w-full">
      <div className="actionsflex flex flex-col">
        <div className="actioncard rounded-2xl flex flex-col items-start my-2 p-4 bg-slate-50">
          <div className="action-row-1 flex flex-row items-center justify-between	w-full">
              <h5 className="actionheading flex flex-row ">
                <span className="ml-2 cgreen-700 font-medium fs-15 ">{details.actionnum}</span>
                <span className="ml-2 cgreen-700 font-medium fs-15">{details.actiontitle}</span>
              </h5>
              <div className="flex-grow" />
                {details.completed ? (
                  <p className="actionstatus flex bg-slate-200 py-1 px-4 rounded-full items-center fs-13 font-semibold">Completed<MdDone className="text-xl ml-1" /></p>
                  ) : ( 
                  <button className="bg-gredient-2 py-1 px-4 rounded-full text-white capitalize fs-13 font-semibold">{details.actionBtn}</button>
                )}
            </div>
          <div className="action-row-2 flex flex-row items-center">
          <p className={`actiontag py-0.1 px-4 mt-1 fs-13 font-medium  ${details.actiontag} capitalize`}>{details.actiontag}</p>
            </div>
        </div>
      </div>
    </div>

  )
}

export default questLeft;
