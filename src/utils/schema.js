import * as yup from "yup";

// regular expresstion
const phoneRegExp = /^(\+?880|0)[1-9][0-9]{9}$/;

const InfoSchema = yup.object().shape({
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

const ValidationError = yup.ValidationError;

export {
    InfoSchema,
    ValidationError
}
