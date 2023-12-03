import React, { useState } from "react";
import "assets/styles/SideBar.scss";
import SideBarContent from "./SideBarContent";
import CloseBtn from "assets/images/SideBarCloseBtn.svg";
import OpenBtn from "assets/images/SideBarOpenBtn.svg";
import { Transition } from "react-transition-group";

export const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const duration = 500;

  const handleClose = () => {
    setShowSideBar(!showSideBar);
  }

  const defaultStyle = {
    transition: `max-width ${duration}ms ease-in-out`,
    maxWidth: 0,
    overflow: 'hidden',
  }

  const transitionStyles = {
    entering: {maxWidth: 0},
    entered: {maxWidth: '22.5rem'},
    exiting: {maxWidth: 0},
    exited: {maxWidth: 0},
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