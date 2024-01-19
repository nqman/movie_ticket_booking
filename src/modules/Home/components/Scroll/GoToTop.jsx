import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./goToTop.scss";

export default function GoToTop() {
  const [goToTop, setGoToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 200 ? setGoToTop(true) : setGoToTop(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {goToTop && (
        <button
          className="btn-go-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <AiOutlineArrowUp />
        </button>
      )}
    </div>
  );
}
