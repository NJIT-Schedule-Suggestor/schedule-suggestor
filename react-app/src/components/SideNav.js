import React from "react";
import "./SideNav.css";
import njitImage from "./Logo_of_New_Jersey_Institute_of_Technology.png";
import MuiButton from "@mui/material/Button";
import { useNavigate } from "react-router";
// added alt description to image, since i opened this file to
//look at how you did things and it threw the error without me even doing anything.

//also threw some crazy ass error and i looked it up basically added a "/" in every href
//maybe i have an older version of js?
export function SideNav() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/generate");
  };
  return (
    <div className="side-nav">
      <img
        src={njitImage}
        className="njit-image"
        alt="NJIT Logo"
        onClick={() => (window.location.href = "/")}
        style={{ cursor: "pointer" }}
      />
      <a href="/">Home</a>
      <a href="/courses">Courses</a>
      <a href="/time-preference">Time Preference</a>
      <div className="generate-button">
        <MuiButton variant="contained" onClick={handleClick}>
          Generate
        </MuiButton>
      </div>
    </div>
  );
}
