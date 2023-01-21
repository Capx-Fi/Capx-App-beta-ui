import React, { useState } from "react";

const WriteArticle2 = ({ actionData }) => {
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
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
          value={input}
          className="doc-input fs-15"
          type="text"
          placeholder="Enter you doc link"
        />
        <button
          className={` action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold w-full ${
            input.length > 10 ? "bg-gredient-2 contained-effect" : "disabled"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default WriteArticle2;
