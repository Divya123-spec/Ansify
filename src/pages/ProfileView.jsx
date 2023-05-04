import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import Avatar from "../components/Avatar/Avatar";
import useFetch from "../hooks/useFetch";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineGithub } from "react-icons/ai";
import { FiGlobe } from "react-icons/fi";
import { Radio, Select, Divider, Button, Space, Typography, Card } from "antd";
import UserQuestions from "./UserQuestions";
import UserAnswersList from "./UserAnswersList";
import { convertJoinedDate, tagArr } from "../utils/dateConversion";
import Tag from "../components/Tag/Tag";
import UserImg from "./../assets/images/user.png";
import SolverImg from "../assets/images/solver.png";
import ExpertImg from "../assets/images/expert.png";
import ChampionImg from "../assets/images/champion.png";
import { Link, useNavigate } from "react-router-dom";

const ProfileView = () => {
  const [questionList, setQuestionList] = useState();
  const [answersList, setAnswerList] = useState();
  const [checked, setChecked] = useState("score");
  const [answerChecked, setAnswerChecked] = useState("score");
  const navigate = useNavigate();
  const onClickProfile = () => navigate("/edit-profile");
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userInfo = JSON.parse(_USER_DETAILS);
  let userId = userInfo && userInfo.userid;

  const url = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/get/${userId}/v1`;
  const { data, loading, error } = useFetch(url);
  let str = data.taglist;
  const tags = tagArr(str);

  let experties = data.experties;
  const experienceIn = tagArr(experties);

  const handleOnChange = e => {
    console.log(e.target.value);
    setChecked(e.target.value);
  };
  const SORT_QUESTION_OPTIONS = [
    {
      label: (
        <Radio.Group onChange={handleOnChange} defaultValue={checked}>
          <div>
            <Radio value={"score"}>score</Radio>
          </div>
          <Divider className="mb-2 mt-2" />
          <div>
            <Radio value={"latest"}>Latest</Radio>
          </div>
        </Radio.Group>
      ),
      key: "1"
    }
  ];
  const answerHandleOnChange = e => {
    setAnswerChecked(e.target.value);
  };
  const SORT_ANSWER_OPTIONS = [
    {
      label: (
        <Radio.Group onChange={answerHandleOnChange} defaultValue={checked}>
          <div>
            <Radio value={"score"}>Score</Radio>
          </div>
          <Divider className="mb-2 mt-2" />
          <div>
            <Radio value={"latest"}>Latest</Radio>
          </div>
        </Radio.Group>
      ),
      key: "1"
    }
  ];
  const FETCH_QUESTION_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/questionList/${userId}/v1`;
  let QUESTION_PAYLOAD = {
    page: 1,
    size: 30,
    order: "DESC",
    sortBy: "score"
  };
  useEffect(() => {
    if (checked === "score") {
      QUESTION_PAYLOAD["sortBy"] = "score";
    } else if (checked === "latest") {
      QUESTION_PAYLOAD["sortBy"] = "questionId";
    }
    const getUserQuestions = async () => {
      await axios
        .post(FETCH_QUESTION_URL, QUESTION_PAYLOAD)
        .then(res => {
          if (res.status === 200) {
            setQuestionList(res.data.list);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getUserQuestions();
  }, [checked]);
  const FETCH_ANSWER_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/answer/answerlist/${userId}/v1`;
  let ANSWER_PAYLOAD = {
    page: 1,
    size: 30,
    order: "DESC",
    sortBy: "score"
  };

  useEffect(() => {
    if (answerChecked === "score") {
      ANSWER_PAYLOAD["sortBy"] = "score";
    } else if (answerChecked === "latest") {
      ANSWER_PAYLOAD["sortBy"] = "questionId";
    }

    const getUserAnswers = async () => {
      await axios
        .post(FETCH_ANSWER_URL, ANSWER_PAYLOAD)
        .then(res => {
          if (res.status === 200) {
            setAnswerList(res.data.list);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getUserAnswers();
  }, [answerChecked]);

  if (loading) return <Spinner />;

  let stringArr, badgeArr;
  if (data.badgelist && data.badgelist !== null) {
    stringArr = JSON.parse(data && data.badgelist);
    badgeArr = Object.values(stringArr);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-3 text-center">
              <Avatar
                avatarImg={UserImg}
                className="rounded-circle img-thumbnail"
                style={{ width: "65%" }}
              />
            </div>
            <div className="col-md-9">
              <Space split={<Divider type="vertical" />}>
                <Typography
                  className="fw-bold"
                  style={{ fontSize: "18px", color: "var(--clr-light-blue)" }}
                >
                  {data && data.firstname + " " + data.lastname}
                </Typography>
                <Typography.Link className="text-dark">
                  <FiGlobe style={{ fontSize: "18px" }} />
                </Typography.Link>
                <Typography.Link className="text-dark">
                  <AiOutlineGithub style={{ fontSize: "18px" }} />
                </Typography.Link>
                <Typography>
                  <Button size="small" onClick={onClickProfile}>
                    <MdOutlineModeEditOutline className="icon" /> Edit profile
                  </Button>
                </Typography>
              </Space>

              <div>
                <small className="mb-0">{data && data.department}</small>
                <p className="mb-0">
                  {/* Member since {data && convertJoinedDate(data.createddatetime)} */}
                  Member since Apr, 2023
                </p>
              </div>
              <div className="mb-0 fw-bold">
                <BsFillLightningChargeFill
                  color="gold"
                  fill="gold"
                  className="icon"
                />{" "}
                {data && data.points}
              </div>
              <div className=" mb-0 fw-bold">
                <p className="d-flex m-2 fw-bold">
                  About :
                  <p className="d-flex" style={{ fontSize: "16px" }}>
                    {data && data.about}
                    &nbsp;
                  </p>
                </p>
              </div>
              <div className="bg-light text-dark mb-0 fw-bold">
                <p className="d-flex m-2 fw-bold">
                  Experience in:
                  {experienceIn.length === 0
                    ? ""
                    : experienceIn.map(expert => (
                        <p className="d-flex fw-bold"> {expert} &nbsp;</p>
                      ))}
                </p>
              </div>
              <Card style={{ width: 400 }}>
                <Space split={<Divider type="vertical" />} size="large">
                  {badgeArr !== undefined ? (
                    badgeArr.map(badge => (
                      <div className="text-center">
                        <Typography>
                          {badge.badgename === "Problem_Solver"
                            ? "Problem Solver"
                            : badge.badgename}
                        </Typography>
                        <img
                          src={
                            badge.badgename === "Expert"
                              ? ExpertImg
                              : badge.badgename === "Champion"
                              ? ChampionImg
                              : badge.badgename === "Problem_Solver"
                              ? SolverImg
                              : false
                          }
                          alt={badge.badgename}
                        />{" "}
                        <span className="fw-bold" style={{ fontSize: "20px" }}>
                          {badge.totalbadgecount}
                        </span>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </Space>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          Top Tags
          <div>
            <span>
              {tags.length === 0 ? (
                <div style={{ marginTop: "39px" }}></div>
              ) : (
                tags.map(tag => <Tag className="tag" name={tag} key={tag} />)
              )}
            </span>
          </div>
        </div>
      </div>
      <ul
        className="nav justify-content-start text-light nav-pills mt-3 mb-2"
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
            Questions
          </a>
        </li>
        <li className="nav-item">
          <a href="#honoered-badges" className="nav-link" data-bs-toggle="tab">
            Answers
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="contributors">
          <div className="row">
            <div className="row">
              <p
                className="col-md-10 my-auto fw-bold"
                style={{ color: "var(--clr-light-blue)" }}
              >
                Questions ({(questionList && questionList.length) || 0})
              </p>
              <div className="col-md-2 mt-0 float-end">
                <Select
                  className="float-end"
                  placeholder="Sort by"
                  style={{
                    width: 160
                  }}
                  options={SORT_QUESTION_OPTIONS}
                />
              </div>
            </div>

            <div className="mt-4">
              {questionList &&
                questionList.map(question => (
                  <UserQuestions
                    key={question.questionId}
                    question={question}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="honoered-badges">
          <div className="row">
            <div className="row ">
              <p
                className="col-md-10 my-auto fw-bold"
                style={{ color: "var(--clr-light-blue)" }}
              >
                Answers ({(answersList && answersList.length) || 0})
              </p>
              <div className="col-md-2 mt-0 float-end">
                <Select
                  className="float-end"
                  placeholder="Sort by"
                  style={{
                    width: 160
                  }}
                  options={SORT_ANSWER_OPTIONS}
                />
              </div>
            </div>

            <div className="mt-4">
              {answersList &&
                answersList.map(answers => (
                  <UserAnswersList key={answers.questionId} answers={answers} />
                ))}
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="voted-questions">
          <div className="row">nnnnn</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
