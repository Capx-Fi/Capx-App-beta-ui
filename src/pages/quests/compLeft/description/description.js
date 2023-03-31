import React from "react";

const QuestLeft = ({ primarydetails }) => {
  const { poolData } = primarydetails;
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
        {primarydetails.poolData &&
          poolData.result.rewardPool.totalRewards > 0 && (
            <>
              <p className="qdescription-title action-heading font-semibold underline underline-offset-2 fs-15 md:mt-12 mt-8">
                Token Pool
              </p>
              <div className="pool-box self-start flex items-center gap-3">
                <p className="distribution">
                  {poolData.result.rewardPool.claimedRewards}/{" "}
                  {poolData.result.rewardPool.totalRewards}
                </p>
                <span className="chip">xHARBOR</span>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default QuestLeft;
