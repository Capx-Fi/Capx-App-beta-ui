import React from "react";
import { GoCheck } from "react-icons/go";

const ActionCard = ({ details }) => {
  return (
    <div className="action-card mb-4">
      <div className="flex items-start flex-col">
        <h5 className="heading">
          #1 <span className="ml-2">{details.title}</span>
        </h5>
        <p className={`action-tag mt-2 ${details.tag} capitalize`}>
          {details.tag}
        </p>
      </div>
      <div className="flex-grow" />
      {details.completed ? (
        <p className="complete-tag flex items-center">
          Completed
          <GoCheck className="text-xl ml-1" />
        </p>
      ) : (
        <button className="bg-gredient-2 text-white capitalize">
          {details.btnText}
        </button>
      )}
    </div>
  );
};

export default ActionCard;
