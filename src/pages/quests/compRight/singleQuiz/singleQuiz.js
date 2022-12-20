import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { useEffect } from "react";

const SingleQuiz = ({ actionData }) => {
  console.log(actionData);
  const [actionDetails, setActionDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ id: "", value: "" });
  const { isPending, data, error } = useFirestoreCollection(
    "xquest_order/" + actionData.questID + "/action_order/",
    [
      "action_order_id",
      "==",
      String(actionData.questID + "-" + actionData.action_id),
    ]
  );
  useEffect(() => {
    if (data) {
      console.log(data[0]);
      setActionDetails(data[0]);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleOptionSelect = (e) => {
    console.log(e.currentTarget);
    const newValue = {
      id: e.currentTarget.id,
      value: e.currentTarget.innerText,
    };
    if (selectedOption.id !== "") {
      var element = document.getElementById(selectedOption.id);
      element.classList.remove("selected");
    }

    e.currentTarget.classList.add("selected");
    console.log(newValue);
    setSelectedOption((prevState) => {
      if (prevState.id === newValue.id) {
        return prevState;
      } else {
        return newValue;
      }
    });

    console.log(selectedOption);
  };

  const handleCompleteAction = (e) => {
    e.preventDefault();
    const input = {
      type: "singleQuiz",
      value: selectedOption.value,
    };
    actionData.handleCompleteAction(e, input);
  };

  return (
    <div className="quiz">
      <p className="quiz-title action-heading font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">
        {"Action #" + actionData.action_id + ": Answer the questions below"}
      </p>
      <div className="quiz-box flex flex-col self-stretch mb-10 border-1 gap-3 rounded-2xl">
        {actionDetails && (
          <h5 className="quiz-question">
            {actionDetails.action_order_details.question}
          </h5>
        )}
        {actionDetails && actionDetails.action_order_details.options && (
          <div className="quiz-answers font-medium flex flex-col gap-3 ">
            {actionDetails.action_order_details.options.map((option, index) => {
              return (
                <button
                  onClick={handleOptionSelect}
                  className="answer border-1 rounded-xl"
                  key={index + 1}
                  id={index + 1}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {actionDetails && (
        <button
          disabled={selectedOption.value === "" ? true : false}
          onClick={handleCompleteAction}
          className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full"
        >
          {actionDetails.action_order_cta}
          <HiArrowRight className="text-xl ml-4" />
        </button>
      )}
    </div>
  );
};

export default SingleQuiz;
