"use client";
import Image from "next/image";
import bgsidebar from "../../public/images/bg-sidebar-desktop.svg";
import mobileBgSidebar from "../../public/images/bg-sidebar-mobile.svg";
import StepOne from "./component/Form/StepOne";
import StepNavigation from "./component/StepNavigation/StepNavigation";
import { useState } from "react";
import StepTwo from "./component/Form/StepTwo";
import StepThree from "./component/Form/StepThree";
import StepFour from "./component/Form/StepFour";
import * as yup from "yup";
import Confirmed from "./component/Confirmed";

const phoneRegExp = /^(\+?880|0)[1-9][0-9]{9}$/;

const infoSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("This field is required"),
});

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
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
    setIsFormSubmit(true);
  };

  const handlePreviusStep = () => {
    setCurrentStep((prv) => prv - 1);
  };

  const handleNextStep = async (e) => {
    if (await validateStep()) {
      return;
    }
    setCurrentStep((prv) => prv + 1);
  };

  const validateStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        try {
          const data = await infoSchema.validate(formData, {
            abortEarly: false,
          });

          setErrors((prvError) => ({
            ...prvError,
            name: "",
            email: "",
            number: "",
          }));
        } catch (error) {
          if (error instanceof yup.ValidationError) {
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

      default:
        return;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:p-2 min-h-screen relative">
      <aside className="lg:min-w-[17.125rem] p-9 relative text-white h-[172px] lg:h-auto">
        <Image
          src={mobileBgSidebar}
          alt="bg-sidebar"
          fill
          sizes="100vw"
          className="object-cover lg:rounded-lg -z-10"
          priority
        />
        <StepNavigation currentStep={currentStep} />
      </aside>
      <div className="flex-grow flex">
        <main className="min-w-full px-3 lg:px-28 mx-auto">
          {isFormSubmit && <Confirmed />}
          {!isFormSubmit && (
            <form
              className="flex flex-col gap-9 h-full "
            >
              {getCurrentStep()}
              <div className="flex justify-between items-center mt-auto">
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
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
