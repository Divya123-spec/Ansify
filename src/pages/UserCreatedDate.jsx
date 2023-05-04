import React from "react";
import { convertDate } from "../utils/dateConversion";

const UserCreatedDate = ({ date }) => {
  return (
    <>
      <div className="text-dark idd1">
        Members Since {convertDate(date)}
      </div>
    </>
  );
};
export default UserCreatedDate;