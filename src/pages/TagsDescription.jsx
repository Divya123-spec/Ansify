import React, { useState, useEffect } from "react";
import TagsDescriptionHeader from "./Tags/TagsDescriptionHeader";
import axios from "axios";
import OverviewQuestion from "./Tags/OverviewQuestion";
import QuestionsTab from "./Tags/QuestionsTab";
import TagsSettings from "./Tags/TagsSettings";
import TagsTab from "./Tags/TagsTab";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";
import useScrolltoTop from "../hooks/useScrollToTop";
import { Dropdown, Space, Radio, Divider, Select, Button } from "antd";


const TagsDescription = () => {
  useScrolltoTop();
  const [tagQue, setTagQue] = useState([]);
  const [checked, setChecked] = useState("score");
  const location = useLocation();

  const handleOnChange = e => {
    setChecked(e.target.value);
  };

  const SORT_OPTIONS = [
    {
      label: (
        <Radio.Group onChange={handleOnChange} defaultValue={checked}>
          <div>
            <Radio value={"latest"}>Latest</Radio>
          </div>
          <Divider className="mb-2 mt-2" />
          <div>
            <Radio value={"score"}>Score</Radio>
          </div>
        </Radio.Group>
      ),
      key: "1"
    }
  ];
  const tagId = location.pathname.split("/")[2];
  const url = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/tag/get/${tagId}/v1`;
  const { data, isLoading, error } = useFetch(url);

  const FETCH_QUESTION_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/questionList/tag/${tagId}/v1`;

  const PAYLOAD = {
    page: 1,
    size: 30,
    order: "DESC",
    sortBy: "questionId"
  };

  useEffect(() => {
    if (checked === "latest") {
      PAYLOAD["sortBy"] = "questionId";
    } else if (checked === "score") {
      PAYLOAD["sortBy"] = "score";
    }

    const getQuestions = async () => {
      axios
        .post(FETCH_QUESTION_URL, PAYLOAD)
        .then(res => {
          if (res.status === 200) {
            setTagQue(res.data.list);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getQuestions();
  }, [checked]);

  // let sortedList =   tagQue.sort(function(a, b) {
  //   return new Date(b.createdDttm) - new Date(a.createdDttm);
  // });
  var sortedList = tagQue.slice(0, 5);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error occurred...</p>;
  }
  return (
    <div className="container">
      <TagsDescriptionHeader data={data}></TagsDescriptionHeader>
      <ul
        className="nav  justify-content-start text-light nav-pills mb-5"
        style={{
          backgroundColor: "var(--clr-dark-blue)",
          color: "var(--clr-white)"
        }}
      >
        <li className="nav-item ">
          <a
            href="#contributors"
            className="nav-link active"
            data-bs-toggle="tab"
          >
            Overview
          </a>
        </li>
        <li className="nav-item">
          <a href="#honoered-badges" className="nav-link" data-bs-toggle="tab">
            Questions
          </a>
        </li>
        <li className="nav-item">
          <a href="#voted-questions" className="nav-link" data-bs-toggle="tab">
            Settings
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="contributors">
          <div className="row">
            <p className="lead fw-bold ms-4" style={{ color: "var(--clr-light-blue)" }}>
              Most Recent Questions
            </p>
            {sortedList &&
              sortedList.map(post => (
                <OverviewQuestion
                  key={post.questionId}
                  post={post}
                ></OverviewQuestion>
              ))}
          </div>
        </div>
        <div className="tab-pane fade" id="honoered-badges">
          <div className="row">
            <div className="row mb-4">
              <h4
                className="col-md-10 lead fw-bold"
                style={{ color: "var(--clr-light-blue)" }}
              >
                Questions
              </h4>
              <div className="col-md-2 mt-0 d-flex flex-column justify-content-end ">
                <Select
                  className="float-end"
                  placeholder="Sort by"
                  style={{
                    width: 160
                  }}
                  options={SORT_OPTIONS}
                />
              </div>
            </div>
            <br></br>
            {tagQue &&
              tagQue.map(post => (
                <QuestionsTab key={post.questionId} post={post}></QuestionsTab>
              ))}
          </div>
        </div>
        {/* future release  it will needed */}
        {/* <div className="tab-pane fade" id="voted-answers">
          <div className="row">
            <TagsTab></TagsTab>
          </div>
        </div> */}
        <div className="tab-pane fade" id="voted-questions">
          <div className="row">
            <TagsSettings></TagsSettings>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsDescription;
