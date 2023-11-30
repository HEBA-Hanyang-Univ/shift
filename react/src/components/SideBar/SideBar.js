import React, { useState } from "react";
import "assets/styles/SideBar.scss";
import SideBarContent from "./SideBarContent";
import CloseBtn from "assets/images/SideBarCloseBtn.svg";
import OpenBtn from "assets/images/SideBarOpenBtn.svg";

export const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  const handleClose = () => {
    setShowSideBar(!showSideBar);
  }

  return (
    <div className="sideBarWrapper">
      <div className={`sideBarContainer ${showSideBar ? '' : 'hidden'}`}>
        <SideBarContent></SideBarContent>
      </div>
      <div className="sideBarBtn">
        <button onClick={handleClose}>
          <img src={showSideBar ? CloseBtn : OpenBtn} alt="sidebar toggle btn"></img>
        </button>
      </div>
    </div>
  )
}