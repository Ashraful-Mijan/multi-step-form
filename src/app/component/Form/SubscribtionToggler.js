import React from "react";

const SubscribtionToggler = ({ checked, onChange }) => {
  return (
    <div className="flex py-5 bg-alabaster items-center justify-center rounded-md">
      <div className="flex gap-3 items-center">
        <span
          className={`font-bold text-light-gray transition-colors duration-[.4s] ${
            !checked ? "text-marine-blue" : ""
          }`}
        >
          Monthly
        </span>
        <label class="switch">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="inputtoggler"
          />
          <span class="slider bg-marine-blue round"></span>
        </label>
        <span
          className={`font-bold text-light-gray transition-colors duration-[.4s] ${
            checked ? "text-marine-blue" : ""
          }`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
};

export default SubscribtionToggler;
