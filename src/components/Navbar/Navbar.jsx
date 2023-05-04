import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoNotificationsSharp } from "react-icons/io5";
import Logo from  "./../../assets/images/logo.png";
import UserImg from  "./../../assets/images/user.png";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import SearchBar from "../SearchInput/SearchInput";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, toggler] = useState(true);

  const onClickProfile = () => navigate("/profile-view");
  const onClickNotification =() => navigate("/notifications");

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="top_section">
            <div onClick={() => toggler(!isOpen)} className="bars">
              {!isOpen ? (
                <div>
                  <AiOutlineClose className="icon" />
                </div>
              ) : (
                <div>
                  <AiOutlineMenu className="icon" />
                </div>
              )}
            </div>
          </div>
          <a className="navbar-brand" href="/">
            <h5 className="mb-0 mt-1  main-title"  style={{ marginRight :'35rem' }}>
            <img src={Logo} alt="Expert" />{" "}
            </h5>
          </a>
          <button
            className="btn navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <HiMenuAlt3 className="icon" />
            </span>
          </button>
          <div
            className="collapse navbar-collapse float-center"
            id="navbarSupportedContent"
          >
            <div className="me-auto">{/* nav left links */}</div>
            <div className="d-flex justify-content-center align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item m-1">
                  <SearchBar />
                </li>
                <li className="nav-item m-1">
                  <Link
                    to="/ask-question"
                    className="btn mt-1 btn-sm btn-light fw-bold mx-2 uppercase"
                  >
                    Ask a Question
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <div className="btn btn-sm">
                    <IoNotificationsSharp
                       onClick={onClickNotification}
                      className="mt-1"
                      style={{ color: "#fff", fontSize: "20px" }}
                    />
                  </div>
                </li>
                <li className="nav-item m-1">
                  <div>
                    {/* code may be needed after userprofile will come */}
                    <Avatar
                      onClick={onClickProfile}
                      avatarImg={UserImg}
                      className="rounded-circle img-thumbnail"
                      style={{
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isOpen} />
    </>
  );
};

export default Navbar;
