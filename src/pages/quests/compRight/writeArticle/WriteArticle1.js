import React, { useState } from "react";
import { FcDocument } from "react-icons/fc";
import { SiNotion } from "react-icons/si";
import { HiArrowRight } from "react-icons/hi";

const WriteArticle = ({ actionData }) => {
  return (
    <div className="write-article flex flex-col gap-3">
      <p className="action-heading">
        {actionData?.is_claimed === false
          ? actionData?.action_title
          : "ALL TASKS COMPLETE"}
      </p>
      <div className=" p-4 w-full border-2 rounded-3xl flex flex-col gap-3">
        <button
          onClick={() => {
            window.open(
              "https://www.atlassian.com/software/confluence/comparison/confluence-vs-notion?&aceid=&adposition=&adgroup=139903765174&campaign=18336813791&creative=632725621918&device=c&keyword=notion&matchtype=p&network=g&placement=&ds_kids=p73000477416&ds_e=GOOGLE&ds_eid=700000001542923&ds_e1=GOOGLE&gclsrc=ds"
            );
          }}
          className="notion-btn outlined-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold w-full"
        >
          <SiNotion className="fs-26 w-6" />
          Go to Notion Doc
        </button>
        <button
          onClick={() => {
            window.open("https://docs.google.com/document/u/0/?tgif=d");
          }}
          className="google-btn outlined-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl font-semibold w-full"
        >
          <FcDocument className="fs-28 w-6" />
          Go to Google Doc
        </button>
      </div>
      <button className="bg-gredient-2 contained-effect action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ">
        Next action
        <HiArrowRight className="text-xl " />
      </button>
    </div>
  );
};

export default WriteArticle;
