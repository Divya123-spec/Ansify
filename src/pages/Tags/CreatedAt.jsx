import React from "react";
import { convertDate } from "../../utils/dateConversion";

const CreatedAt = ({ date }) => {
  return (
    <>
      <div className="bg-light text-dark p-3 mt-3 mb-4 ms-2 me-2">
        Posted On: {convertDate(date)}
      </div>
    </>
  );
};
export default CreatedAt;
