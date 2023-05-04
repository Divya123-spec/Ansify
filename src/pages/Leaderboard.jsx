import { Card, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../components/Cards/UserCard";
import useScrolltoTop from "../hooks/useScrollToTop";
import Cup from "./../assets/images/cup.png";
import Badge from "./../assets/images/badge.png";
import Answer from "./../assets/images/answer.png";
import Question from "./../assets/images/question.png";

// const tabs = [
//   {
//     id: 1,
//     tabName: "Our Top Contributors",
//     content: "CONTENT 1",
//   },
//   {
//     id: 2,
//     tabName: "Our Heroes with Honoered Badges",
//     content: "CONTENT 2",
//   },
//   {
//     id: 3,
//     tabName: "Users with most Voted Answers",
//     content: "CONTENT 3",
//   },
//   {
//     id: 4,
//     tabName: "Users with most Voted Questions",
//     content: "CONTENT 4",
//   },
// ];

const Leaderboard = () => {
  useScrolltoTop();

  const [data, setData] = useState([]);
  const [tab, setTab] = useState("topContributer");

  const URL = `${process.env.REACT_APP_SEARCH_SERVICE_ENDPOINT}/searchservice/search/`;

  useEffect(() => {
    loadData(tab);
  }, [tab]);

  const loadData = async (_tabName) => {
    await axios
      .get(`${URL}${_tabName}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        } else setData([]);
      })
      .catch((err) => console.log(err));
  };

  const handleTabChange = (_tab) => {
    setTab(_tab);
  };

  return (
    <div className="container">
      <ul
        className="nav justify-content-start text-light nav-pills mb-2"
        style={{
          backgroundColor: "var(--clr-dark-blue)",
          color: "var(--clr-white)",
        }}
      >
        <li className="nav-item live">
          <a
            href="#contributers"
            className="nav-link active mb-0"
            data-bs-toggle="tab"
            onClick={() => handleTabChange("topContributer")}
          >
            Our Top Contributors
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#honoered-badges"
            className="nav-link mb-0"
            data-bs-toggle="tab"
            onClick={() => handleTabChange("topBadges")}
          >
            Merit board of Badges
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#voted-answers"
            className="nav-link mb-0"
            data-bs-toggle="tab"
            onClick={() => handleTabChange("topVotedAnswer")}
          >
            Answer Wizards
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#voted-questions"
            className="nav-link mb-0"
            data-bs-toggle="tab"
            onClick={() => handleTabChange("topVotedQuestion")}
          >
            Question Wizards
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="contributers">
          <Title icon={Cup} text="Our top 10 leading contributors" />

          <div className="row row-cols-5">
            {data &&
              data.map((user, index) => (
                <div className="col" key={index}>
                  <UserCard user={user} tab={tab} />
                </div>
              ))}
          </div>
        </div>
        <div className="tab-pane fade" id="honoered-badges">
          <Title
            icon={Badge}
            text="Our top 10 leading badge receivers for this month"
          />

          <div className="row row-cols-5">
            {data &&
              data.map((user, index) => (
                <div className="col" key={index}>
                  <UserCard user={user} tab={tab} />
                </div>
              ))}
          </div>
        </div>
        <div className="tab-pane fade" id="voted-answers">
          <Title icon={Answer} text="Top 10 users with most voted answers" />

          <div className="row row-cols-5">
            {data &&
              data.map((user, index) => (
                <div className="col" key={index}>
                  <UserCard user={user} tab={tab} />
                </div>
              ))}
          </div>
        </div>
        <div className="tab-pane fade" id="voted-questions">
          <Title
            icon={Question}
            text="Our top 10 users with most voted questions"
          />

          <div className="row row-cols-5">
            {data &&
              data.map((user, index) => (
                <div className="col" key={index}>
                  <UserCard user={user} tab={tab} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Title = ({ icon, text }) => {
  return (
    <Card className="mb-2">
      <Typography className="fw-bold" style={{ padding: "0px" }}>
        <img src={icon} alt="ICON" width="30px" /> {text}
      </Typography>
    </Card>
  );
};

export default Leaderboard;
