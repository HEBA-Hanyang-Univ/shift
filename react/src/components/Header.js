import React from "react";
import { Link } from "react-router-dom";
import "assets/styles/Header.scss";
import "assets/styles/common.scss";
import Logo from "assets/images/ShiftLogo.svg";
import Bar from "assets/images/purpleLine.png";

export const Header = () => {

  return (
    <div className="headerWrap">
      <div className="headerContainer">
        <div className="headerLogo">
          <img src={Logo} alt="shift logo img"></img>
        </div>
        <div className="headerUtilBox">
          <Link to="/">
            <button>홈</button>
          </Link>
          {/* TODO: 추후에 문의 페이지 링크 걸기 */}
          <Link to="/">
            <button>문의</button>
          </Link>
          <img src={Bar} alt="purple bar"></img>
          <button>로그아웃</button>
          <Link to='/sh'>
            <button className="myPageBtn">My Page</button>
          </Link>
        </div>
      </div>            
    </div>
  )
}