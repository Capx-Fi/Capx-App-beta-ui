import React from "react";
import { StepChecked } from "../../assets/svg";
import { FaChevronRight } from "react-icons/fa";
import { ImArrowLeft2 } from "react-icons/im";
import { useLocation,useNavigate } from "react-router-dom";

const Stepper = ({ step1, step2, step3, className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const referer = location.state && location.state.referer ? location.state.referer : null
  const navigateBack = () =>{
    navigate(referer);
  }
  return (
    <div className={`stepper absolute top-0 ${className}`}>
      <div className="flex items-center">
        {referer ? <button className="back-arrow text-primary-800 fs-22 md:hidden">
          <ImArrowLeft2 className="" onClick={navigateBack} />
        </button>:<></>}
        <div className={`step ${step1}-step flex-grow`}>
          <img src={StepChecked} alt="checked" />
          <span>1</span>
          <p>Sign up</p>
        </div>

        <FaChevronRight className="fs-13 right-arrow hidden md:block " />

        <div className={`step ${step2}-step flex-grow`}>
          <img src={StepChecked} alt="checked" />
          <span>2</span>
          <p>Create Profile</p>
        </div>

        <FaChevronRight className="fs-13 right-arrow  hidden md:block " />

        <div className={`step ${step3}-step flex-grow`}>
          <img src={StepChecked} alt="checked" />
          <span>3</span>
          <p>Invite Code</p>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
