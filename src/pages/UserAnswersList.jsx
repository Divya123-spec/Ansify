import React from "react";
import { FiCheckSquare } from "react-icons/fi";
import { convertDate } from "../utils/dateConversion";
import { Link } from "react-router-dom";
import { Divider } from "antd";

const UserAnswerList = ({ answers }) => {
  return (
    // <div className="container">
    //   <div className="card">
    //     <div className="gap-4 d-flex">
    //       <div className="bg-light text-dark p-3 mt-3 mb-4 ms-2 me-2">
    //         {answers && answers.score}
    //       </div>
    //       <div className="card-body">
    //         <Link
    //           to={`/question/${answers.questionId}`}
    //           className="card-title"
    //           style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
    //         >
    //           {answers && answers.questionTitle}
    //         </Link>
    //         <Divider />
    //         <div className="gap-4 d-flex">
    //           {answers && answers.answerAccepted ? (
    //             <p className="mb-0">
    //               <FaCheckCircle
    //                 style={{
    //                   fontSize: "18px",
    //                   color: "var(--clr-light-blue)",
    //                 }}
    //               />
    //               Accepted
    //             </p>
    //           ) : (
    //             ""
    //           )}
    //           <p className="mb-0">
    //             <FiCheckSquare />
    //             <small> Votes</small>{" "}
    //             <small className="text-mited">
    //               {answers && answers.answerUpVotes}
    //             </small>
    //           </p>
    //         </div>
    //       </div>
    //       <div className="bg-light text-dark p-3 m-3 text-center">
    //         <strong className="text-muted">Posted On: </strong>
    //         {convertDate(
    //           answers.questionCreatedDttm !== null
    //             ? answers.questionCreatedDttm
    //             : answers.questionUpdateddDttm
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <br></br>
    // </div>
    <div className="card mb-3" key={answers.questionId}>
      <div className="row">
        <div className="col-md-1 my-auto">
          <div className="bg-light text-dark py-3 text-center">
            {answers && answers.score}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body py-2">
            <Link
              to={`/question/${answers.questionId}`}
              className="mb-0 fw-bold"
              style={{ fontSize: "16px", color: "var(--clr-light-blue)" }}
            >
              {answers && answers.questionTitle}
            </Link>
          </div>
          <Divider className="mb-0 mt-0" />
          <CardFooter post={answers} />
        </div>
        <div className="col-md-3">
          <div className="bg-light text-dark p-3 m-3 text-center">
            <small>
              <strong className="text-muted">Posted On: </strong>
              {convertDate(
                answers.questionCreatedDttm !== null
                  ? answers.questionCreatedDttm
                  : answers.questionUpdateddDttm
              )}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardFooter = ({ post }) => {
  const { answerUpVotes } = post;
  return (
    <div className="p-2 mx-2 d-flex justify-content-between">
      <div className="d-flex gap-4">
        <p className="mb-0">
          <FiCheckSquare className="icon text-muted" />
          <small> Votes</small>{" "}
          <small className="text-muted">{answerUpVotes}</small>
        </p>
      </div>
    </div>
  );
};

export default UserAnswerList;
