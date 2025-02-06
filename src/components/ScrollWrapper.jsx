import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ScrollWrapper = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return <>{children}</>;
};

export default ScrollWrapper;
