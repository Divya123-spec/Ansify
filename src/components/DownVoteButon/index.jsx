import React from "react";
import { Button, Tooltip } from "antd";
import { BsCaretDownFill } from "react-icons/bs";

const TooltipColor = "var(--clr-dark-blue)";

const DownVoteButton = ({ id, handleDownVotes, text }) => {
  return (
    <div>
      <Tooltip placement="right" color={TooltipColor} title={text}>
        <Button
          type="text"
          className="btn btn-sm"
          onClick={() => handleDownVotes(id)}
        >
          <BsCaretDownFill
            className="text-muted"
            style={{ fontSize: "20px" }}
          />
        </Button>
      </Tooltip>
    </div>
  );
};

export default DownVoteButton;
