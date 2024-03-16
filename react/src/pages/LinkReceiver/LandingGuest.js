import React from "react";
import "../../assets/styles/LinkReceiver/LandingGuest.scss";
import LandingLogo from "../../assets/images/LandingLogo.svg";
import LandingTitle from "../../assets/images/LandingTitle.svg";

export const LandingGuest = () => {

  return (
    <div id="Container" className="landingContainer">
      <div className="logoContainer">
        <div className="landingLogo">
          <img src={LandingLogo} alt="shift logo img"></img>
        </div>
        <div className="landingTitle">
          <img src={LandingTitle} alt="shift title img"></img>
        </div>
      </div>
      <div className="landingSpan">
        <span>MZ 자기객관화 테스트</span>
      </div>
    </div>
  )
};