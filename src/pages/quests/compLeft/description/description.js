import React from "react";

const Description = ({ primarydetails }) => {
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

      {primarydetails.qexpiry && (
        <div className="qexpiry flex flex-col pb-10 gap-3">
          <p className="qexpiry-title action-heading font-semibold underline underline-offset-2 fs-15 ">
            Quest Expiring on
          </p>
          <p className="qexpiry-time pt-1 font-medium fs-15 opacity-90">
            {primarydetails.qexpiry}
          </p>
        </div>
      )}
    </div>
  );
};

export default Description;