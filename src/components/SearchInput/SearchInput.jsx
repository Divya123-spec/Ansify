import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

const { Search } = Input;

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleSearchSubmit = () => {
    if (searchText !== "") {
      navigate(`/search-results/${searchText}`);
      setSearchText("");
    }
  };
  return (
    <>
      <Search
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={handleSearchSubmit}
        className="mt-1"
      />
    </>
  );
};

export default SearchInput;
