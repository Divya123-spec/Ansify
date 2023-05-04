import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useScrolltoTop from "../hooks/useScrollToTop";
import SearchPage from "./SearchPage";

const SearchResults = () => {
  useScrolltoTop();

  const params = useParams();

  const [SearchResult, setSearchResult] = useState({});
  const url = `${process.env.REACT_APP_SEARCH_SERVICE_ENDPOINT}/searchservice/search/list/v1`;
  const userObj = {
    total: 20,
    page: 1,
    size: 10,
    order: "DESC",
    sortBy: "title",
  };

  const SearchResults = (params) => {
    userObj["searchText"] = params.text;
    axios
      .request({
        method: "post",
        url: url,
        port: 8081,
        data: userObj,
      })
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    SearchResults(params);
  }, [params]);

  return (
    <div className="container">
      <p
        className="h5 mb-1 mb-0 fw-bold"
        style={{ color: "var(--clr-light-blue)", fontSize: "18px" }}
      >
        Showing results for{" "}
        <small style={{ color: "black" }}>"{params.text}"</small>
      </p>
      <p className="h6">Total Results</p>
      <div className="row mb-4">
        <div className="col-md-10">
          <div className="row">
            {SearchResult.list &&
              SearchResult.list.map((post) => (
                <SearchPage key={post.questionId} post={post} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
