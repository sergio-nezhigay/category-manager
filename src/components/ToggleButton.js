import React from "react";

export default function ToggleButton({ onToggle, isVisible }) {
  return (
    <button
      onClick={() => onToggle()}
      className={`group flex justify-center items-center gap-1 h-[26px] p-[7px] rounded-full ${
        isVisible ? "bg-[#3e3f49]" : "bg-[#272934]"
      }`}
    >
      {isVisible ? (
        <>
          <span className="text-[#07D41B] group-hover:text-white">On</span>
          <div className="w-3 h-3 bg-[#07D41B] group-hover:bg-white rounded-full"></div>
        </>
      ) : (
        <>
          <div className="w-3 h-3 bg-[#787a7f] rounded-full group-hover:bg-white"></div>
          <span className="text-[#9B9D9F] group-hover:text-white">Off</span>
        </>
      )}
    </button>
  );
}
