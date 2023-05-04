import React, { useEffect, useState } from "react";
import {
  List,
  Input,
  Button,
  Divider,
  Collapse,
  Avatar,
  Typography,
} from "antd";
import { MdThumbUp } from "react-icons/md";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import Spinner from "../Spinner";
const { Panel } = Collapse;

const { Text } = Typography;

const Commnets = ({ isAnswer, id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [arrow, setArrow] = useState(false);
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userObj = JSON.parse(_USER_DETAILS);
  let createdBy = userObj && userObj.shortid;

  const URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question`;
  const Title = () => {
    return (
      <div className="mb-0" style={{ color: "var(--clr-light-blue)" }}>
        Comments{" "}
        {arrow ? (
          <AiOutlineUp className="icon" />
        ) : (
          <AiOutlineDown className="icon" />
        )}
      </div>
    );
  };

  const postComment = async () => {
    let COMMENT_OBJECT = {
       createdBy:createdBy
    };
    if (isAnswer) {
      COMMENT_OBJECT["answerId"] = id;
      COMMENT_OBJECT["answerCommentText"] = newComment;
    } else {
      COMMENT_OBJECT["questionId"] = id;
      COMMENT_OBJECT["questionCommentText"] = newComment;
    }
    try {
      if (newComment === "") {
        setError("Required, Please add a comment.");
        return;
      } else setError("");

      axios
        .post(
          `${URL}${isAnswer ? "/answer" : ""}/comment/save/v1`,
          COMMENT_OBJECT
        )
        .then((res) => {
          if (res.status === 201) {
            if (isAnswer) fetchComments(isAnswer);
            else fetchComments();
            setNewComment("");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchComments(isAnswer) {
    setLoading(true);
    await axios
      .get(`${URL}${isAnswer ? "/answer" : ""}/comment/get/${id}/v1`)
      .then((response) => {
        if (response.status === 200) {
          setComments(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (arrow) fetchComments(isAnswer);
  }, [arrow, isAnswer]);

  const handleOnChange = () => setArrow(!arrow);

  return (
    <>
      <Divider className="m-1" />
      <Collapse ghost onChange={handleOnChange}>
        <Panel showArrow={false} header={<Title />} key="1">
          {!loading ? (
            <List
              dataSource={comments}
              renderItem={(item) => (
                <List.Item
                  key={item.questionCommentId}
                  style={{
                    padding: "3px 0px",
                    alignItems: "start",
                    justifyContent: "start",
                    fontFamily: "var(--ff-corpos)",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://mdbcdn.b-cdn.net/img/new/avatars/25.webp" />
                    }
                    title={
                      <a href="/" className="text-bold">
                        {item.userDetails.firstName} {item.userDetails.lastName}
                        <small className="text-success px-3">
                          {item.accepted ? (
                            <span>
                              <MdThumbUp className="icon mb-1" /> Most useful
                            </span>
                          ) : (
                            ""
                          )}
                        </small>
                      </a>
                    }
                    description={
                      isAnswer === "answer"
                        ? item.answerCommentText
                        : item.questionCommentText
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Spinner />
          )}

          <Input.Group compact className="mt-3">
            <Input
              style={{
                width: "calc(100% - 100px)",
              }}
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="primary" ghost className="my-0" onClick={postComment}>
              <Text type="primary">Post</Text>
            </Button>
          </Input.Group>
          <p className="mb-0 mt-2">
            {error !== null && <Text type="danger">{error}</Text>}
          </p>
        </Panel>
      </Collapse>
    </>
  );
};

export default Commnets;
