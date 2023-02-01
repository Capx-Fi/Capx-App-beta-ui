import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../../../components/Input/Input";
import { HiArrowRight } from "react-icons/hi";
import Quiz from "./quiz/Quiz";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { config } from "../../../../config";
import TopLoader from "../../../../components/topLoader/TopLoader";

const WeeklyFeedback = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState(Array(9).fill(""));
  const [questionIndex, setQuestionIndex] = useState(0);

  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_COLLECTION}/` +
      actionData.questID +
      `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    ["__name__", "==", String(actionData.action_order_id)]
  );

  useEffect(() => {
    if (data) {
      setActionDetails(data[0]);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAnswerSubmit = (ans) => {
    setAnswer((prev) => {
      return prev.map((el, ind) => {
        if (ind === questionIndex) {
          return (el = ans);
        } else {
          return el;
        }
      });
    });
  };

  useEffect(() => {
    setQuestionIndex(answer.indexOf(""));
  }, [answer]);

  const renderQuizHandle = () => {
    if (questionIndex !== -1) {
      return (
        <Quiz
          questionData={{
            question:
              actionDetails?.action_order_details.questions[questionIndex],
            answers: actionDetails?.action_order_details.options[questionIndex],
          }}
          handleSubmit={handleAnswerSubmit}
        />
      );
    } else {
      return (
        <div className="comment-box flex flex-col rounded-xl border-2 border-primary-200 md:px-2 px-2.5 md:py-1.5 py-2 bg-primary-100">
          <label className="fs-11 font-black text-primary-800 uppercase md:mb-0 mb-1.5">
            Add Comment
          </label>
          <textarea
            onChange={handleCommentChange}
            value={comment}
            className="fs-16 text-primary-800"
          />
        </div>
      );
    }
  };

  return (
    <div className="weekly-feedback flex flex-col gap-3">
      <p className="action-heading">
        {actionData?.is_claimed === false
          ? actionData?.action_title
          : "ALL TASKS COMPLETE"}
      </p>
      {renderQuizHandle()}
      {/* { && } */}
      {questionIndex === -1 && (
        <button
          className={`action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ${
            comment.length < 20 ? "disabled" : "bg-gredient-2 contained-effect"
          } 
        `}
          onClick={(e) => {
            alert("yo");
            actionData.handleCompleteAction(e, {
              type: "submitFeedback",
              value: { answers: answer, comment: comment },
            });
          }}
          disabled={comment.length < 20}
        >
          Complete Action
          <HiArrowRight className="text-xl " />
        </button>
      )}
      {isPending && <TopLoader />}
    </div>
  );
};

export default WeeklyFeedback;
