import React from "react";

const ActionCard = ({ type, title, serial }) => {
  return (
    <div className="quest-action-card flex items-center">
      <div className="flex flex-col items-start gap-2">
        <p className="card-title">
          <span className="mr-2">#{serial}</span>
          <span>{title}</span>
        </p>
        <div className={`tag ${type}-tag`}>{type}</div>
      </div>
      <div className="card-btn"></div>
    </div>
  );
};

export default ActionCard;
