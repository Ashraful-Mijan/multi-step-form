"use client";

import FormHeader from "./FormHeader";

// const addons = [
//   {
//     title: "Online Service",
//     description: "Access to Multiplayer games",
//     checked: true,
//   },
//   {
//     title: "Larger Storage",
//     description: "Extra 1TB of cloud save",
//     checked: true,
//   },
//   {
//     title: "Customizable Profile",
//     description: "Custom them on your profile",
//     checked: false,
//   },
// ];

// const prices = {
//   "Online Service": {
//     monthly: 1,
//     yearly: 10,
//   },
//   "Larger Storage": {
//     monthly: 2,
//     yearly: 20,
//   },
//   "Customizable Profile": {
//     monthly: 2,
//     yearly: 20,
//   },
// };

const StepThree = ({ formData, setFormData }) => {

  const onChange = (e) => {
    setFormData((prv) => ({
      ...prv,
      addons: {
        ...prv.addons,
        [`${e.target.name}`]: {
          ...prv.addons[`${e.target.name}`],
          checked: e.target.checked,
        },
      },
    }));
  };

  const calculatePrice = (title, billingType) => {
    return formData.addons[title][billingType];
  };

  return (
    <>
      <FormHeader
        header="Pick add-ons"
        subheader="Add-ons help enhance your gaming experience"
      />
      <div className="flex flex-col gap-4">
        {Object.keys(formData.addons).map((add, index) => (
          <div
            key={index}
            className={`bg-alabaster border border-light-gray rounded-md hover:border-purplish-blue ${
              formData.addons[add].checked
                ? "bg-magnolia border-purplish-blue"
                : ""
            }  p-5 flex gap-5 items-center w-full`}
          >
            <input
              type="checkbox"
              name={add}
              checked={formData.addons[add].checked}
              onChange={onChange}
              id={index}
              className="w-5 h-5 cursor-pointer"
            />
            <label className="flex flex-col leading-none cursor-pointer" htmlFor={index}>
              <p className="font-medium text-marine-blue text-lg">{add}</p>
              <p className="text-sm text-cool-gray">
                {formData.addons[add].description}
              </p>
            </label>
            <p className="leading-none text-purplish-blue ml-auto">
              +${calculatePrice(add, formData.plan.billingType)}/
              {formData.plan.billingType === "monthly" ? "mo" : "yr"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default StepThree;
