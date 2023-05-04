import React, { useState } from "react";
import { FiLink } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import Button from "../Button/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Clipboard = ({ text }) => {
  const location = window.location.origin;
  const [clipboardState, setClipboardState] = useState(false);

  const handleCopy = () => {
    setClipboardState(true);
    setTimeout(() => {
      setClipboardState(false);
    }, 1000);
  };

  return (
    <div>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <Button
          title={clipboardState ? "Copied!" : "Copy"}
          onClick={() =>
            navigator.clipboard.writeText(`${location}/question/${text}`)
          }
        >
          {clipboardState ? (
            <GiCheckMark className="icon text-success mb-0" />
          ) : (
            <FiLink className="icon text-muted mb-0" />
          )}
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default Clipboard;
