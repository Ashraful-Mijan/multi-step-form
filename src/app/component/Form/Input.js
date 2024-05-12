import React from "react";

const Input = ({ label, error, ...rest }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className="text-marine-blue text-base font-medium mb-1 flex justify-between leading-none"
      >
        <span>{label}</span>
        {error && <span className="text-strawberry-red ">{error}</span>}
      </label>
      {/* <br /> */}
      <input
        id={label}
        className={`rounded-lg w-full p-4 border text-base font-medium border-light-gray focus:border-marine-blue ${
          error
            ? "border-strawberry-red focus:border-strawberry-red focus:outline-none"
            : ""
        }`}
        {...rest}
      />
    </div>
  );
};

export default Input;
