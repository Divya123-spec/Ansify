import React from "react";
import { FiCheckSquare, FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { RiBookmark3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Divider, Button, Popover } from "antd";
import Clipboard from "../CopyToClipboard/CopyToClipboard";
import ShowLessShowMore from "../ShowLessShowMore/ShowLessShowMore";
import axios from "axios";
import QuestionTag from "./QuestionTag";
import ShowAnsCount from "./ShowAnsCount";
import UserDetails from "./UserDetails";
import AssignBadgeCard from "./AssignBadgeCard";


const Post = ({ post, isStarred, isBookmarked }) => {
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userInfo = JSON.parse(_USER_DETAILS);
  let userId = userInfo && userInfo.userid;
  
  const {
    active,
    createdBy,
    createdByUserId,
    deleted,
    questionId,
    status,
    text,
    title,
    createdDttm,
    updateddDttm,
    userDetails,
  } = post;
  console.log(`active : ${active}`);

  const handleBookmark = async () => {
    const bookmarkURL = `${
      process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT
    }/questionservice/question/questionStar/${userId}/${questionId}/${!active}/v1`;
    await axios
      .put(bookmarkURL)
      .then((res) => {
        if (res.status === 200) isBookmarked();
      })
      .catch((err) => console.log(err));
  };

  const handleViewCount = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/addView/${id}/v1`
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="card mb-3" key={post.id} style={{ width: "100%" }}>
      {!deleted && (
        <>
          <div
            className="card-header py-1 px-2 d-flex justify-content-between"
            style={{ backgroundColor: "rgba(0,0,0,0)", borderBottom: "none" }}
          >
            {userDetails.userId !== userId ? (
              <Popover
                content={<AssignBadgeCard userDetails={userDetails} />}
                trigger="hover"
                placement="bottom"
              >
                <div className="d-flex gap-2" style={{ cursor: "pointer" }}>
                  <UserDetails
                    firstName={userDetails.firstName}
                    lastName={userDetails.lastName}
                    createdDttm={
                      createdDttm !== null ? createdDttm : updateddDttm
                    }
                    edited={updateddDttm}
                  />
                </div>
              </Popover>
            ) : (
              <div className="d-flex gap-2">
                <UserDetails
                  firstName={userDetails.firstName}
                  lastName={userDetails.lastName}
                  createdDttm={
                    createdDttm !== null ? createdDttm : updateddDttm
                  }
                  edited={updateddDttm}
                />
              </div>
            )}

            <div className="d-flex justify-content-end align-items-center">
              <Clipboard text={questionId} />
              {isStarred ? null : (
                <Button
                  className="btn btn-sm"
                  title="Save"
                  onClick={handleBookmark}
                >
                  <RiBookmark3Fill
                    style={{
                      color: post.active
                        ? "var(--clr-dark-blue)"
                        : "rgb(179,178,178)",
                      fontSize: "18px",
                    }}
                  />
                </Button>
              )}
            </div>
          </div>

          <div className="card-body py-2">
            <Link
              to={`/question/${post.questionId}`}
              className="mb-0 fw-bold"
              onClick={() => handleViewCount(post.questionId)}
              style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
            >
              {title}
            </Link>
            <ShowLessShowMore displayHtml description={text}></ShowLessShowMore>
            <QuestionTag className="mt-1" id={questionId} />
          </div>

          <Divider className="mb-0 mt-0" />
          <CardFooter post={post} />
        </>
      )}
    </div>
  );
};

export default Post;

const CardFooter = ({ post }) => {
  const { totalViews, downVotes, upVotes, questionId } = post;
  return (
    <div className="p-2 mx-2 d-flex justify-content-between">
      <div className="d-flex gap-4">
        <ShowAnsCount queID={questionId} />

        <p className="mb-0">
          <FiCheckSquare className="icon text-muted" />
          <small> Votes</small>{" "}
          <small className="text-muted">{upVotes - downVotes}</small>
        </p>
        <p className="mb-0">
          <FaRegEye className="icon text-muted" />
          <small> Views</small>{" "}
          <small className="text-muted">{totalViews}</small>
        </p>
      </div>

      <div className="d-flex justify-content-end align-items-center">
        <Link
          to={`/ask-question/${questionId}/edit`}
          className="btn-sm text-muted"
        >
          <FiEdit className="icon" />
        </Link>
      </div>
    </div>
  );
};
