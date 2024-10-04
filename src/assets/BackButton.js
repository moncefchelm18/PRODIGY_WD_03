import React from "react";
import { Link } from "react-router-dom";
import backIcon from "./icons8-back-64.png";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate(props.link)}>
        <img src={backIcon} height={32} alt="back" />
      </div>
    </>
  );
};

export default BackButton;
