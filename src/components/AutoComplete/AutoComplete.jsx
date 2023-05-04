import { Select, Spin } from "antd";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useMemo, useRef, useState } from "react";

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect

async function fetchUserList(search) {
  let searchText = search.replace("#", "%23");
  if (search !== "") {
    return fetch(
      `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/tag/suggest/${searchText}/v1`
    )
      .then((response) => response.json())
      .then((body) =>
        body.map((tag) => ({
          label: `${tag.tagText}`,
          value: tag.tagId.toString(),
        }))
      )
      .catch((err) => console.log(err));
  }
}

const AutoComplete = ({ placeholder, tags, setTags }) => {
  return (
    <DebounceSelect
      mode="tags"
      value={tags}
      placeholder={placeholder}
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        setTags(newValue);
      }}
      style={{
        width: "100%",
      }}
    />
  );
};
export default AutoComplete;
