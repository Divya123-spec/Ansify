import React from "react";

function Button(props) {
  return (
    <>
      <button
        type="button"
        className={`btn ${props.className}`}
        style={props.style}
        onClick={props.onClick}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={props.title}
      >
        {props.children}
      </button>
    </>
  );
}

export default Button;
