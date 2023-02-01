import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";

const Quiz = ({ questionData, handleSubmit }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (ind) => {
    setSelected(ind);
  };

  const submit = () => {
    if (selected !== null) {
      handleSubmit(questionData.answers?.options[selected]);
      setSelected(null);
    }
  };

  return (
    <div className="feedback-quiz flex flex-col self-stretch mb-10 border-1 gap-3 rounded-2xl">
      <h5 className="quiz-question">{questionData.question}</h5>
      <div className="quiz-answers font-medium flex flex-col gap-3 ">
        {questionData.answers?.options.map((answer, ind) => {
          return (
            <button
              onClick={() => {
                handleClick(ind);
              }}
              className={`answer border-1 rounded-xl ${
                selected === ind ? "selected" : ""
              }`}
            >
              {answer}
            </button>
          );
        })}
      </div>
      <button
        onClick={submit}
        className={`action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ${
          selected !== null ? "bg-gredient-2 contained-effect" : "disabled"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
