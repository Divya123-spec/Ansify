import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { convertDate } from "../utils/dateConversion";
import { BiLike } from "react-icons/bi";
import { TbBulb } from "react-icons/tb";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineDelete } from "react-icons/md";
import { DiAngularSimple } from "react-icons/di";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import axios from "axios";
import UserDetails from './UserDetails';

const NotificationCard = ({ post }) => {

   const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userInfo = JSON.parse(_USER_DETAILS);
  let shortId = userInfo && userInfo.shortid;




const renderNames =() =>{
if(shortId == post.createdBy){
   return <span>You have posted Question </span> 
}else {
return <span> <UserDetails shortId ={post.createdBy}/> posted Question </span>
}
}
  const renderIcons = () => {
    if (post.notificationTypeId === 13) {
      return <BiLike color="var(--clr-light-blue)" />;
    } else if (post.notificationTypeId === 7) {
      return <TbBulb color="var(--clr-light-blue)" />;
    } else if (post.notificationTypeId === 12) {
      return <MdOutlineDelete color="var(--clr-light-blue)" />;
    } else if (post.notificationTypeId === 3) {
      return <TiArrowSortedUp color="var(--clr-light-blue)" />;
    } else if (post.notificationTypeId === 4) {
      return <TiArrowSortedDown color="var(--clr-light-blue)" />;
    } else if (post.notificationTypeId === 2) {
      return <DiAngularSimple color="var(--clr-light-blue)" />;
    } else if (post.notificationTypeId === 1) {
      return <BsFillQuestionSquareFill color="var(--clr-light-blue)" />;
    }
  };

  const renderText = () => {
    if (post.notificationTypeId === 2) {
      return (
        <>
          <span> <UserDetails shortId ={post.createdBy}/></span>
          <span>has answered a question </span>
          <Link
            className="card-title"
            to={`/question/${post.questionId}`}
            style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
          >
            {post.title}
          </Link>
          <span> posted by you</span>
        </>
      );
    } else if (post.notificationTypeId === 1) {
      return (
        <>
                   {renderNames()}
          <Link
           className="card-title"
           to={`/question/${post.questionId}`}
           style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
          >{post.title}</Link>
        </>
      );
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ width: "65rem" }}>
        <div className="gap-2 d-flex">
          <div className="bg-light text-dark pb-0 pt-2 pe-2 ps-1 ms-1 mt-1 mb-2 ms-2">
            {renderIcons()}
          </div>
          <div className="card-body pt-1 pb-1">
            {renderText()}
            <div className="gap-4 d-flex">
              <p className="mb-0">
                <small>
                  {convertDate(
                    post.createdDttm !== null ? post.createdDttm : ""
                  )}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
