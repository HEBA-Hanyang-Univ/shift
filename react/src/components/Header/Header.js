import React, { useState } from "react";
import "./Header.scss";
import Logo from "../../assets/images/HeaderLogo.svg";
import NavBtn from "../../assets/images/NavBtn.svg";
import HamburgerMenu from "../Hamburger/HamburgerMenu";
import { Link } from "react-router-dom";

const Header = ({ name }) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  
  const toggleHamburgerMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <Link to="/">
          <img className="headerLogo" src={Logo} alt="mainLogo"></img>
        </Link>
      </div>
      <div className="headerRight">
        <div className="headerName">
          {name !== undefined && <span>{name}님</span>}
        </div>
        <div className="headerBtnContainer">
          <button onClick={toggleHamburgerMenu}>
            <img src={NavBtn} alt="navigationButton"></img>
          </button>
          {showHamburgerMenu && <HamburgerMenu isOpen={showHamburgerMenu} toggleMenu={toggleHamburgerMenu}/>}
        </div>
      </div>
    </div>
  );
};

export default Header;
