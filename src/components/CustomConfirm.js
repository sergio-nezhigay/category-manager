import React from "react";

function CustomConfirm(props) {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      flex flex-col rounded shadow-sm-custom2 items-center justify-center gap-6 
      bg-[#272934] py-8 px-6 w-[300px] md:w-[400px]"
    >
      <h2 className="text-2xl leading-6 font-medium">Delete the Category?</h2>
      <p className="text-xl leading-6 text-center text-[#9B9D9F]">
        All templates in the category will be moved to the category
        &quot;Other&quot;
      </p>
      <button
        onClick={() => {
          props.onConfirm();
          props.onClose();
        }}
        className="flex justify-center items-center gap-3 w-full h-[58px] rounded gradient-custom1 shadow-sm-custom1 font-bold transition duration-300 hover:shadow-md hover:text-[#b4b2b2]"
      >
        <span>Delete</span>
      </button>
      <button
        onClick={props.onClose}
        className="text-[#FF5B5B] transition duration-300 hover:text-[#f9b1b1]"
      >
        Cancel
      </button>
    </div>
  );
}

export default CustomConfirm;
