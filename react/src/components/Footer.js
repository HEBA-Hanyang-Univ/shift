import "assets/styles/Footer.scss";
import OpenBtn from "assets/images/FooterOpenBtn.svg";
import FooterHelp from "./FooterHelp";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

export const Footer = ({ link }) => {
  const [showHelpSlide, setShowHelpSlide] = useState(false);
  const [showOpenBtn, setShowOpenBtn] = useState(true);

  const slideContent = "자신에게 맞는 또는 가장 가까운 것 같은 MBTI를 최대 2개까지 선택할 수 있습니다.";

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
            <FooterHelp content={slideContent} hideHelpSlide={handleClose}></FooterHelp>
          </div>
        )}
      </Transition>
      <div className="footerContainer">
        <button>
          <Link to={link} style={{textDecoration: 'none'}}>
            <span className="footerContainerSpan">
              NEXT
            </span>
          </Link>
        </button>
      </div>
    </div>
  )
}