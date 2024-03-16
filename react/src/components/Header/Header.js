import React, { useState, useEffect, Component } from "react";
import "./Header.scss";
import Logo from "../../assets/images/HeaderLogo.svg";
import NavBtn from "../../assets/images/NavBtn.svg";
import Hamburger from "../../components/Hamburger/Hamburger.js";

export const Header = () => {

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <img src={Logo} alt="mainLogo"></img>
      </div>
      <div className="headerRight">
        <div className="headerName">
          <span>username</span>
        </div>
        <div className="headerBtnContainer">
          <button>
            <img src={NavBtn} alt="navigationButton"></img>
          </button>
        </div>
      </div>
    </div>
  );
}