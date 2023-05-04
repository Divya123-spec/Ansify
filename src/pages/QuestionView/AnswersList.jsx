import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdThumbUp } from "react-icons/md";
import Commnets from "../../components/Comments/Commnets";
import { useParams } from "react-router-dom";
import { Alert, Divider, Tooltip } from "antd";
import UserDetails from "../../components/Cards/UserDetails";
import axios from "axios";
import ReactQuill from "react-quill";
import EditorToolbar, {
  formats,
  modules
} from "../../helper/RichTextEditor/EditorToolbar";
import { Button } from "antd";
import UpVoteButton from "../../components/UpVoteButton";
import DownVoteButton from "../../components/DownVoteButon";

const TooltipColor = "var(--clr-dark-blue)";

const AnswersList = ({ userData }) => {
  const params = useParams();

  const [ansData, setAnsData] = useState([]);
  const [answerInfo, setAnswerInfo] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onDescription = value => {
    setAnswerInfo(value);
  };

  const [isError, setError] = useState(null);
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userObj = JSON.parse(_USER_DETAILS);
  let createdBy = userObj && userObj.shortid;
  let createdByUserId = userObj && userObj.userid;


  const saveNotificationUrl = `${process.env.REACT_APP_USER_NOTIFICATION_SERVICE_ENDPOINT}/notificationservice/notification/save/v1`;
  let notificationPayload = {
    notificationTypeId: 2,
    createdBy:createdBy,
    notificationCreatedByUserId: createdByUserId,
    userId: userData && userData.createdByUserId,
    questionId :  userData && userData.questionId
  };
  async function saveNotification() {
    await axios
      .post(saveNotificationUrl, notificationPayload)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  const VOTE_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/answer`;
  const handleUpVotes = answerId => {
    axios
      .put(`${VOTE_URL}/upVote/${answerId}/v1`)
      .then(res => {
        if (res.status === 200) loadAnswers(params.id);
      })
      .catch(err => console.log(err));
  };
  const handleDownVotes = answerId => {
    axios
      .put(`${VOTE_URL}/downVote/${answerId}/v1`)
      .then(res => {
        if (res.status === 200) loadAnswers(params.id);
      })
      .catch(err => console.log(err));
  };

  const submitAnswerHandler = async event => {
    try {
      event.preventDefault();
      event.persist();

      if (answerInfo.length < 50) {
        setError("Required, Add description minimum length 50 characters");
        return;
      } else {
        setError(null);
      }

      const QUESTION_OBJECT = {
        questionId: params.id,
        answerText: answerInfo,
        createdByUserId: 23,
        createdBy: "dudivya",
      };

      axios
        .post(
          `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/answer/save/v1`,
          QUESTION_OBJECT
        )
        .then(res => {
          if (res.status === 201) {
            // history.push("/");
            setAnswerInfo("");
            loadAnswers(params.id);
            saveNotification();
          }
        });
    } catch (error) {
      throw error;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  async function loadAnswers(questionId) {
    const FETCH_ANSWERS = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/answer/list/${questionId}/v1`;
    axios
      .get(FETCH_ANSWERS)
      .then(res => setAnsData(res.data))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    loadAnswers(params.id);
  }, [params]);

  return (
    <>
      <div className="card my-4 px-2 py-2">
        <div className="card-body">
          <p className="lead" style={{ color: "var(--clr-light-blue)" }}>
            Answers ({ansData.length})
          </p>
          {ansData.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-sm-1">
                <div className="align-baseline text-center">
                  <UpVoteButton
                    id={item.answerId}
                    handleUpVotes={handleUpVotes}
                    text="Upvote"
                  />

                  <p
                    className="mb-0 fw-bold"
                    style={{ color: "var(--clr-light-blue)" }}
                  >
                    {item.answerUpVotes - item.answerDownVotes}
                  </p>

                  <DownVoteButton
                    id={item.answerId}
                    handleDownVotes={handleDownVotes}
                    text="Downvote"
                  />

                  <div className="my-4">
                    <Tooltip
                      placement="right"
                      color={TooltipColor}
                      title={
                        item.answerAccepted
                          ? "The question owner accepted this as the best answer"
                          : null
                      }
                    >
                      <FaCheckCircle
                        style={{
                          fontSize: "20px",
                          color: item.answerAccepted
                            ? "var(--clr-light-blue)"
                            : "#6c757d"
                        }}
                      />
                    </Tooltip>
                  </div>
                  <div className="my-4">
                    <Tooltip
                      placement="right"
                      color={TooltipColor}
                      title={
                        item.answerAccepted ? "This answer is useful" : null
                      }
                    >
                      <MdThumbUp
                        className={
                          item.mostUsefull ? "text-success" : "text-muted"
                        }
                        style={{ fontSize: "20px" }}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-sm-11">
                <div className="d-flex gap-2">
                  <UserDetails
                    firstName={item.userDetails.firstName}
                    lastName={item.userDetails.lastName}
                    createdDttm={item.createddateTime}
                  />
                </div>

                <div
                  className="post__description mt-2"
                  dangerouslySetInnerHTML={{ __html: item.answerText }}
                />
                <Commnets isAnswer={"answer"} id={item.answerId} />
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </div>
      <div className="card my-4 px-2 py-2">
        <div className="card-body">
          <form className="update__forms">
            <p className="lead" style={{ color: "var(--clr-light-blue)" }}>
              Write an Answer
            </p>
            <div className="form-row">
              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold">
                  Description <span className="required">*</span>
                </label>
                <EditorToolbar toolbarId={"t1"} />
                <ReactQuill
                  theme="snow"
                  value={answerInfo}
                  onChange={onDescription}
                  placeholder={"Write your answer..."}
                  modules={modules("t1")}
                  formats={formats}
                />
              </div>
            </div>
            {isError !== null && <div className="text-danger"> {isError} </div>}
            {showAlert && (
              <Alert
                className="mt-3"
                message="Answer is saved successfully!"
                type="success"
              />
            )}
            <div className="form-group col-sm-12 text-right">
              <Button
                type="primary"
                className="mt-3"
                onClick={submitAnswerHandler}
              >
                Post your Answer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AnswersList;
