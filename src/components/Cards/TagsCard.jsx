import React from "react";
import { TbMessages } from "react-icons/tb";
import { Link } from "react-router-dom";
import ShowLessShowMore from "../ShowLessShowMore/ShowLessShowMore";

const TagsCard = ({ post }) => {
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <div className="card mt-4 tagsCard">
      <div className="card-body">
        <Link
          to={`/TagsDescription/${post.tagId}`}
          className="card-title lead fw-bold"
          style={{ color: "var(--clr-light-blue)" }}
        >
          {post.tagText ?capitalizeWords(post.tagText): ''}
     
        </Link>
        <div>
          <ShowLessShowMore
            displayHtml
            description={post.description}
          ></ShowLessShowMore>
        </div>
      </div>
      <CardFooter questionCount={post.questionCount} />
    </div>
  );
};

export default TagsCard;

const CardFooter = ({ questionCount }) => {
  return (
    <div className="card-footer">
      <span>
        <TbMessages className="icon" />
      </span>{" "}
      <small>{questionCount} Questions</small>
    </div>
  );
};
