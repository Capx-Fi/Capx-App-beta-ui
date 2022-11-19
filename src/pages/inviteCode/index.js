import { Formik, useFormik } from "formik";
import {
  ChipCapxSvg,
  CreateunameStickermMob,
  InviteCodeSideSticker,
} from "../../assets/svg";
import OtpInput from "react-otp-input";
import * as Yup from "yup";
import Stepper from "../../components/stepper/Stepper";
import { signupWithEmail } from "../../firebase/firebase";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const InviteCode = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");

  const handleCodeChange = (code) => {
    setInviteCode(code);
  };
  const handleFormSubmit = () => {
    navigate("/congratulation");
  };
  console.log(inviteCode.length);
  return (
    <>
      <main className="create-username-page min-h-screen">
        <div className="flex min-h-screen">
          <div className="left-content-box-wrapper  p-6 flex-col  flex justify-center items-stretch md:items-center bg-white-transparent min-h-screen relative">
            <div className="left-content-box flex flex-col items-center justify-center mb-20">
              <Stepper step1={"checked"} step2={"checked"} step3={"active"} />
              <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-6 md:self-center self-start">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-5 mb-3">
                Create a username
              </h2>

              <form
                className="w-full flex flex-col"
                onSubmit={handleFormSubmit}
              >
                <div className="otp-input-wrapper flex justify-center mb-6">
                  <OtpInput
                    value={inviteCode}
                    onChange={handleCodeChange}
                    numInputs={5}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "390px",
                    }}
                    inputStyle={{
                      background:
                        inviteCode.length !== 5
                          ? "transparent"
                          : "rgba(31, 122, 85, 0.08)",
                      border: "1.5px solid rgba(31, 122, 85, 0.4)",
                      borderRadius: "12px",
                      width: "60px",
                      height: "60px",
                      fontSize: "15px",

                      color: "#000",
                      fontWeight: "500",
                      caretColor: "blue",
                    }}
                    focusStyle={{
                      border: "1.5px solid rgba(31, 122, 85, 0.4)",
                      outline: "none",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className={`text-white fs-16 font-bold self-stretch rounded-xl py-3 mb-4 ${
                    inviteCode.length !== 5 ? "disabled" : "bg-gredient-2"
                  }`}
                  disabled={inviteCode.length !== 5}
                >
                  Let's go
                </button>
              </form>

              <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-6 self-center ">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>

              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>

              <img
                src={CreateunameStickermMob}
                alt="sticker"
                className="block md:hidden absolute bottom-0 mb-3"
              />
            </div>
          </div>
          <div className="flex-1 md:min-h-screen hidden md:block">
            <div className="h-full w-full flex items-end justify-center relative">
              <img
                className="width-90p"
                src={InviteCodeSideSticker}
                alt="dummy"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default InviteCode;
