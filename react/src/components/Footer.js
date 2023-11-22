import "assets/styles/Footer.scss";
import OpenBtn from "assets/images/FooterOpenBtn.svg";
import FooterHelp from "./FooterHelp";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

export const Footer = ({ link, helpContent }) => {
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

  const onClick = (e) => { 
    // TODO: 전송할 데이터 설정
    e.preventDefault();
  }

  const handleOpen = () => {
    setShowHelpSlide(true);
    setShowOpenBtn(false);
  };

  const handleClose = () => {
    setShowHelpSlide(false);
  }

  return (
    <div className="footerWrapper">
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
            <FooterHelp helpContent={helpContent} hideHelpSlide={handleClose}></FooterHelp>
          </div>
        )}
      </Transition>
      <div className="footerContainer">
        <button>
          <Link to={link} style={{textDecoration: 'none'}} onClick={(event) => onClick(event)}>
            <span className="footerContainerSpan">
              NEXT
            </span>
          </Link>
        </button>
      </div>
    </div>
  )
}