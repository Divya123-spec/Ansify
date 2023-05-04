import React from "react";
import { Button, Tooltip } from "antd";
import { BsCaretUpFill } from "react-icons/bs";

const TooltipColor = "var(--clr-dark-blue)";

const UpVoteButton = ({ id, handleUpVotes, text }) => {
  return (
    <div>
      <Tooltip placement="right" color={TooltipColor} title={text}>
        <Button
          type="text"
          className="btn btn-sm"
          onClick={() => handleUpVotes(id)}
        >
          <BsCaretUpFill className="text-muted" style={{ fontSize: "20px" }} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default UpVoteButton;
