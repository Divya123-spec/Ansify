import React from "react";

const example = {
  margin: "20px 0",
  marginBottom: "20px",
  padding: "30px 50px",
  textAlign: "center",
  background: " rgba(0, 0, 0, 0.05)",
  borderRadius: "4px",
};

const Spinner = () => {
  return (
    <div style={example}>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
