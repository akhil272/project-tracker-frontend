import * as yup from "yup";
export const CreateClientFormSchema = yup
  .object({
    name: yup.string().required("Business name is required"),
    phoneNumber: yup.string().max(10).min(10),
    imageUrl: yup.string().nullable(),
    mapLink: yup.string().nullable(),
    state: yup.string().nullable(),
    country: yup.string().nullable(),
    pinCode: yup.string().nullable(),
    addressLine1: yup.string().nullable(),
  })
  .required();
