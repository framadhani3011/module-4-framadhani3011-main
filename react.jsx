import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

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

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const initialValues = {
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

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle submission logic here
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
          {step === 1 && (
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Field type="text" name="fullName" id="fullName" />
              <ErrorMessage name="fullName" component="p" className="text-red-500" />

              <label htmlFor="email">Email Address</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="p" className="text-red-500" />

              <label htmlFor="dob">Date of Birth</label>
              <Field type="date" name="dob" id="dob" />
              <ErrorMessage name="dob" component="p" className="text-red-500" />
            </div>
          )}

          {step === 2 && (
            <div>
              <label htmlFor="streetAddress">Street Address</label>
              <Field type="text" name="streetAddress" id="streetAddress" />
              <ErrorMessage name="streetAddress" component="p" className="text-red-500" />

              <label htmlFor="city">City</label>
              <Field type="text" name="city" id="city" />
              <ErrorMessage name="city" component="p" className="text-red-500" />

              <label htmlFor="state">State</label>
              <Field type="text" name="state" id="state" />
              <ErrorMessage name="state" component="p" className="text-red-500" />

              <label htmlFor="zipCode">Zip Code</label>
              <Field type="text" name="zipCode" id="zipCode" />
              <ErrorMessage name="zipCode" component="p" className="text-red-500" />
            </div>
          )}

          {step === 3 && (
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" id="username" />
              <ErrorMessage name="username" component="p" className="text-red-500" />

              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component="p" className="text-red-500" />
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
            {step < 3 && <button type="button" onClick={nextStep}>Next</button>}
            {step === 3 && <button type="submit">Submit</button>}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MultiStepForm;