"use client";
import React, { useEffect, useState } from "react";
import FormHeader from "./FormHeader";
import SubscribtionToggler from "./SubscribtionToggler";

const planes = [
  {
    title: "Arcade",
    monthly: 9,
    yearly: 90,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <g fill="none" fill-rule="evenodd">
          <circle cx="20" cy="20" r="20" fill="#FFAF7E" />
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Advanced",
    monthly: 12,
    yearly: 120,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <g fill="none" fill-rule="evenodd">
          <circle cx="20" cy="20" r="20" fill="#F9818E" />
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M25.057 15H14.944C12.212 15 10 17.03 10 19.885c0 2.857 2.212 4.936 4.944 4.936h10.113c2.733 0 4.943-2.08 4.943-4.936S27.79 15 25.057 15ZM17.5 20.388c0 .12-.108.237-.234.237h-1.552v1.569c0 .126-.138.217-.259.217H14.5c-.118 0-.213-.086-.213-.203v-1.583h-1.569c-.126 0-.217-.139-.217-.26v-.956c0-.117.086-.213.202-.213h1.584v-1.554c0-.125.082-.231.203-.231h.989c.12 0 .236.108.236.234v1.551h1.555c.125 0 .231.083.231.204v.988Zm5.347.393a.862.862 0 0 1-.869-.855c0-.472.39-.856.869-.856.481 0 .87.384.87.856 0 .471-.389.855-.87.855Zm1.9 1.866a.86.86 0 0 1-.87-.852.86.86 0 0 1 .87-.855c.48 0 .87.38.87.855a.86.86 0 0 1-.87.852Zm0-3.736a.862.862 0 0 1-.87-.854c0-.472.39-.856.87-.856s.87.384.87.856a.862.862 0 0 1-.87.854Zm1.899 1.87a.862.862 0 0 1-.868-.855c0-.472.389-.856.868-.856s.868.384.868.856a.862.862 0 0 1-.868.855Z"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Pro",
    monthly: 15,
    yearly: 150,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <g fill="none" fill-rule="evenodd">
          <circle cx="20" cy="20" r="20" fill="#483EFF" />
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
          />
        </g>
      </svg>
    ),
  },
];

const planeBills = {
  Arcade: {
    monthly: 9,
    yearly: 90,
  },
  Advanced: {
    monthly: 12,
    yearly: 120,
  },
  Pro: {
    monthly: 15,
    yearly: 150,
  },
};

const calculatePrice = (plan, billingType) => {
  return planeBills[plan][billingType];
};

const StepTwo = ({ formData, setFormData }) => {
  const [subscription, setSubscription] = useState(
    formData.plan.billingType === "monthly" ? false : true
  );

  const billingType = subscription ? "yearly" : "monthly";

  const handleSubscription = () => {
    setSubscription((prv) => !prv);
  };

  /* plan handler */
  const onChange = (plan) => {
    const { title } = plan;
    setFormData((prv) => ({
      ...prv,
      plan: {
        billingType: billingType,
        title,
        price: calculatePrice(title, billingType),
      },
    }));
  };

  // update
  useEffect(() => {
    const price = calculatePrice(formData.plan.title, billingType);
    setFormData({
      ...formData,
      plan: {
        ...formData.plan,
        billingType: billingType,
        price: price,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscription]);

  return (
    <>
      <FormHeader
        header="Select your plan"
        subheader="You have the option of the monthly or yearly billing"
      />

      <div className="flex flex-col gap-7 lg:gap-11">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-7">
          {planes.map((plan, index) => {
            const { title, monthly, icon } = plan;
            return (
              <div key={index} className="">
                <input
                  type="radio"
                  id={title}
                  name="plan"
                  checked={formData.plan.title === title}
                  className="hidden"
                  onChange={() => onChange(plan)}
                />
                <label
                  htmlFor={title}
                  className={`border border-light-gray hover:bg-magnolia hover:border-purplish-blue rounded-lg inline-flex lg:flex-col gap-3 lg:gap-14 py-4 lg:py-9 px-5 w-full ${
                    formData.plan.title === title
                      ? "bg-magnolia border-purplish-blue"
                      : ""
                  }`}
                >
                  <div className="">{icon}</div>
                  <div className="flex flex-col">
                    <p className="text-marine-blue font-medium text-lg lg:text-3xl">
                      {title}
                    </p>
                    <p className="text-cool-gray">
                      ${calculatePrice(title, billingType)}/
                      {billingType === "monthly" ? "mo" : "yr"}
                    </p>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <SubscribtionToggler
            checked={subscription}
            onChange={handleSubscription}
          />
        </div>
      </div>
    </>
  );
};

export default StepTwo;
