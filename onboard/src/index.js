import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "./MyTextInput";
import { MyCheckbox } from "./MyCheckbox";
import { MySelect } from "./MySelect";
import axios from 'axios';

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          jobType: "" // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting, resetForm,setStatus }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //     resetForm();
        //   }, 400);
            doStuff(values);
            setSubmitting(false);
            resetForm();
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="First"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Last"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
          />
          <MySelect label="Job Type" name="jobType">
            <option value="Role">Role</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

function doStuff(values){
    axios.post("https://reqres.in/api/users/",values
      ).then(res => {
        console.log("success", res);

      })
      .catch(err =>
        console.log(err.response)
      );
}
function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
