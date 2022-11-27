import React from "react";
import { MdDone } from "react-icons/md";

const questLeft = ({primarydetails})=> {
  return (

    <div className="left-side flex flex-col text-cgreen-700 gap-10">
      <div className="qdescription flex flex-col">
        <p className="qdescription-title font-semibold underline underline-offset-2 fs-15">Description</p>
        <p className="qdescription-content fs-15 font-medium opacity-90 pt-1 ">{primarydetails.qdescription}</p>
      </div>

      <div className="qexpiry flex flex-col pb-10">
        <p className="qexpiry-title font-semibold underline underline-offset-2 fs-15 ">Quest Expiring on</p>
        <p className="qexpiry-time pt-1 font-medium fs-15 opacity-90">{primarydetails.qexpiry}</p>
      </div>

    </div>

  )
}

export default questLeft;
