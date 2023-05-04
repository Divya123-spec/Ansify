import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrolltoTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);
}

export default useScrolltoTop;
