// validation.js
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address1: Yup.string().required('Address line 1 is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string()
    .required('Zip / Postal code is required')
    .matches(/^\d{5}$/, 'Must be a valid 5-digit ZIP code'),
  country: Yup.string().required('Country is required'),
});
