import React, { useState } from "react";

function ShowLessShowMore({ description, displayHtml }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      {displayHtml ? (
        <>
          {showMore ? (
            <div
              className="post__description mt-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <div
              className="post__description mt-2"
              dangerouslySetInnerHTML={{
                __html: `${description.substring(0, 200)}`,
              }}
            />
          )}
          <button
            className="btn btn-sm btn-link px-0 mt-0 button fw-bold"
            onClick={() => setShowMore(!showMore)}
            style={{ color: "var(--clr-light-blue)" }}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </>
      ) : (
        <p className="text-muted mt-3 mb-0">
          {showMore ? description : `${description.substring(0, 200)}`}
          <br />
          <button
            className="btn btn-sm btn-link px-0 mt-0 button"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </p>
      )}
    </>
  );
}

export default ShowLessShowMore;
