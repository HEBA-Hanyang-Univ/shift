import React, { useState, useRef } from "react";
import "./Header.scss";
import Logo from "../../assets/images/HeaderLogo.svg";
import NavBtn from "../../assets/images/NavBtn.svg";
import HamburgerMenu from "../Hamburger/HamburgerMenu";
import { Link } from "react-router-dom";
import { loadUserData } from "../CookieUtils/SecureLocalStorageExtends";
import UseOutsideClick from "../Modal/UseOutsideClick";

const Header = () => {
  const name = loadUserData("name");
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const hamburgerMenuRef = useRef();

  const toggleHamburgerMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  UseOutsideClick(hamburgerMenuRef, () => {
    if(showHamburgerMenu) {
      setShowHamburgerMenu(false);
    }
  });

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <Link to="/">
          <img className="headerLogo" src={Logo} alt="mainLogo"></img>
        </Link>
      </div>
      <div className="headerRight">
        <div className="headerName">
          {name !== undefined && name !== null && <span>{name}님</span>}
        </div>
        <div className="headerBtnContainer">
          <button onClick={toggleHamburgerMenu}>
            <img src={NavBtn} alt="navigationButton"></img>
          </button>
          {showHamburgerMenu && (
            <div ref={hamburgerMenuRef}>
              <HamburgerMenu 
                isOpen={showHamburgerMenu} toggleMenu={toggleHamburgerMenu}
              />
            </div>
          )}
          {showHamburgerMenu && <div className="hamburgerBackground"></div>}
        </div>
      </div>
    </div>
  );
};

export default Header;
