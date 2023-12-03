import "assets/styles/Footer.scss";
import OpenBtn from "assets/images/FooterOpenBtn.svg";
import FooterHelp from "./FooterHelp";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

export const Footer = ({ showSideBar, link, helpContent, onClickButton }) => {
  const [showHelpSlide, setShowHelpSlide] = useState(false);
  const [showOpenBtn, setShowOpenBtn] = useState(true);

  const duration = 300;

  const defaultStyle = {
    transition: `max-height ${duration}ms ease-in-out`,
    maxHeight: 0, 
    overflow: 'hidden',
  };

  const transitionStyles = {
    entering: {maxHeight: 0},
    entered: {maxHeight: '23rem'},
    exiting: {maxHeight: 0},
    exited: {maxHeight: 0},
  };

  const footerStyle = {
    width: showSideBar ? 'calc(100% - 22.5rem)' : '100%',
    ...(showSideBar ? {right: 0} : {left: 0})
  }

  const onClick = (e) => { 
    // TODO: 전송할 데이터 설정
    onClickButton ?.();
  }

  const handleOpen = () => {
    setShowHelpSlide(true);
    setShowOpenBtn(false);
  };

  const handleClose = () => {
    setShowHelpSlide(false);
  }

  return (
    <div className="footerWrapper" style={footerStyle}>
      {showOpenBtn && (
        <button className="footerBtn" onClick={handleOpen}>
          <img src={OpenBtn} alt="open btn"></img>
        </button>
      )}
      <Transition
        in={showHelpSlide}
        timeout={duration}
        onEntered={() => setShowOpenBtn(false)}
        onExited={() => setShowOpenBtn(true)}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            <FooterHelp content={helpContent} hideHelpSlide={handleClose}></FooterHelp>
          </div>
        )}
      </Transition>
      <div className="footerContainer" onClick={(event) => onClick(event)}>
      <Link to={link} style={{textDecoration: 'none'}}>
        <button>
            <span className="footerContainerSpan">
              NEXT
            </span>
        </button>
      </Link>
      </div>
    </div>
  )
}