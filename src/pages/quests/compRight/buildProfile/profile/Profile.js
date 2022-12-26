import React from "react";
import { useSelector } from "react-redux";
import { FullName } from "../../../../../assets/images/profile";
import {
  DailyQuestsIcon,
  DiscordIcon,
  InputCheckSvg,
  ProfileoutlineIconSvg,
  TwitterContainedIcon,
} from "../../../../../assets/svg";

const Profile = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="comp-profile flex flex-col gap-8">
      <div className="img-box md:self-start self-center rounded-full ">
        {/* uncomment this image tag put profile image data here  */}
        <img
          className="rounded-full w-full"
          src={userData?.image_url}
          alt="Profile"
        />
      </div>

      <div className="name flex flex-col gap-3">
        <div className="heading flex items-center">
          <img src={FullName} alt="" />
          <span className="ml-3">Full Name</span>
        </div>
        <div className="field-box flex jutify-between">
          <span className="grow capitalize">{userData?.name}</span>
          <img src={InputCheckSvg} alt="check" />
        </div>
      </div>

      <div className="social-box flex flex-col gap-3">
        <div className="heading flex items-center">
          <img src={DailyQuestsIcon} alt="" />
          <span className="ml-3">Socials</span>
        </div>
        <div className="field-box flex jutify-between">
          <img src={TwitterContainedIcon} alt="twitter" />
          <span className="grow ml-2">{userData?.socials.twitter_id}</span>
          <img src={InputCheckSvg} alt="check" />
        </div>
        {/* <div className="field-box flex jutify-between">
          <img src={DiscordIcon} alt="twitter" />
          <span className="grow ml-2">Dummy data</span>
          <img src={InputCheckSvg} alt="check" />
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
