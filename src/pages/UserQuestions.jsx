import React from "react";
import { FiCheckSquare } from "react-icons/fi";
import ShowAnsCount from "../components/Cards/ShowAnsCount";
import { Link } from "react-router-dom";
import { convertDate } from "../utils/dateConversion";
import { Divider } from "antd";

const UserQuestions = ({ question }) => {
  return (
    <div className="card mb-3" key={question.questionId}>
      <div className="row">
        <div className="col-md-1 my-auto">
          <div className="bg-light text-dark py-3 text-center">
            {question && question.score}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body py-2">
            <Link
              to={`/question/${question.questionId}`}
              className="mb-0 fw-bold"
              style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
            >
              {question && question.title}
            </Link>
          </div>
          <Divider className="mb-0 mt-0" />
          <CardFooter post={question} />
        </div>
        <div className="col-md-3">
          <div className="bg-light text-dark p-3 m-3 text-center">
            <small>
              <strong className="text-muted">Posted On: </strong>
              {convertDate(
                question.createdDttm !== null
                  ? question.createdDttm
                  : question.updateddDttm
              )}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      </div>
    </div>
  );
};

export default UserQuestions;
