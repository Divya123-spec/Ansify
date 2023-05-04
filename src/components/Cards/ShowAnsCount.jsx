import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowAnsCount = ({ queID }) => {
  const [ansCount, setAnsCount] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const response = axios.get(
        `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/answer/list/${queID}/v1`
      );

      response
        .then((res) => setAnsCount(res.data.length))
        .catch((err) => console.log(`Show Answer Count Error: ${err}`));
    };

    loadData();
  }, [queID]);
  return (
    <>
      <p className="mb-0">
        <span
          className="badge p-2 text-dark border rounded-circle"
          style={{ background: "hsl(0, 0%, 96.5%)" }}
        >
          {ansCount < 10 ? `0${ansCount}` : ansCount}
        </span>{" "}
        <small> Answered</small>
      </p>
    </>
  );
};
export default ShowAnsCount;
