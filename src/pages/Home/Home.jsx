import React from "react";
import { useState } from "react";
import useScrolltoTop from "../../hooks/useScrollToTop";
import QuestionsListTab from "./QuestionsListTab";

const Home = () => {
  useScrolltoTop();
  const [tabName, setTabName] = useState("");

  const handleTabChange = (selectedTab) => {
    setTabName(selectedTab);
  };

  return (
    <div className="container">
      <>
        {/* TABS */}
        <ul
          className="nav justify-content-start text-light nav-pills mb-2"
          style={{ backgroundColor: "var(--clr-dark-blue)", color: "white" }}
        >
          <li className="nav-item ">
            <a
              href="#recent-questions"
              className="nav-link active mb-0"
              data-bs-toggle="tab"
              onClick={() => handleTabChange("recentQuestionTab")}
            >
              Recent Questions
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#top-questions"
              className="nav-link mb-0"
              data-bs-toggle="tab"
              onClick={() => handleTabChange("topQuestionTab")}
            >
              Top Questions
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="recent-questions">
            <QuestionsListTab tabName={tabName} />
          </div>
          <div className="tab-pane fade" id="top-questions">
            <QuestionsListTab tabName={tabName} />
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
