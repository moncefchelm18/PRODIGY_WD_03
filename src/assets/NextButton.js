import React from "react";
import { Link } from "react-router-dom";
import NextIcon from "./icons8-right-arrow-50.png";

const NextButton = (props) => {
  return (
    <>
      <Link to={props.link}>
        <button className="btn next-btn">
          Next
          <img
            width="28"
            height="28"
            src={NextIcon}
            alt="external-multiplayer-esport-itim2101-flat-itim2101"
          />
        </button>
      </Link>
    </>
  );
};

export default NextButton;
