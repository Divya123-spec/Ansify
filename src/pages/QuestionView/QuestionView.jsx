import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { RiBookmark3Fill } from "react-icons/ri";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import { FcApproval } from "react-icons/fc";
import { FiEdit, FiCheckCircle, FiTrash, FiX } from "react-icons/fi";
import { Button, Popover } from "antd";
import { FaRegEye } from "react-icons/fa";
import { GrMore } from "react-icons/gr";
import Commnets from "../../components/Comments/Commnets";
import useScrolltoTop from "../../hooks/useScrollToTop";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import QuestionTag from "../../components/Cards/QuestionTag";
import UserDetails from "../../components/Cards/UserDetails";
import AnswersList from "./AnswersList";
import UpVoteButton from "../../components/UpVoteButton";
import DownVoteButton from "../../components/DownVoteButon";
import axios from "axios";
import { useLocation } from "react-router-dom";

const QuestionView = () => {
  useScrolltoTop();
  const param = useParams();
  const location = useLocation();
  const questionId = location.pathname.split("/")[2];
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userInfo = JSON.parse(_USER_DETAILS);
  let userId = userInfo && userInfo.userid;
  const [data, setData] = useState();

  const [open, setOpen] = useState(false);

  const params = useParams();

  async function loadQuestion() {
    const FETCH_QUESTION_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/get/${param.id}/v1`;

    axios
      .get(FETCH_QUESTION_URL)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    loadQuestion(params.id);
  }, [params]);

  const handleBookmark = async () => {
    const bookmarkURL = `${
      process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT
    }/questionservice/question/questionStar/${userId}/${questionId}/${!data.active}/v1`;
    await axios
      .put(bookmarkURL)
      .then(res => {
        if (res.status === 200) setTimeout(() => loadQuestion(), 10);
      })
      .catch(err => console.log(err));
  };
  const VOTE_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question`;
  const handleUpVotes = qId => {
    axios
      .put(`${VOTE_URL}/upVote/${qId}/v1`)
      .then(res => {
        if (res.status === 200) loadQuestion();
      })
      .catch(err => console.log(err));
  };
  const handleDownVotes = qId => {
    axios
      .put(`${VOTE_URL}/downVote/${qId}/v1`)
      .then(res => {
        if (res.status === 200) loadQuestion();
      })
      .catch(err => console.log(err));
  };

  const handleOpenChange = newOpen => {
    setOpen(newOpen);
  };

  // if (loading) return <Spinner />;

  // if (error) return <Spinner />;

  const { userDetails } = data || [];

  return (
    <div className="container">
      <Link to="/" className="text-muted">
        <BsArrowLeftShort className="icon" /> Back
      </Link>
      {data ? (
        <div className="card mt-3">
          <div className="card-body">
            <div className="post__list">
              <div className="d-flex gap-2 mb-2">
                <UserDetails
                  firstName={userDetails && userDetails.firstName}
                  lastName={userDetails && userDetails.lastName}
                  createdDttm={
                    data.createdDttm !== null
                      ? data.createdDttm
                      : data.updateddDttm
                  }
                  edited={data.updateddDttm}
                />
              </div>
              <div key={data.title}>
                <div className="d-flex justify-content-between">
                  <p
                    style={{
                      fontSize: "17px",
                      color: "var(--clr-light-blue)",
                      fontWeight: "600"
                    }}
                  >
                    {data.title}
                  </p>

                  <div className="d-flex gap-2 justify-content-end align-items-center">
                    <CopyToClipboard text={data.title} />
                    <Button
                      className="btn btn-sm"
                      title="Save"
                      onClick={handleBookmark}
                    >
                      <RiBookmark3Fill
                        style={{
                          fontSize: "18px",
                          color: data.active
                            ? "var(--clr-dark-blue)"
                            : "rgb(179,178,178)"
                        }}
                      />
                    </Button>
                    <Popover
                      content={<PopoverButtons />}
                      placement="bottomRight"
                      title=""
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button className="btn btn-sm" title="More Options">
                        <GrMore className="icon" />
                      </Button>
                    </Popover>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-1">
                    <div className="align-baseline text-center">
                      <UpVoteButton
                        id={data.questionId}
                        handleUpVotes={handleUpVotes}
                        text="Upvote"
                      />

                      <p
                        className="mb-0 fw-bold"
                        style={{ color: "var(--clr-light-blue)" }}
                      >
                        {data.upVotes - data.downVotes}
                      </p>

                      <DownVoteButton
                        id={data.questionId}
                        handleDownVotes={handleDownVotes}
                        text="Downvote"
                      />

                      <div className="my-4">
                        <FaRegEye
                          className="text-muted"
                          style={{ fontSize: "20px" }}
                        />
                        <p className="mb-0">{data.totalViews}</p>
                      </div>
                      {/* <div className="my-4">
                        <FcApproval style={{ fontSize: "20px" }} />
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div
                      className="post__description"
                      dangerouslySetInnerHTML={{ __html: data.text }}
                    />

                    <QuestionTag id={data && data.questionId} />
                    <Commnets answer={""} id={data.questionId} />
                  </div>
                </div>

                {/* <Link
                to={`/Edit/${item.id}`}
                className="btn btn-outline-primary btn-sm"
              >
                {" "}
                Edit{" "}
              </Link> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <AnswersList userData={data}/>
    </div>
  );
};

export default QuestionView;

const PopoverButtons = () => {
  return (
    <>
      <ul className="list-group list-group-flush ">
        <li className="list-group-item">
          <Button type="text" className="btn-sm d-flex gap-3">
            <FiEdit
              className="icon mt-1"
              style={{ color: "var(--clr-light-blue)" }}
            />
            <span>Edit Question</span>
          </Button>
        </li>
        <li className="list-group-item">
          <Button type="text" className="btn-sm d-flex gap-3">
            <FiCheckCircle
              className="icon mt-1"
              style={{ color: "var(--clr-light-blue)" }}
            />
            <span>Mark as Solved</span>
          </Button>
        </li>
        <li className="list-group-item">
          <Button type="text" className="btn-sm text-danger d-flex gap-3">
            <FiTrash className="icon mt-1" />
            <span>Delete Question</span>
          </Button>
        </li>
        <li className="list-group-item">
          <Button type="text" className="btn-sm text-danger d-flex gap-3">
            <FiX className="icon mt-1" />
            <span>Close Question</span>
          </Button>
        </li>
      </ul>
    </>
  );
};
