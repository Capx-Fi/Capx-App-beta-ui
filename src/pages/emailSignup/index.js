import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ChipCapxSvg,
  DxSignupSticker,
  MobDxStocker,
  OnboardSvg,
} from "../../assets/svg";
import Input from "../../components/Input/Input";
import * as Yup from "yup";
import Stepper from "../../components/stepper/Stepper";
import { auth, signupWithEmail } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const EmailSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true));
  };

  const handleFormSubmit = (value, { resetForm }) => {
    const { email, password } = value;
    createUserWithEmailAndPassword(auth, email, password);
    resetForm();
    navigate("/create-username");
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Password is required")
        .matches(
          /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
          "Invalid email adress"
        ),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <main className="emailSignup-page min-h-screen">
        <div className="flex min-h-screen">
          <div className="left-content-box-wrapper  p-6 flex-col  flex md:justify-center justify-start items-stretch md:items-center min-h-screen relative">
            <div className="left-content-box flex flex-col items-center justify-center md:mt-0 mt-20">
              <Stepper step1={"active"} step2={"disable"} step3={"disable"} />
              <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-6 md:self-center self-start">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-5 mb-3">
                Sign up with email
              </h2>

              <form
                className="w-full flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-full mb-4">
                  <Input
                    placeholder="Enter your email"
                    label="email"
                    type="text"
                    error={!!formik.errors.email}
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="w-full  mb-4">
                  <Input
                    placeholder="Create a strong password"
                    label="password"
                    type={showPassword ? "text" : "password"}
                    error={!!formik.errors.password}
                    value={formik.values.password}
                    name="password"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="self-stretch flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox accent-pink-500 rounded-xl"
                      id="checkbox"
                      value={showPassword}
                      onChange={handleShowPassword}
                    />
                    <label
                      className="fs-12 text-primary-800 font-bold ml-1 cursor-pointer"
                      htmlFor="checkbox"
                    >
                      Show Password
                    </label>
                  </div>
                  <Link
                    to="/signin"
                    className="text-primary-900 fs-12 font-bold underline"
                  >
                    Already a member? Login
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`text-white fs-16 font-bold self-stretch rounded-xl py-3 mb-4 ${
                    formik.errors.email || formik.errors.password
                      ? "disabled"
                      : "bg-gredient-2"
                  }`}
                  disabled={!!formik.errors.email || !!formik.errors.password}
                >
                  Sign up
                </button>
              </form>
              <p className="text-center fs-12 text-primary-900 font-medium mb-6">
                By clicking Sign Up above, you agree to Capx’s
                <br />
                <span className="font-black underline ">
                  Terms & Conditions
                </span>{" "}
                and <span className="font-black underline">Privacy policy</span>
              </p>
              <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-6 self-center ">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>

              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
              {!!formik.values.email &&
                !!formik.values.password &&
                !formik.errors.password &&
                !formik.errors.email && (
                  <img
                    src={MobDxStocker}
                    alt="sticker"
                    className="block md:hidden absolute bottom-0 mb-12"
                  />
                )}
            </div>
          </div>
          <div className="flex-1 md:min-h-screen hidden md:block">
            <div className="h-full w-full flex items-end justify-center px-6 relative">
              <img
                className="width-90p"
                src={
                  !!formik.values.email &&
                  !!formik.values.password &&
                  !formik.errors.password &&
                  !formik.errors.email
                    ? DxSignupSticker
                    : OnboardSvg
                }
                alt="dummy"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EmailSignup;
