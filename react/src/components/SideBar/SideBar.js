import React, { useState } from "react";
import "assets/styles/SideBar.scss";
import SideBarContent from "./SideBarContent";
import CloseBtn from "assets/images/SideBarCloseBtn.svg";
import OpenBtn from "assets/images/SideBarOpenBtn.svg";
import { Transition } from "react-transition-group";
import SH_sq from 'assets/images/SH_sq.svg';

export const SideBar = ({showSideBar, setShowSideBar}) => {
  const duration = 300;

  const handleClose = () => {
    setShowSideBar(!showSideBar);
  }

  const defaultStyle = {
    transition: `max-width ${duration}ms ease-in-out`,
    maxWidth: '22.5rem',
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
      <Transition
        in={showSideBar}
        timeout={duration}>
          {state => (
            <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }} className={`sideBarContainer ${showSideBar ? '' : 'hidden'}`}>
              <SideBarContent mainImg={SH_sq} mainTitle={'Self-definition 자기정의'} subTitle={'Self-questioning (자기 이해)'}></SideBarContent>
            </div>
          )}
        </Transition>
        <div className="sideBarBtn">
          <button onClick={handleClose}>
            <img src={showSideBar ? CloseBtn : OpenBtn} alt="sidebar toggle btn"></img>
          </button>
        </div>
    </div>
  )
}