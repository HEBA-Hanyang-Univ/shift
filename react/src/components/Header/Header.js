import React, { useState, useEffect } from "react";
import "../../assets/styles/common.scss";
import "./Header.scss";
import Logo from "../../assets/images/HeaderLogo.svg";
import NavBtn from "../../assets/images/NavBtn.svg";

const Header = () => {

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <img src={Logo} alt="mainLogo"></img>
      </div>
      <div className="headerRight">
        <div className="headerName">
          <span></span>
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

export default Header;