import React from "react";
import { convertDate } from "../../utils/dateConversion";
import Avatar from "../Avatar/Avatar";
import UserImg from "./../../assets/images/user.png";

const UserDetails = ({
  firstName,
  lastName,
  createdDttm,
  edited,
  children,
}) => {
  return (
    <>
      <Avatar
        avatarImg={UserImg}
        className="rounded-circle mt-2 img-thumbnail"
        style={{ width: "48px", height: "48px" }}
      ></Avatar>
      <div className="mt-2" style={{ fontFamily: "var(--ff-corpos)" }}>
        <p className="mb-0 pb-0 fw-bold">{`${firstName} ${lastName}`}</p>
        <small className="text-muted m-0">
          {edited ? "edited" : ""} {createdDttm && convertDate(createdDttm)}
        </small>
        {children}
      </div>
    </>
  );
};

export default UserDetails;
