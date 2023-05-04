import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, {
  modules,
  formats
} from "../helper/RichTextEditor/EditorToolbar";
import "../helper/RichTextEditor/TextEditor.css";
import AutoComplete from "../components/AutoComplete/AutoComplete";
import { Button, Input, Typography, Alert } from "antd";
import useScrolltoTop from "../hooks/useScrollToTop";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { success } from "../components/ConfirmationModal";


const { Text } = Typography;

function AskQue() {
  useScrolltoTop();
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [questionInfo, setQuestionInfo] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [tags, setTags] = useState([]);
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userObj = JSON.parse(_USER_DETAILS);
  let createdBy = userObj && userObj.shortid;
  let createdByUserId = userObj && userObj.userid;

  async function loadQuestion(queID) {
    const FETCH_QUESTION_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/get/${queID}/v1`;

    loadQuestionTags(queID);
    axios
      .get(FETCH_QUESTION_URL)
      .then(res => {
        if (res.status === 200) {
          setQuestionInfo(res.data.text);
          setQuestionTitle(res.data.title);
        }
      })
      .catch(error => console.log(error));
  }

  const loadQuestionTags = queID => {
    const response = axios.get(
      `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/tag/list/${queID}/v1`
    );

    response
      .then(res => {
        let tagList = [];
        res.data.map(tag => {
          tagList.push({
            label: `${tag.tagText}`,
            value: tag.tagId
          });
        });
        setTags(tagList);
      })
      .catch(err => console.log(`Question Tag Error: ${err}`));
  };

  useEffect(() => {
    if (questionId !== undefined) loadQuestion(questionId);
    else {
      setQuestionTitle("");
      setTags([]);
      setQuestionInfo("");
    }
  }, [questionId]);

  const onChangeValue = e => {
    setQuestionTitle(e.target.value);
  };

  const ondescription = value => {
    setQuestionInfo(value);
  };

  const onTagSelection = tag => {
    setTags(tag);
  };
  let questionID = "";
  const [isError, setError] = useState(null);

  let tagArr = tags.map(tag => tag.value);

  let strArr = [];
  let numArr = [];

  tagArr.forEach(item => {
    if (item) {
      if (isNaN(item)) strArr.push(item);
      else numArr.push(Number(item));
    }
  });

  const submitQuestionHandler = async () => {
    try {
      if (questionTitle === "") {
        setError("Required, Add a question title.");
        return;
      } else if (tagArr.length === 0) {
        setError("Required, Add a question specific tag.");
        return;
      } else if (tagArr.length < 2) {
        setError("Required, Add at least 2 tags.");
        return;
      } else if (questionInfo.length < 50) {
        setError(
          "Required, Add question description minimum length 50 characters."
        );
        return;
      } else {
        setError("");
      }

      let QUESTION_OBJECT = {
        title: questionTitle,
        text: questionInfo,
        createdBy: createdBy,
        createdByUserId: createdByUserId,
      };

      if (strArr.length !== 0) {
        let lowercaseTags = strArr.map(word => word.toLowerCase());
        QUESTION_OBJECT["newTags"] = lowercaseTags;
      }
      if (numArr.length !== 0) {
        QUESTION_OBJECT["existingTags"] = numArr;
      }

      const api = await axios.post(
        `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/save/v1`,
        QUESTION_OBJECT
      );
      if (api.status === 201) {
        axios
          .put(
            `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/addQuestion/24/v1`
          )
          .then(res => {
            if (res.status === 201) console.log("question is added");
          })
          .catch(err => console.log(err));
      }
      setQuestionTitle("");
      setQuestionInfo("");
      saveNotification(api.data.questionId);
      setTags([]);
      success("Question posted successfully");
      navigate("/");
    
    } catch (error) {
      throw error;
    }
  };
  const saveNotificationUrl = `${process.env.REACT_APP_USER_NOTIFICATION_SERVICE_ENDPOINT}/notificationservice/notification/save/v1`;

  async function saveNotification(questionId) {
    let notificationPayload = {
      notificationTypeId: 1,
      createdBy: createdBy,
      userId: 24,
      questionId: questionId
    };
    
    await axios
      .post(saveNotificationUrl, notificationPayload)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }
  const updateQuestionHandler = async () => {
    try {
      if (questionTitle === "") {
        setError("Required, Add a question title.");
        return;
      } else if (tagArr.length === 0) {
        setError("Required, Add a question specific tag.");
        return;
      } else if (tagArr.length < 2) {
        setError("Required, Add at least 2 tags.");
        return;
      } else if (questionInfo.length < 50) {
        setError(
          "Required, Add question description minimum length 50 characters."
        );
        return;
      } else {
        setError("");
      }

      let QUESTION_OBJECT = {
        questionId: questionId,
        title: questionTitle,
        text: questionInfo,
        createdBy: createdBy,
        createdByUserId: createdByUserId
      };

      if (strArr.length !== 0) {
        let lowercaseTags = strArr.map(word => word.toLowerCase());
        QUESTION_OBJECT["newTags"] = lowercaseTags;
      }
      if (numArr.length !== 0) {
        QUESTION_OBJECT["existingTags"] = numArr;
      }

      console.log(QUESTION_OBJECT);

      axios
        .put(
          `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/update/v1`,
          QUESTION_OBJECT
        )
        .then(res => {
          setQuestionTitle("");
          setQuestionInfo("");
          setTags([]);
          success("Question updated successfully");
          navigate("/");
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <form className="update__forms">
            <h5 className="text-muted main-title">
              {questionId ? "Edit" : "Ask"} a Question
            </h5>
            <div className="form-row mt-3">
              <div className="form-group col-md-12">
                <div className="card">
                  <div className="card-body">
                    <label
                      className="fw-bold"
                      style={{ color: "var(--clr-light-blue)" }}
                    >
                      Title <span className="required"> * </span>{" "}
                      <Description text="Be specific and imagine you're asking question to another person." />
                    </label>
                    <Input
                      type="text"
                      name="title"
                      value={questionTitle}
                      onChange={onChangeValue}
                      placeholder="Title"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-12 mt-3">
                <div className="card">
                  <div className="card-body">
                    <label
                      className="fw-bold"
                      style={{ color: "var(--clr-light-blue)" }}
                    >
                      Tags <span className="required"> * </span>{" "}
                      <Description
                        text="Add relevant tags (at least 2) to describe your question. Start typing
        to see suggestions."
                      />
                    </label>
                    <AutoComplete
                      placeholder={"e.g. (Java, C#)"}
                      setTags={onTagSelection}
                      tags={tags}
                    />
                  </div>
                </div>
              </div>
              <div className="clearfix mt-3"></div>
              <div className="form-group col-md-12 editor">
                <div className="card">
                  <div className="card-body">
                    <label
                      className="fw-bold"
                      style={{ color: "var(--clr-light-blue)" }}
                    >
                      Description <span className="required"> * </span>{" "}
                      <Description text="Include all the information someone would need to answer your question." />
                    </label>
                    <EditorToolbar toolbarId={"t1"} />
                    <ReactQuill
                      theme="snow"
                      value={questionInfo}
                      onChange={ondescription}
                      placeholder={"Write something awesome..."}
                      modules={modules("t1")}
                      formats={formats}
                    />
                  </div>
                </div>
              </div>
              <p className="mb-0 mt-3">
                {isError !== null && <Text type="danger">{isError}</Text>}
              </p>

              <div className="form-group col-sm-12 text-right">
                {questionId ? (
                  <Button
                    type="primary"
                    className="my-3"
                    onClick={updateQuestionHandler}
                  >
                    Update your question
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className="my-3"
                    onClick={submitQuestionHandler}
                  >
                    Post your question
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AskQue;

const Description = ({ text }) => {
  return (
    <p className="text-muted mb-0">
      <small>{text}</small>
    </p>
  );
};
