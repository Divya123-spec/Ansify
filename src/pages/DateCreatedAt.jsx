import React from "react";
import { convertDate } from "../utils/dateConversion";

const  DateCreatedAt = ({ question }) => {
  return (
    <>
      <div className="bg-light text-dark p-3 mt-3 mb-4 ms-2 me-2">
      {question && question.createdDttm !== null
                ? question && convertDate(question.createdDttm)
                : question && convertDate(question.updateddDttm)}
        {/* Posted On: {convertDate(date)} */}
      </div>
    </>
  );
};
export default DateCreatedAt;