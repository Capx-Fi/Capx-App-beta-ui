import React, { useState } from "react";
import TopLoader from "../../../../components/topLoader/TopLoader";
import ErrorModal from "../errorModal/ErrorModal";

const WriteArticle2 = ({ actionData }) => {
  const [docLink, setDocLink] = useState("");

  const handleInputChange = (e) => {
    setDocLink(e.target.value);
  };

  const handleSubmitDoc = (e) => {
    e.preventDefault();
    if (docLink.length > 10) {
      actionData.handleCompleteAction(e, {
        type: "submitDocLink",
        value: docLink,
      });
    }
  };
  return (
    <div className="write-article flex flex-col gap-3">
      <p className="action-heading">
        {actionData?.is_claimed === false
          ? actionData?.action_title
          : "ALL TASKS COMPLETE"}
      </p>
      <div className=" p-4 w-full border-2 rounded-3xl flex flex-col gap-3">
        <input
          onChange={handleInputChange}
          value={docLink}
          className="doc-input fs-15"
          type="text"
          placeholder="Enter you doc link"
        />
        <button
          onClick={handleSubmitDoc}
          className={` action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold w-full ${
            docLink.length > 10 ? "bg-gredient-2 contained-effect" : "disabled"
          }`}
        >
          Submit
        </button>
      </div>

      {/* {isPending && <TopLoader />} */}
    </div>
  );
};

export default WriteArticle2;
