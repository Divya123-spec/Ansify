import React, { useEffect, useState } from "react";
import UserCard from "../components/Cards/UserCard";
import { RiShieldUserLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import FilterInput from "../components/FilterInput/FilterInput";
import { Radio, Pagination, Select, Divider } from "antd";
import useScrolltoTop from "../hooks/useScrollToTop";
import axios from "axios";

const User = () => {
  useScrolltoTop();
  const [checked, setChecked] = useState("byContributors");
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const postsPerPage = 8;

  const handlePagination = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * postsPerPage);
    setMaxIndex(page * postsPerPage);
  };

  const FETCH_USERS_URL = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/list/v1`;
  const PAYLOAD = {
    page: current,
    size: postsPerPage,
    sortBy: "points",
    firstName: "",
  };

  useEffect(() => {
    if (checked === "byContributors") {
      PAYLOAD["order"] = "DESC";
      PAYLOAD["sortBy"] = "points";
    } else if (checked === "byName") {
      PAYLOAD["order"] = "ASC";
      PAYLOAD["sortBy"] = "firstname";
    }

    PAYLOAD.firstName = searchText.toString();

    const loadData = async () => {
      await axios
        .post(FETCH_USERS_URL, PAYLOAD)
        .then((res) => {
          if (res.status === 200) {
            setTotal(res.data[0].total);

            setUsers([]);
            setTotal(res.data[0].totalusercount);
            setUsers(res.data);
          }
        })
        .catch((err) => {
          // setError(`${err.code}:  ${err.message}`);
        });
    };

    loadData();
  }, [current, checked, searchText]);

  const handleOnChange = (e) => {
    setChecked(e.target.value);
  };

  const SORT_OPTIONS = [
    {
      label: (
        <Radio.Group onChange={handleOnChange} defaultValue={checked}>
          <div>
            <Radio value={"byContributors"}>Top Contributors</Radio>
          </div>
          <Divider className="mb-2 mt-2" />
          <div>
            <Radio value={"byName"}>Name (A-Z)</Radio>
          </div>
        </Radio.Group>
      ),
      key: "1",
    },
  ];

  const getText = (text) => {
    setSearchText(text);
  };
  return (
    <>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <FilterInput getFilterText={getText} />
              </div>
              <div className="col-md-6">
                <Link
                  to="/leaderboard"
                  className="btn btn-sm mb-2 btn-lg-block"
                >
                  <RiShieldUserLine className="icon mb-1" /> Leaderboard
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-0 ">
            <Select
              className="float-end"
              placeholder="Sort by"
              style={{
                width: 160,
              }}
              options={SORT_OPTIONS}
            />
          </div>
        </div>

        <div className="row">
          {users &&
            users.map((user) => (
              <div className="col-md-3" key={user.userid}>
                <UserCard user={user} tab="users" />
              </div>
            ))}
        </div>
        <div className="pb-0 mt-2 d-flex justify-content-center align-item-center">
          <Pagination
            responsive
            pageSize={postsPerPage}
            current={current}
            total={total}
            onChange={handlePagination}
          />
        </div>
      </div>
    </>
  );
};

export default User;
