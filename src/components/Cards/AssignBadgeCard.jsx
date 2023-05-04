import React, { useEffect, useState } from "react";
import SolverImg from "./../../assets/images/solver.png";
import ExpertImg from "./../../assets/images/expert.png";
import ChampionImg from "./../../assets/images/champion.png";
import UserDetails from "./UserDetails";
import { Button, Card } from "antd";
import axios from "axios";
import { success } from "../ConfirmationModal";

const AssignBadgeCard = ({ userDetails }) => {
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userObj = JSON.parse(_USER_DETAILS);
  let createdBy = userObj && userObj.shortid;
  let createdByUserId = userObj && userObj.userid;

  const [badgeList, setBadgeList] = useState([]);
  const [userRole, setUserRole] = useState("");

  const SAVE_BADGE = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/badge/assign/v1`;
  const BADGE_LIST_URL = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/badge/listBadges/v1`;

  const FETCH_USER_ROLE_URL = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/role/assignedList/${createdByUserId}/v1`;

  async function loadBadgeList() {
    await axios
      .get(BADGE_LIST_URL)
      .then((res) => {
        setBadgeList(res.data);
        loadUserRole();
      })
      .catch((err) => console.log(err));
  }

  async function loadUserRole() {
    await axios
      .get(FETCH_USER_ROLE_URL)
      .then((res) =>
        res.data.map((role) => {
          if (role.roleName === "admin" || role.roleName === "chief") {
            setUserRole("SUPER_USER");
          } else {
            setUserRole("GUEST_USER");
          }
        })
      )
      .catch((err) => console.log(err));
  }

  if (userRole === "SUPER_USER") {
    console.log(badgeList);
  } else if (userRole === "GUEST_USER") {
    console.log(badgeList);
  }

  useEffect(() => {
    loadBadgeList();
  }, []);

  const _guestUserObject = badgeList.find(
    (x) => x.badgeName === "Problem_Solver"
  );

  const assingBadgeRequest = async (badge) => {
    const PAYLOAD = {
      userId: userDetails.userId,
      badgeId: badge.badgeId,
      assignedById: createdByUserId,
      assignedBy: createdBy,
    };

    await axios
      .post(SAVE_BADGE, PAYLOAD)
      .then((res) => {
        if (res.status === 201) {
          success(
            <span>
              You have successfully assigned a{" "}
              <strong>
                {badge.badgeName === "Problem_Solver"
                  ? "Problem Solver"
                  : badge.badgeName}
              </strong>{" "}
              badge.
            </span>
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card
        title={
          <div className="d-flex gap-2">
            <UserDetails
              firstName={userDetails.firstName}
              lastName={userDetails.lastName}
            />
          </div>
        }
        style={{ width: 300 }}
      >
        <p className="fw-bold pt-0">
          <small>Assign a badge</small>
        </p>
        <div className="row">
          {userRole === "SUPER_USER" ? (
            <>
              {badgeList.map((badge) => (
                <div key={badge.badgeId} className="col-md-4 px-0">
                  <div className="text-center">
                    <p>
                      <img
                        src={
                          badge.badgeName === "Problem_Solver"
                            ? SolverImg
                            : badge.badgeName === "Champion"
                            ? ChampionImg
                            : badge.badgeName === "Expert"
                            ? ExpertImg
                            : null
                        }
                        alt={
                          badge.badgeName === "Problem_Solver"
                            ? "SolverImg"
                            : badge.badgeName === "Champion"
                            ? "ChampionImg"
                            : badge.badgeName === "Expert"
                            ? "ExpertImg"
                            : "icon"
                        }
                      />
                    </p>
                    <div
                      className="fw-bold"
                      style={{
                        fontSize: "10px",
                        color: "var(--clr-light-blue)",
                      }}
                    >
                      {badge.badgeName === "Problem_Solver"
                        ? "Problem Solver"
                        : badge.badgeName}
                    </div>
                    <Button
                      className="mt-2"
                      size="small"
                      onClick={() => assingBadgeRequest(badge)}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center">
              <p>
                <img src={SolverImg} alt="badge icon" />
              </p>
              <div
                className="fw-bold"
                style={{
                  fontSize: "10px",
                  color: "var(--clr-light-blue)",
                }}
              >
                Problem Solver
              </div>
              <Button
                className="mt-2"
                size="small"
                onClick={() => assingBadgeRequest(_guestUserObject)}
              >
                Assign
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default AssignBadgeCard;
