import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input } from "antd";
const { Search } = Input;

const FilterInput = ({ getFilterText }) => {
  const [filterText, setFilterText] = useState("");

  const handleOnFilter = (e) => {
    const { value } = e.target;
    setFilterText(value);
  };

  const handleSubmit = () => {
    getFilterText(filterText);
  };

  return (
    <div className="input-group mb-3">
      <Search
        placeholder="Filter by Name"
        value={filterText}
        onChange={handleOnFilter}
        onSearch={handleSubmit}
      />
    </div>
  );
};

export default FilterInput;
