import React, { useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";
import { menuItems } from "./../../utils/sideMenuList";
// import "./Sidebar.css";

const Sidebar = (props) => {
  const [isActive, setIsActive] = useState(null);
  const { isOpen } = props;

  return (
    <>
      <main className={isOpen ? "space-toggle" : null}>
        <aside className={`sidebar ${isOpen ? "isShow" : null}`}>
          <nav className="side-nav">
            <div>
              <Link to="/" className="nav-logo">
                <i className={`nav-logo-icon`}></i>
                <span className="nav-logo-name">Homepage</span>
              </Link>

              <div className="nav-side-list">
                {menuItems.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.name}
                    className={`link`}
                    onClick={() => setIsActive(item)}
                  >
                    <span className="nav-link-icon">{item.icon}</span>
                    <span className="nav-link-name">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            <Link to="/logout" className="link">
              <i className="nav-link-icon">
                <AiOutlinePoweroff className="icon" />
              </i>
              <span className="nav-link-name">Logout</span>
            </Link>
          </nav>
        </aside>

        <Outlet />
      </main>
      {/* <div className="sidenav">
        <div
          style={{ width: isOpen ? "180px" : "45px", transition: "all 0.5s" }}
          className="sidebar"
        >
          {menuItems.map(item => (
            <NavLink
              activeclassname="active"
              to={item.path}
              key={item.name}
              className="link"
            >
              <div className="icon">{item.icon}</div>
              <div
                className="link_text mt-1"
                style={{
                  display: isOpen ? "block" : "none",
                  transition: "all 1s"
                }}
              >
                {item.name.toLocaleUpperCase()}
              </div>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div> */}
    </>
  );
};

export default Sidebar;
