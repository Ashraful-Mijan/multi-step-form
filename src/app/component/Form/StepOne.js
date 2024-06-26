"use client";
import Input from "./Input";
import FormHeader from "./FormHeader";

const StepOne = ({ formData, setFormData, error }) => {

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prv) => ({ ...prv, [name]: value }));
  };

  return (
    <>
      <FormHeader
        header="Personal info"
        subheader="Please Provide your name, email address and phone number"
      />
      <div className="flex flex-col gap-4 lg:gap-8">
        <Input
          name="name"
          type='text'
          error={error.name}
          value={formData["name"]}
          onChange={onChange}
          placeholder="e.g. Stephen King"
          label="Name"
        />
        <Input
          name="email"
          type='email'
          error={error.email}
          value={formData["email"]}
          onChange={onChange}
          placeholder="e.g. stephenking@lorem.com"
          label="Email Address"
        />
        <Input
          name="number"
          type='number'
          error={error.number}
          value={formData["number"]}
          onChange={onChange}
          placeholder="e.g. +8801752538207"
          label="Phone Number"
        />
      </div>
    </>
  );
};

export default StepOne;
