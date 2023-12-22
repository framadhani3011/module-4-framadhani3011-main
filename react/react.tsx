import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  fullName: string;
  email: string;
  dob: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  username: string;
  password: string;
}

const PersonalInfoSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  dob: Yup.date().required('Date of Birth is required'),
});

const AddressInfoSchema = Yup.object().shape({
  streetAddress: Yup.string().required('Street Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().matches(/^\d{5}$/, 'Invalid Zip Code').required('Zip Code is required'),
});

const AccountInfoSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    'Password must contain at least 8 characters, one letter, and one number'
  ),
});

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const initialValues: FormValues = {
    fullName: '',
    email: '',
    dob: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
  };

  const validationSchema =
    step === 1
      ? PersonalInfoSchema
      : step === 2
      ? AddressInfoSchema
      : AccountInfoSchema;

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-6">
          {/* ... (rest of the code remains unchanged) */}
        </Form>
      </Formik>
    </div>

  );
};

export default MultiStepForm;