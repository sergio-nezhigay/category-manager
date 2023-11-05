import React from "react";
import { Formik, Form, Field } from "formik";
import Image from "next/image";

const SEARCHIMG = "/images/search.svg";

export default function SearchForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ filter: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values.filter);
        setSubmitting(false);
      }}
    >
      <Form className="flex  justify-between bg-[#30313C] py-2.5 px-5 rounded w-[175px] md:w-[380px]  ">
        <Field
          type="text"
          name="filter"
          placeholder="Search"
          className="  text-sm bg-transparent placeholder-[#9b9d9f] w-full"
        />
        <button
          type="submit"
          className="flex justify-between items-center ml-3"
        >
          <Image src={SEARCHIMG} alt="Search" width={20} height={20} />
        </button>
      </Form>
    </Formik>
  );
}
