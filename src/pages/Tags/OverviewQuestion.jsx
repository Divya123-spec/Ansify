import React from "react";
import { FiCheckSquare } from "react-icons/fi";
import CreatedAt from "./CreatedAt";
import ShowAnsCount from "../../components/Cards/ShowAnsCount";
import { Link } from "react-router-dom";

const OverviewQuestion = ({ post }) => {
  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="gap-4 d-flex">
            <div className="bg-light text-dark p-3 mt-3 mb-4 ms-2 me-2">{post && post.score}</div>
            <div className="card-body">
              <Link
              to={`/question/${post.questionId}`}
              className="card-title text-decoration-underline"
              style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
            >
              {post && post.title}
            </Link>

              <div className="gap-4 d-flex">
                <p className="mb-0">
                <ShowAnsCount queID={post && post.questionId} />
                </p>
                <p className="mb-0">
                  <FiCheckSquare />
                  <small> Votes</small>{" "}
                  <small className="text-mited">{post && post.upVotes}</small>
                </p>
              </div>
            </div>
            <CreatedAt date={ post.createdDttm} />
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default OverviewQuestion;
