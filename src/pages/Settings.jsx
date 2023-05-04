import React from "react";
import useScrolltoTop from "../hooks/useScrollToTop";
import { Divider } from "antd";
import {FiChevronDown,FiChevronRight} from "react-icons/fi";


const Settings = () => {
  useScrolltoTop();
  return (
    <div className="container">
      <p className="lead fw-bold" style={{ color: "var(--clr-light-blue)" }}> Settings</p>
      <div class="card"style={{width: "50rem"}}>
      <div class="card-body">
      <div className ="row">
      <div className="col-10">
      <h5 class="card-title mb-0 mt-3" style={{ color: "var(--clr-light-blue)" , fontSize: "16px"}}>Edit Profile</h5>
      <p class="card-text mb-2"  style={{fontSize: "14px"}}> Edit your Personal details from here. </p> </div>
      <p className="col-2 ps-4 pt-3">  <FiChevronRight size ="25px" color= "lightgray"/> </p>
      </div>

       <Divider className="mb-0 mt-0" />

       <div className ="row">
       <div className="col-10">
       <h5 class="card-title  mb-0 mt-3" style={{ color: "var(--clr-light-blue)" , fontSize: "16px"}}>Notifications Settings</h5>
       <p class="card-text mb-2"  style={{fontSize: "14px"}}>  Choose type of notifications you want to receive.</p>
       </div>
       <p className="col-2 ps-4 pt-3"> <FiChevronDown  size ="25px" color= "lightgray"/> </p>
       </div>

       <Divider className="mb-0 mt-0" />
       <div>
       <h5 class="card-title  mb-0 mt-3" style={{ color: "var(--clr-light-blue)" , fontSize: "16px"}}>About</h5>
       <p class="card-text mb-2"  style={{fontSize: "14px"}}>Read or Learn about Privacy Policy of Ansify</p></div>
       <Divider className="mb-0 mt-0" />
       <div>
       <h5 class="card-title  mb-0 mt-3" style={{ color: "var(--clr-light-blue)" , fontSize: "16px"}}>Version</h5>
       <p class="card-text mb-2"  style={{fontSize: "14px"}}> Version 1.0</p></div>
       <Divider className="mb-0 mt-0" />
       <div>
       <h5 class="card-title mb-0 mt-3" style={{ color: "var(--clr-light-blue)" , fontSize: "16px"}}>Logout</h5></div>
      </div>
    </div>
    </div>
  );
};

export default Settings;


