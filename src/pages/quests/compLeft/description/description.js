import React from "react";

const questLeft = ({ primarydetails }) => {
  return (
    <div className="left-side flex flex-col text-cgreen-700 gap-10">
      <div className="qdescription flex flex-col gap-3">
        <p className="qdescription-title action-heading font-semibold underline underline-offset-2 fs-15">
          Description
        </p>
        {primarydetails.qdescription &&
        primarydetails.qdescription.trim().length > 0 &&
        primarydetails.qdescription.split("%").length > 0 ? (
          primarydetails.qdescription.split("%").map((val) => {
            return (
              <p className="qdescription-content font-medium opacity-90">
                {" "}
                {val}
              </p>
            );
          })
        ) : (
          <p className="qdescription-content font-medium opacity-90">
            {primarydetails.qdescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default questLeft;
