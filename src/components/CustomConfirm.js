import React from "react";
// import './customUi.css';

function CustomConfirm(props) {
  return (
    <div className="popup-overlay">
      <h2>Delete the category?</h2>
      <p>
        All templates in the category will be moved to the category
        &quot;Other&quot;
      </p>
      <button onClick={props.onClose}>Cancel</button>
      <button
        onClick={() => {
          props.onConfirm();
          props.onClose();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default CustomConfirm;
