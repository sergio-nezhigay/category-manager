import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-modal";

const PLUSIMG = "/images/plus.svg";

export default function CreateCategoryForm({ onSubmit }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-[#884DFE] w-full py-4 rounded shadow-sm-custom1 flex justify-center items-center gap-[10px] mb-3"
      >
        <div className="w-[14px] h-[14px]">
          <Image
            src={PLUSIMG}
            alt="Search"
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
        Create a Category
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Category Modal"
        className="create "
        overlayClassName="overlay-create"
      >
        <h2 className="text-2xl leading-6 font-medium mb-3 text-center">
          Create Category
        </h2>
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
              errors.title = "Category title is required";
            }
            return errors;
          }}
        >
          <Form>
            <Field
              type="text"
              name="title"
              placeholder="Category Title"
              className="block w-full p-3 rounded-md text-sm bg-[#24252E] placeholder-[#9b9d9f] border border-[#323443] mb-4"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-600 mb-2"
            />
            <button
              type="submit"
              className="w-full h-[38px] rounded gradient-custom1 shadow-sm-custom1 font-bold"
            >
              Add Category
            </button>
          </Form>
        </Formik>
        <button
          onClick={closeModal}
          className="text-[#FF5B5B] mt-3 mx-auto block"
        >
          Cancel
        </button>
      </Modal>
    </>
  );
}
