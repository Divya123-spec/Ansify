import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import Post from "../../components/Cards/Post";
import Spinner from "../../components/Spinner";

const QuestionsListTab = ({ tabName }) => {
  const [data, setdata] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postsPerPage = 10;
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userObj = JSON.parse(_USER_DETAILS);
  let createdByUserId = userObj && userObj.userid;

  const handlePagination = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * postsPerPage);
    setMaxIndex(page * postsPerPage);
  };

  let PAYLOAD = {
    size: postsPerPage,
    order: "DESC",
    sortBy: "questionId",
    createdByUserId : createdByUserId
  };
  useEffect(() => {
    if (tabName === "topQuestionTab") {
      PAYLOAD.sortBy = "score";
    }

    PAYLOAD.page = current;

    loadData();
  }, [tabName, current]);

  const loadData = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/question/list/v1`,
        PAYLOAD
      )
      .then((res) => {
        if (res.status === 200) {
          const { total, page, list } = res.data;
          setdata(list);
          setTotalPage(total);
          setCurrent(page);
          setMinIndex(page);
          setMaxIndex(postsPerPage);
        }
      })
      .catch((err) => {
        setError(`${err.code}:  ${err.message}`);
        setdata([]);
      });
    setLoading(false);
  };

  const isBookmarked = () => {
    if (tabName === "topQuestionTab") {
      PAYLOAD.sortBy = "score";
    }

    PAYLOAD.page = current;
    loadData();
  };

  return (
    <>
      {!loading ? (
        <>
          {data.length > 0 ? (
            <>
              <div>
                {data.map((post) => (
                  <div key={post.questionId}>
                    {!post.deleted ? (
                      <Post post={post} isBookmarked={isBookmarked} />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="pb-3 d-flex justify-content-center align-item-center">
                <Pagination
                  responsive
                  pageSize={postsPerPage}
                  current={current}
                  total={totalPage}
                  onChange={handlePagination}
                />
              </div>
            </>
          ) : (
            <h5 className="mt-5 text-muted">{error}</h5>
          )}
        </>
      ) : (
        <Spinner className="mt-5" />
      )}
    </>
  );
};
export default QuestionsListTab;
