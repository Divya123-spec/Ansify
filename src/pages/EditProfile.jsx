import React, { useState } from "react";
import { Input, Button, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineGithub } from "react-icons/ai";
import { VscInfo } from "react-icons/vsc";
import { TfiWorld } from "react-icons/tfi";
import UserImg from "./../assets/images/user.png";
import Avatar from "../components/Avatar/Avatar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tagArr } from "../utils/dateConversion";
import { success } from "../components/ConfirmationModal";
import useFetch from "../hooks/useFetch";

function EditProfile() {
  const _USER_DETAILS = sessionStorage.getItem("USER_DETAILS");
  const userInfo = JSON.parse(_USER_DETAILS);
  let userId = userInfo && userInfo.userid;
  const url = `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/get/${userId}/v1`;
  const { data, loading, error } = useFetch(url);

  const [expertise, setExpertise] = useState([]);
  const [about, setAbout] = useState(data.about);
  const navigate = useNavigate();

  let DisplayName = data.firstname + " " + data.lastname;
  let emailDepartment = data.emailid + "/" + data.department;
  const TooltipColor = "var(--clr-dark-blue)";


  const onChangeAbout = e => {
    setAbout(e.target.value);
  };

  React.useEffect(() => {
    if (data.about) {
      setAbout(data.about);
    }
  }, [data.about]);

  React.useEffect(() => {
    if (data.experties) {
      setExpertise(data.experties);
    }
  }, [data.experties]);

  const submitUserDetails = () => {
    let USER_PAYLOAD = {
      shortId: data && data.shortid,
      firstName: data && data.firstname,
      lastName: data && data.lastname,
      department: data && data.department,
      createdBy: data && data.shortid,
      about: about,
      experties: expertise.split(","),
      userId: data && data.userid,
      emailId: data && data.emailid
    };
    axios
      .put(
        `${process.env.REACT_APP_USER_ADMIN_SERVICE_ENDPOINT}/useradminservice/user/update/v1`,
        USER_PAYLOAD
      )
      .then(res => {
        navigate("/profile-view");
        success("User details updated successfully");
      });
  };
  return (
    <div>
      <p
        className="lead fw-bold ms-4"
        style={{ color: "var(--clr-light-blue)" }}
      >
        Edit Profile
      </p>
      <div className="card" style={{ width: "60rem" }}>
        <div className="card-body">
          <div className="col-md-4 mt-6">
            <Avatar
              avatarImg={UserImg}
              className="rounded-circle img-thumbnail"
              style={{ width: "40%" }}
            />
          </div>
          <div className="col-md-4 mt-6">
            <p className="fw-bold mt-0 mb-0" style={{ fontSize: "14px" }}>
              {" "}
              Display Name{" "}
            <Tooltip 
            placement="right"
            color={TooltipColor}
            title="You cannot change the display name,as the data is pulled from Corporate directory">
              <Button type="text" className="btn btn-sm">
                <VscInfo className="text-muted" style={{ fontSize: "20px" }} />
              </Button>
            </Tooltip>
            </p>
            <Input
              type="text"
              name="title"
              placeholder="Name"
              required
              disabled
              value={DisplayName}
            />
          </div>

          <div className="col-md-6 mt-6">
            <p className="fw-bold mt-0 mb-0" style={{ fontSize: "14px" }}>
              Email Address/ Department
              <Tooltip 
            placement="right"
            color={TooltipColor}
            title="You cannot change the email/dep,as the data is pulled from Corporate directory">
              <Button type="text" className="btn btn-sm">
                <VscInfo className="text-muted" style={{ fontSize: "20px" }} />
              </Button>
            </Tooltip>
            </p>
            <Input
              type="text"
              name="title"
              placeholder="Email Address/ Dept"
              required
              disabled
              value={emailDepartment}
            />
          </div>
          <div className="col-md-8 mt-6">
            <p className="fw-bold mt-0 mb-0" style={{ fontSize: "14px" }}>
              About
            </p>
            <TextArea
              type="text"
              name="title"
              placeholder="About"
              required
              value={about}
              onChange={onChangeAbout}
            />
          </div>
          <div className="col-md-4 mt-6">
            <p className="fw-bold mt-0 mb-0" style={{ fontSize: "14px" }}>
              Expertise In
            </p>
            <Input
              type="text"
              name="title"
              onChange={e => setExpertise(e.target.value)}
              value={expertise}
              placeholder="Experience"
              required
            />
          </div>
          <div className="col-md-12 mt-6">
            <p className="fw-bold mt-0 mb-0" style={{ fontSize: "14px" }}>
              Links
            </p>
            <div className="row">
              {/* In future it will be needed */}
              {/* <div className="col-md-4 mt-6">
                <Input addonBefore defaultValue="mysite" />
              </div> */}
              <div className="col-md-4 mt-6">
                <Input
                  addonBefore={<AiOutlineGithub />}
                  defaultValue="mysite"
                />
              </div>
              <div className="col-md-4 mt-6">
                <Input addonBefore={<TfiWorld />} defaultValue="mysite" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 mt-4">
              <Button type="primary" size="small" onClick={submitUserDetails}>
                Save
              </Button>
            </div>
            <div className="col-md-1 mt-4">
              <Button size="small">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
