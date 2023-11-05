import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-modal";

export default function CreateCategoryForm({ onSubmit }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>+ Create a Category</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Category Modal"
      >
        <h2>Create Category</h2>
        <Formik
          initialValues={{ title: "" }}
          onSubmit={(values, actions) => {
            onSubmit(values);
            closeModal();
            actions.resetForm();
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Category Title is required";
            }
            return errors;
          }}
        >
          <Form>
            <Field type="text" name="title" placeholder="Category Title" />
            <ErrorMessage name="title" component="div" className="error" />
            <button type="submit">Add Category</button>
          </Form>
        </Formik>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}
