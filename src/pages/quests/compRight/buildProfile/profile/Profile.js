import React from "react";
import { FullName } from "../../../../../assets/images/profile";
import {
  DailyQuestsIcon,
  InputCheckSvg,
  ProfileoutlineIconSvg,
} from "../../../../../assets/svg";

const Profile = () => {
  return (
    <div className="comp-profile flex flex-col">
      <div className="img-box md:self-start rounded-full ">
        <img
          className="rounded-full object-contain w-full"
          src={ProfileoutlineIconSvg}
          alt="Profile"
        />
      </div>

      <div className="name ">
        <div className="heading flex items-center">
          <img src={FullName} alt="" />
          <span className="ml-3">Full Name</span>
        </div>
        <div className="field-box flex jutify-between">
          <img src={InputCheckSvg} alt="check" />
        </div>
      </div>

      <div className="social-box flex flex-col gap-3">
        <div className="heading flex items-center">
          <img src={DailyQuestsIcon} alt="" />
          <span className="ml-3">Socials</span>
        </div>
        <div className="field-box flex jutify-between">
          <img src={InputCheckSvg} alt="check" />
        </div>
        <div className="field-box flex jutify-between">
          <img src={InputCheckSvg} alt="check" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
