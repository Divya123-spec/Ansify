import React from "react";

const Tag = ({ name, className }) => (
  <div className={`uppercase ${className}`}>{name}</div>
);
export default Tag;
