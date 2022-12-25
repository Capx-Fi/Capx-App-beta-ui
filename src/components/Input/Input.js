import React from "react";

const Input = (props) => {
  const {
    label,
    type,
    placeholder,
    error,
    name,
    className,
    value,
    onChange,
    onBlur,
  } = props;

  return (
    <div
      className={`custom-input w-full rounded-xl border-2 border-primary-200 md:px-2 px-2.5 md:py-1.5 py-2 ${
        error ? "" : "bg-primary-100"
      }`}
    >
      <label
        htmlFor={name}
        className="fs-11 font-black text-primary-800 uppercase md:mb-0 mb-1.5"
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`fs-16 ${"text-primary-800"} ${className}`}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
