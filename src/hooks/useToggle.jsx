import { useState } from "react";

export default function useToggle(defaultValue) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  function toggler(isOpen) {
    setIsOpen(prevValue => (typeof isOpen === "boolean" ? isOpen : !prevValue));
  }

  return [isOpen, toggler];
}
