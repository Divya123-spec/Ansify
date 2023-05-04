import React, { useState, useEffect, useInsertionEffect } from "react";
import { Link } from "react-router-dom";
import NotificationCard from "./NotificationCard";
import axios from "axios";
import {
  Dropdown,
  Space,
  Radio,
  Divider,
  Select,
  Button,
  Checkbox,
  Row,
  Col
} from "antd";

function UserNotifications() {
  const [notificationList, setNotificationList] = useState();
  const [data, setData] = useState([]);
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userInfo = JSON.parse(_USER_DETAILS);
  let userId = userInfo && userInfo.userid;

  const NOTIFICATION_LIST_URL = `${process.env.REACT_APP_USER_NOTIFICATION_SERVICE_ENDPOINT}/notificationservice/notification/list/v1`;

  const NOTIFICATION_PAYLOAD = {
    page: 1,
    size: 10,
    order: "ASC",
    sortBy: "createdDateTime",
    userId: 24
  };

  const getNotificationsList = async () => {
    await axios
      .post(NOTIFICATION_LIST_URL, NOTIFICATION_PAYLOAD)
      .then(res => {
        if (res.status === 200) {
          setNotificationList(res.data.list);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNotificationsList();
  }, []);

  useEffect(() => {
    if (notificationList) {
      let localData = [];
      let cloned = [];
      const ff = notificationList.map(val => {
        const FETCH_QUESTION_URL = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/get/${val.questionId}/v1`;
        cloned = [...localData];
        localData.push(axios.get(FETCH_QUESTION_URL));
      });
      Promise.all(localData).then(allResults => {
        setData(allResults);
      });
    }
  }, [notificationList]);


  const mergedArray =
    notificationList &&
    notificationList.map(
      (
        {
          questionId,
          notificationId,
          notificationTypeId,
          notificationCreatedByUserId,
          createdDttm,
          updatedDttm,
          tagId,
          notificationTypeDescription,
          answerId,
          questionCommentId,
          answerCommmentId,
          createdBy
        },
        idx
      ) => ({
        questionId,
        notificationId,
        notificationTypeId,
        notificationCreatedByUserId,
        createdDttm,
        updatedDttm,
        tagId,
        notificationTypeDescription,
        answerId,
        questionCommentId,
        answerCommmentId,
        createdBy,
        title: data && data[idx] && data[idx].data.title,
        text: data && data[idx] && data[idx].data.text,
        // createdBy: data && data[idx] && data[idx].data.createdBy,
        firstName: data && data[idx] && data[idx].data.userDetails.firstName,
        lastName: data && data[idx] && data[idx].data.userDetails.lastName,
        userId: data && data[idx] && data[idx].data.userDetails.userId
      
      })
    );


  const [checkboxObj, setCheckoxObj] = useState([
    {
      label: "Questions",
      checked: false,
      value: "questions"
    },
    {
      label: "Answers",
      checked: false,
      value: "Answers"
    },
    {
      label: "Comments",
      checked: false,
      value: "comments"
    },
    {
      label: "Votes",
      checked: false,
      value: "votes"
    },
    {
      label: "Badge and Points",
      checked: false,
      value: "badgesPoints"
    }
  ]);
  const onChangeCheckbox = (value, i) => {
    let tem = value;
    tem.checked = !value.checked;
    let cloned = [...checkboxObj];
    cloned[i] = tem;
    setCheckoxObj(cloned);
  };

  const SORT_OPTIONS = [
    {
      label: (
        <Checkbox.Group>
          {checkboxObj.map((checkBoxName, i) => {
            return (
              <div className="row">
                <div className="col-4">
                  <p>
                    <Checkbox
                      value={checkBoxName.value}
                      onClick={() => {
                        onChangeCheckbox(checkBoxName, i);
                      }}
                    >
                      {checkBoxName.label}
                    </Checkbox>
                  </p>
                  <Divider className="mb-2 mt-2" />
                </div>
              </div>
            );
          })}
        </Checkbox.Group>
      ),
      key: "1"
    }
  ];
  return (
    <div>
      <p
        className="lead fw-bold ms-4 d-flex mb-0"
        style={{ color: "var(--clr-light-blue)" }}
      >
        {" "}
        Notifications{" "}
        <p
          className="bg-light text-dark bg-light text-dark p-1 ms-2 me-2 fw-bold"
          style={{ fontSize: "12px" }}
        >
          {" "}
          5 New
        </p>
      </p>

      <div className="row mb-1">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="ms-4 d-flex">All Notifications</div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-0 ">
          <Select
            className="float-end"
            placeholder="Filter by"
            style={{
              width: 160
            }}
            options={SORT_OPTIONS}
          />
        </div>
        {checkboxObj.map(value => {
          return value.checked ? (
            <span
              className="bg-light ms-4 pb-0 pt-2 pe-2 ps-1"
              style={{ width: "5rem", color: "blue", fontSize: "12px" }}
            >
              {value.label}
            </span>
          ) : null;
        })}
      </div>

      {mergedArray &&
        mergedArray.map(post => (
          <div>
            <NotificationCard post={post} />

            <br></br>
          </div>
        ))}
    </div>
  );
}

export default UserNotifications;
