import React from "react";
import { MdDone } from "react-icons/md";

const questLeft = ({ primarydetails }) => {
  return (
    <div className="left-side flex flex-col text-cgreen-700 gap-10">
      <div className="qdescription flex flex-col gap-3">
        <p className="qdescription-title action-heading font-semibold underline underline-offset-2 fs-15">
          Description
        </p>
        <p className="qdescription-content font-medium opacity-90">
          {primarydetails.qdescription}
        </p>
      </div>
    </div>
  );
};

export default questLeft;
