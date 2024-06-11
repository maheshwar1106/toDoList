import { Field, Form, Formik } from "formik";
import React from "react";
import CustomInput from "../component/CustomInput";
import { advancedSchema } from "./schema";

const UpdatedFormik = () => {
  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ username: "", jobType: "", acceptedTos: false }}
        validationSchema={advancedSchema}
      >
        {(props) => (
          <Form>
            <CustomInput
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
            />
            <br />

            {/* <Field type="text" name="name" placeholder="Name"></Field> */}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatedFormik;
