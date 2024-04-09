import React from "react";
import ShiftIcon from "../assets/images/ShiftIcon_transparent.png";
import ShiftLogo from '../assets/images/ShiftLogo_Purple.svg';
import Kakao from "../assets/images/kakao_login.png";

const SocialLogin = () => {
  // TODO: REST_API_KEY
  const REST_API_KEY = "REST_API_KEY"
  const REDIRECT_URI = "http://localhost:3000/host/info"
  const KAKAO_LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = KAKAO_LINK;
  };

  return (
    <div id="Container" className="socialContainer">
      <div className="socialWrapper">
        <div className="socialLogo">
          <img className="socialIconImg" src={ShiftIcon} alt="shiftIcon"/>
          <img className="socialLogoImg" src={ShiftLogo} alt="shiftLogo"/>
        </div>
        <div className="socialDes">
          <span>간편하게 로그인하고</span>
          <span>다양한 서비스를 이용해 보세요.</span>
        </div>
        <div className="kakaoLoginBox">
          <button onClick={loginHandler}>
            <img src={Kakao} alt="kakao login"></img>
          </button>
        </div>
      </div>
    </div>
  );

};

export default SocialLogin;