import React from "react";
import { HiArrowRight } from "react-icons/hi";
import Input from "../../../../components/Input/Input";
import * as Yup from "yup";
import { useFormik } from "formik";

const Affiliate = ({ actionData }) => {
  const handleFormSubmit = (value) => {
    console.log(value.email);
    actionData.handleCompleteAction(null, {
      type: "affiliate",
      value: value.email,
    });
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .matches(
          /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
          "Invalid email adress"
        ),
    }),
    onSubmit: handleFormSubmit,
  });
  return (
    <div className="follow flex flex-col">
      <p className="reward-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">
        Action #1 : Get Notified for the meme contest
      </p>
      <div className="w-full mb-4">
        <Input
          placeholder="Enter your email"
          label="email"
          type="text"
          name="email"
          error={!!formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>
      <button
        type="button"
        disabled={!!formik.errors.email}
        onClick={(e) => formik.handleSubmit(e)}
        className={`action-btn self-stretch flex w-full justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl text-white font-semibold fs-16 ${
          formik.errors.email ? "disabled" : "bg-gredient-2"
        } `}
      >
        Notify Me
        <HiArrowRight className="text-xl ml-4" />
      </button>
    </div>
  );
};

export default Affiliate;