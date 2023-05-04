import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionTag = ({ id }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const response = axios.get(
        `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/tag/list/${id}/v1`
      );

      response
        .then((res) => setTags(res.data))
        .catch((err) => console.log(`Question Tag Error: ${err}`));
    };
    if (id !== undefined) {
      loadData();
    }
  }, [id]);

  return (
    <div>
      {tags.map((tag, index) => (
        <span key={index} className="tag uppercase">
          {tag.tagText}
        </span>
      ))}
    </div>
  );
};
export default QuestionTag;
