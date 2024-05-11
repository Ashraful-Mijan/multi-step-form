const Step = ({ step, currentStep }) => {
  return (
    <div className="flex items-start lg:gap-5">
      <div
        className={`w-8 h-8 rounded-full border flex items-center justify-center ${
          currentStep === step.step
            ? "bg-pastel-blue text-marine-blue border-light-gray"
            : ""
        }`}
      >
        {step.step}
      </div>
      <div className="hidden lg:flex flex-col leading-none gap-1">
        <p className="uppercase font-normal text-cool-gray">Step {step.step}</p>
        <p className="text-white font-medium uppercase">{step.title}</p>
      </div>
    </div>
  );
};

const StepNavigation = ({ currentStep }) => {
  const steps = [
    {
      title: "Your Info",
      step: 1,
    },
    {
      title: "Select Plan",
      step: 2,
    },
    {
      title: "Add-Ons",
      step: 3,
    },
    {
      title: "Summary",
      step: 4,
    },
  ];

  return (
    <div className="flex justify-center lg:justify-normal lg:flex-col gap-3 lg:gap-10">
      {steps.map((step, index) => (
        <Step key={index} step={step} currentStep={currentStep} />
      ))}
    </div>
  );
};

export default StepNavigation;
