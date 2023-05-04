import React from "react";

const Avatar = (props) => {
  return (
    <div>
      <img
        src={props.avatarImg}
        className={props.className}
        style={props.style}
        alt="Avatar"
        onClick ={props.onClick}
      />

      {props.children}
    </div>
  );
};

export default Avatar;
