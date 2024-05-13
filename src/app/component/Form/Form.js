"use client";

import { InfoSchema, ValidationError } from "@/utils/schema";
import Confirmed from "../Confirmed";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { useContext, useState } from "react";
import { AppContext } from "@/app/Context/AppContext";

const Form = () => {
  const [currentStep, setCurrentStep] = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    plan: {
      billingType: "monthly",
      title: "Arcade",
      price: 9,
    },
    addons: {
      "Online service": {
        checked: true,
        monthly: 1,
        yearly: 10,
        description: "Access to Multiplayer games",
      },
      "Larger storage": {
        checked: true,
        monthly: 2,
        yearly: 20,
        description: "Extra 1TB of cloud save",
      },
      "Customizable profile": {
        checked: false,
        monthly: 2,
        yearly: 20,
        description: "Custom them on your profile",
      },
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
  });

  const handleFormSubmit = () => {
    setCurrentStep(5);
  };

  const handlePreviusStep = () => {
    setCurrentStep((prv) => prv - 1);
  };

  const validateStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        try {
          await InfoSchema.validate(formData, {
            abortEarly: false,
          });

          setErrors((prvError) => ({
            ...prvError,
            name: "",
            email: "",
            number: "",
          }));
        } catch (error) {
          if (error instanceof ValidationError) {
            const errorMessages = {};
            error.inner.forEach((err) => {
              errorMessages[err.path] = err.message;
            });

            setErrors((prvError) => ({ ...prvError, ...errorMessages }));
            isValid = true;
          }
        }
        break;

      default:
        break;
    }

    return isValid;
  };

  const handleNextStep = async (e) => {
    if (await validateStep()) {
      return;
    }
    setCurrentStep((prv) => prv + 1);
  };

  const getCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            error={errors}
          />
        );
      case 2:
        return <StepTwo formData={formData} setFormData={setFormData} />;
      case 3:
        return <StepThree formData={formData} setFormData={setFormData} />;
      case 4:
        return (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        );
      case 5:
        return <Confirmed />;
      default:
        return;
    }
  };

  return (
    <>
      <form className="flex flex-col gap-5 lg:gap-9 lg:h-full mx-5 lg:mx-0 px-4 lg:px-0 py-5 rounded-lg lg:rounded-none bg-white lg:bg-[transparent] h-max -translate-y-16 lg:translate-y-0">
        {getCurrentStep()}
        {currentStep < 5 && (
          <div className="hidden lg:flex justify-between items-center mt-auto">
            {currentStep > 1 && (
              <button type="button" onClick={handlePreviusStep}>
                Go Back
              </button>
            )}

            {currentStep === 4 ? (
              <button
                type="button"
                onClick={handleFormSubmit}
                className="py-4 px-7 bg-purplish-blue text-white rounded-md ml-auto"
              >
                Confirm
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                type="button"
                className="py-4 px-7 bg-marine-blue text-white rounded-md ml-auto"
              >
                Next Step
              </button>
            )}
          </div>
        )}
      </form>

      {/* buttons for mobile view */}
      {currentStep < 5 && (
        <div className="flex lg:hidden justify-between items-center mt-auto bg-white py-3 px-5">
          {currentStep > 1 && (
            <button type="button" onClick={handlePreviusStep}>
              Go Back
            </button>
          )}

          {currentStep === 4 ? (
            <button
              type="button"
              onClick={handleFormSubmit}
              className="py-2 lg:py-4 px-3 lg:px-7 bg-purplish-blue text-white rounded-md ml-auto"
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              type="button"
              className="py-2 lg:py-4 px-3 lg:px-7 bg-marine-blue text-white rounded-md ml-auto"
            >
              Next Step
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Form;