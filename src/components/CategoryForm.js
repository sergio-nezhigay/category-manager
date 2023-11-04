import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CategoryForm = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={initialValues || { name: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

export default CategoryForm;
