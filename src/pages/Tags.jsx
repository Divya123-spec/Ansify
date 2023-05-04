import React, { useState, useEffect } from "react";
import { useNavigation } from "react-router-dom";
import TagsCard from "../components/Cards/TagsCard";
import Spinner from "../components/Spinner";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { Divider, Input, Select, Pagination } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Radio } from "antd";
import "./Tags.css";

import useScrolltoTop from "../hooks/useScrollToTop";
const { Search } = Input;

const Tags = () => {
  useScrolltoTop();
  const [checked, setChecked] = useState("popular");
  const [searchText, setSearchText] = useState("");
  const [tagsList, setTagsList] = useState();
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const postsPerPage = 6;

  const handlePagination = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * postsPerPage);
    setMaxIndex(page * postsPerPage);
  };

  const handleOnChange = (e) => {
    setChecked(e.target.value);
  };

  const SORT_OPTIONS = [
    {
      label: (
        <Radio.Group onChange={handleOnChange} defaultValue={checked}>
          <div>
            <Radio value={"popular"}>Popular</Radio>
          </div>
          <Divider className="mb-2 mt-2" />
          <div>
            <Radio value={"name"}>Name (A-Z)</Radio>
          </div>
        </Radio.Group>
      ),
      key: "1",
    },
  ];

  const FETCH_TAG_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/tag/list/v1`;

  const PAYLOAD = {
    page: current,
    size: postsPerPage,
    order: "DESC",
    sortBy: "questionCount",
  };
  useEffect(() => {
    if (checked === "popular") {
      PAYLOAD["sortBy"] = "questionCount";
    } else if (checked === "name") {
      PAYLOAD["sortBy"] = "tagText";
      PAYLOAD["order"] ="ASC"
    }
    const getUsers = async () => {
      axios
        .post(FETCH_TAG_URL, PAYLOAD)
        .then((res) => {
          if (res.status === 200) {
            setTagsList(res.data.list);
            setTotal(res.data.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getUsers();
  }, [current, checked]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const FilterUrl = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/tag/suggest/${searchTerm}/v1`;
  const { data, error } = useFetch(FilterUrl);

  const filtered = !searchTerm
    ? tagsList &&
      tagsList.filter((post) =>
        searchText === ""
          ? post
          : post.tagText
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase())
      )
    : data &&
      data.filter((post) =>
        searchText === ""
          ? post
          : post.tagText
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase())
      );

  const getText = (text) => {
    setSearchText(text);
  };

  if (navigation.state === "loading") {
    return <Spinner />;
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <h4 style={{ fontWeight: "900" }}>Tags</h4>
          <p>
            A tag is a keyword or label that categorizes your question with
            other, similar questions. Using the right tags makes it easier for
            others to find and answer your question.
          </p>

          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="input-group mb-3">
                    <Search
                      placeholder="Filter by Name"
                      value={searchTerm}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-0 ">
              <Select
                className="float-end"
                placeholder="Sort by"
                style={{
                  width: 160,
                }}
                options={SORT_OPTIONS}
              />
            </div>
          </div>

          <div className="row">
            {filtered.map((post) => (
              <div className="col-md-4" key={post.tagId}>
                <TagsCard post={post} />
              </div>
            ))}
          </div>
          <div className="pb-0 mt-2 d-flex justify-content-center align-item-center">
            <Pagination
              responsive
              pageSize={postsPerPage}
              current={current}
              total={total}
              onChange={handlePagination}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Tags;
