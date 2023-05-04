import React from "react";
import { BsLightningFill } from "react-icons/bs";
import { MdQuestionAnswer } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import Avatar from "../Avatar/Avatar";
import { convertJoinedDate, tagArr } from "../../utils/dateConversion";
import Tag from "../Tag/Tag";
import UserImg from "./../../assets/images/user.png";
import SolverImg from "./../../assets/images/solver.png";
import ExpertImg from "./../../assets/images/expert.png";
import ChampionImg from "./../../assets/images/champion.png";
import { Divider } from "antd";

const UserCard = ({ user, tab }) => {
  const tags = tagArr(user.taglist);
  let stringArr, stringData, badgeArr, expertiesArr;
  if (user.badgelist && user.badgelist !== null) {
    stringArr = JSON.parse(user && user.badgelist);
    badgeArr = Object.values(stringArr);
  }
  if (user.experties && user.experties !== null) {
    stringData = user && user.experties;
    expertiesArr = stringData.split(",").map((item) => item.trim());
  }

  return (
    <>
      <div className="card mb-2 py-1">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <Avatar
            avatarImg={UserImg}
            style={{ width: "60px", height: "60px" }}
            className="rounded-circle img-thumbnail"
          />
          <p
            className="mt-1 lead mb-0 fw-bold"
            style={{ color: "var(--clr-light-blue)", fontSize: "17px" }}
          >
            {user.firstname} {user.lastname}
          </p>
          <span className="idd1 text-muted">
            {tab === "users" ? user.emailid : false}
          </span>
          <span className="idd">{user.department}</span>
          {tab === "topContributer" ? (
            <div className="m-auto gap-3 mt-2 d-flex">
              <BsLightningFill className="icon mt-1  text-warning" />
              <span className="fs-200 mb-1 text-muted">
                {user.points} Points
              </span>
            </div>
          ) : tab === "topBadges" ? (
            <>
              <BadgeSection badges={badgeArr} />
              <Experties expertiesArr={expertiesArr} />
            </>
          ) : tab === "topVotedAnswer" ? (
            <AnsStats ans={user.totalanswer} votes={user.totalupvotes} />
          ) : tab === "topVotedQuestion" ? (
            <QueStats que={user.totalquestion} votes={user.totalupvotes} />
          ) : tab === "users" ? (
            <InfoSection
              joining={convertJoinedDate(user.createddatetime)}
              questions={user.noofquestions}
              light={user.points}
            />
          ) : null}

          <div className="text-center">
            {tags.length === 0 && tab === "users" ? (
              <div style={{ marginTop: "66px" }}></div>
            ) : (
              <div
                style={{
                  overflowX: "scroll",
                  overflowY: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {tab === "users" ? (
                  <Divider
                    className="m-0 mb-1 text-muted "
                    style={{ fontSize: "var(--fs-200)" }}
                  >
                    Expertise
                  </Divider>
                ) : (
                  false
                )}
                {tags.map((tag) => (
                  <Tag className="experties" name={tag} key={tag} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;

const QueStats = ({ que, votes }) => {
  return (
    <div className="text-center my-2">
      <div
        className="card mb-1 p-1 text-light"
        style={{ width: "8rem", backgroundColor: "var(--clr-light-blue)" }}
      >
        {que} questions
      </div>

      <div className="card p-1 bg-light text-dark" style={{ width: "8rem" }}>
        {votes} votes
      </div>
    </div>
  );
};

const AnsStats = ({ ans, votes }) => {
  return (
    <div className="text-center my-2">
      <div
        className="card mb-1 p-1 text-light"
        style={{ width: "8rem", backgroundColor: "var(--clr-light-blue)" }}
      >
        {ans} answers
      </div>

      <div className="card p-1 bg-light text-dark" style={{ width: "8rem" }}>
        {votes} votes
      </div>
    </div>
  );
};

const Experties = ({ expertiesArr }) => {
  return (
    <>
      {expertiesArr === undefined ? (
        <div style={{ marginTop: "75px" }}></div>
      ) : (
        <>
          <Divider
            className="m-0 mb-1 text-muted "
            style={{ fontSize: "var(--fs-200)" }}
          >
            Expertise
          </Divider>
          <div className="container text-center" style={{ padding: "5px" }}>
            <div
              style={{
                overflowX: "scroll",
                overflowY: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {expertiesArr.map((tag) => (
                <Tag className="experties" name={tag} key={tag} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const BadgeSection = ({ badges }) => {
  console.log(badges);
  return (
    <div className="row">
      {badges !== undefined ? (
        badges.map((badge) => (
          <div className="gap-3 mt-3 icons d-flex flex-row text-center">
            <p>
              <img
                src={
                  badge.badgename === "Problem_Solver"
                    ? SolverImg
                    : badge.badgename === "Champion"
                    ? ChampionImg
                    : badge.badgename === "Expert"
                    ? ExpertImg
                    : null
                }
                alt="badge icon"
              />
              <div
                className="fw-bold"
                style={{ color: "var(--clr-light-blue)" }}
              >
                {badge.totalbadgecount}
              </div>
            </p>
          </div>
          //  <div key={badge.badgeid} className="col-md-4 px-0">
          // <div className="text-center">
          //   <img
          //     src={
          //       badge.badgename === "Problem_Solver"
          //         ? SolverImg
          //         : badge.badgename === "Champion"
          //         ? ChampionImg
          //         : badge.badgename === "Expert"
          //         ? ExpertImg
          //         : null
          //     }
          //     alt="badge icon"
          //   />
          //   <div
          //     className="fw-bold"
          //     style={{ color: "var(--clr-light-blue)" }}
          //   >
          //     {badge.totalbadgecount}
          //   </div>
          // </div>
          //  </div>
        ))
      ) : (
        <div style={{ marginTop: "90px" }}></div>
      )}
    </div>
  );
};

const InfoSection = ({ joining, questions, light }) => {
  return (
    <div className="text">
      <div className="m-auto gap-3 d-flex">
        <BiTimeFive className="icon mt-1 text-muted" />
        <span className="fs-200 mb-1 text-muted">Joined {joining}</span>
      </div>
      <div className="m-auto gap-3 d-flex">
        <MdQuestionAnswer className="icon mt-1 text-muted" />
        <span className="fs-200 mb-1 text-muted">{questions} Questions</span>
      </div>
      <div className="m-auto gap-3 d-flex">
        <BsLightningFill className="icon mt-1  text-warning" />
        <span className="fs-200 mb-1 text-muted">{light} Points</span>
      </div>
    </div>
  );
};
