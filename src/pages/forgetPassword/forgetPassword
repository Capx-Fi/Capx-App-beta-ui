import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import React from "react";
import { ChipCapxSvg, OnboardSvg } from "../../assets/svg";
import { auth } from "../../firebase/firebase";
import * as Yup from "yup";
import Input from "../../components/Input/Input";

const ForgotPassowrd = () => {
  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values.email);
    const data = await sendPasswordResetEmail(auth, values.email, {
      url: "http://localhost:3000/signup/email",
    });
    console.log(data);
    resetForm();
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Password is required")
        .matches(
          /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
          "Invalid email adress"
        ),
    }),
    onSubmit: handleFormSubmit,
  });
  return (
    <main className="emaillogin-page min-h-screen">
      <div className="flex min-h-screen">
        <div className="left-content-box-wrapper  p-6 flex-col  flex md:justify-center justify-start md:mt-0 mt-14 items-stretch md:items-center bg-white-transparent min-h-screen relative">
          <div className="left-content-box flex flex-col items-center justify-center">
            <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-6 md:self-center self-start">
              <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
            </div>
            <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-5 mb-3">
              Enter your Email
            </h2>

            <form
              className="w-full flex flex-col"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full mb-4">
                <Input
                  placeholder="Enter your email"
                  label="Email"
                  type="email"
                  error={!!formik.errors.email}
                  value={formik.values.emial}
                  name="email"
                  onChange={formik.handleChange}
                />
              </div>

              <button
                type="submit"
                className={`text-white fs-16 font-bold self-stretch rounded-xl py-3 mb-4 ${
                  formik.errors.confirmPassword || formik.errors.password
                    ? "disabled"
                    : "bg-gredient-2"
                }`}
                disabled={
                  !!formik.errors.confirmPassword || !!formik.errors.password
                }
              >
                Submit
              </button>
            </form>

            <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-6 self-center ">
              <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
            </div>

            <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
              © Capx 2022. All rights reserved
            </p>
          </div>
        </div>
        <div className="flex-1 md:min-h-screen hidden md:block">
          <div className="h-full w-full flex items-end justify-center px-6">
            <img className="width-90p" src={OnboardSvg} alt="dummy" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassowrd;
