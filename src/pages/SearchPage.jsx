import React from "react";
import { FiCheckSquare, FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { RiBookmark3Fill } from "react-icons/ri";
import useToggle from "../hooks/useToggle";
import { Link } from "react-router-dom";
import { Divider, Button, Popover } from "antd";
import { convertDate } from "../utils/dateConversion";
import axios from "axios";
import ShowAnsCount from "../components/Cards/ShowAnsCount";
import CreatedAt from "./Tags/CreatedAt";

const SearchPage = ({ post }) => {
  const [isOpen, toggler] = useToggle(false);

  const { createdDttm, updateddDttm } = post;
  const handleViewCount = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/addView/${id}/v1`
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="card mb-3" key={post.questionId}>
      <div className="row">
        <div className="col-md-9">
          <div className="card-body py-2">
            <Link
              to={`/question/${post.questionId}`}
              className="mb-0 fw-bold"
              style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
              onClick={() => handleViewCount(post.questionId)}
            >
              {post && post.title}
            </Link>
          </div>
          <Divider className="mb-0 mt-0" />
          <CardFooter post={post} />
        </div>
        <div className="col-md-3">
          <div className="bg-light text-dark p-3 m-3 text-center">
            <strong className="text-muted">Posted On: </strong>
            {convertDate(createdDttm !== null ? createdDttm : updateddDttm)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

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
    </div>
  );
};
