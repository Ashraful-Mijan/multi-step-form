import FormHeader from "./FormHeader";

const StepFour = ({ formData, setCurrentStep }) => {
  const {
    plan: { title, billingType, price },
  } = formData;

  const calculatePrice = (title, billingType) => {
    return formData.addons[title][billingType];
  };

  const filteredAddons = Object.fromEntries(
    Object.entries(formData.addons).filter(([key, value]) => value.checked)
  );

  const billType = billingType === "monthly" ? "mo" : "yr";

  const total =
    Object.keys(filteredAddons).reduce(
      (acc, addon) => acc + calculatePrice(addon, billingType),
      0
    ) + price;

  return (
    <>
      <FormHeader
        header="Finishing up"
        subheader="Double-check everything looks ok before confirming."
      />

      <div className="bg-alabaster rounded-md p-5">
        <div className="flex justify-between items-center border-b border-b-light-gray pb-4">
          <div className="flex flex-col ">
            <p className="text-marine-blue font-bold text-lg">
              {title} (<span className="capitalize">{billingType}</span>)
            </p>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-light-gray underline self-start hover:text-purplish-blue"
            >
              Change
            </button>
          </div>
          <div className="text-marine-blue font-bold">
            ${price}/{billType}
          </div>
        </div>

        {/* additional services */}
        {
          <div className="flex flex-col pt-4 gap-4">
            {Object.keys(filteredAddons).map((addon, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-cool-gray">{addon}</p>
                <p className="text-marine-blue">
                  +${calculatePrice(addon, billingType)}/{billType}
                </p>
              </div>
            ))}
          </div>
        }
      </div>
      <div className="flex items-center justify-between px-5">
        <p className="text-cool-gray">Total (per {billingType})</p>
        <p className="text-purplish-blue font-bold text-lg">
          +${total}/{billType}
        </p>
      </div>
    </>
  );
};

export default StepFour;
