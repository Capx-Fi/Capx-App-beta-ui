import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../../../components/Input/Input";
import { HiArrowRight } from "react-icons/hi";
import Quiz from "./quiz/Quiz";

const WeeklyFeedback = ({ actionData }) => {
  const userData = useSelector((state) => state.user);

  const [discordID, setDiscordID] = useState(userData.socials.discord_username);
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState([
    { id: 0, answer: "" },
    { id: 1, answer: "" },
    { id: 2, answer: "" },
  ]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAnswerSubmit = (id, ans) => {
    setAnswer((prev) => {
      return prev.map((el) => {
        if (el.id === id) {
          return { ...el, answer: ans };
        } else {
          return el;
        }
      });
    });
  };
  console.log(answer);
  const [question, setQuestion] = useState([
    {
      id: 0,
      question: "What does Capx App enable?",
      answers: [
        "Capx enables community to build long lasting bonds by learning & solving problems together",
        "Capx enables community to learn the basics of blockchain, Defi, NFT & investing in crypto, and earn IOU token rewards",
        "Capx enables community to discover and explore various communities & projects, to earn multiple IOU token rewards from different project",
        "All of the above",
      ],
    },
    {
      id: 1,
      question: "What are xCapx tokens?",
      answers: [
        "Wrapped vesting tokens (WVTs)",
        "Off-chain Tokens",
        "XP Points",
        "IOU Tokens",
      ],
    },
    {
      id: 2,
      question: "xCapx tokens can be earned by completing",
      answers: ["Quests", "Contests", "Challenges", "All of the above"],
    },
  ]);

  const renderQuizHandle = () => {
    const unAnsweredQuestion = answer.filter((el, ind) => {
      return el.answer === "";
    });
    console.log(unAnsweredQuestion.length);
    if (unAnsweredQuestion.length !== 0) {
      return unAnsweredQuestion.slice(0, 1).map((quiz) => {
        return (
          <Quiz
            questionData={question[quiz.id]}
            handleSubmit={handleAnswerSubmit}
          />
        );
      });
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

      {comment.length > 20 ? (
        <button
          className={`action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ${
            true ? "bg-gredient-2 contained-effect" : "disabled"
          }`}
        >
          Complete Action
          <HiArrowRight className="text-xl " />
        </button>
      ) : (
        <button
          className={`action-btn disabled flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl   
          `}
        >
          Complete Action
          <HiArrowRight className="text-xl " />
        </button>
      )}
    </div>
  );
};

export default WeeklyFeedback;
