import React, { useState } from "react";
import Arrow from "../../assets/images/headerArrow.svg";
import "./Hamburger.scss";

export const HamburgerMenu = () => {

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // TODO: 추후 링크 연결

  return (
    <div className="hamburgerContainer">
      <ul className="hamburgerUl">
        <li onClick={() => setIsSubMenuOpen(!isSubMenuOpen)} className={`hamburgerLi ${isSubMenuOpen ? 'active' : ''}`}>
          <img src={Arrow} alt="arrow"></img>
          <span className="hamburgerLiSpan">자기이해 검사</span>
          {isSubMenuOpen && (
            <ul className="hamburgerSubUl">
              <li className="hamburgerSubLi">
                <span>남이 보는 나 ( MZ 버전 )</span>
              </li>
              <li className="hamburgerSubLi">
                <span>남이 보는 나 (대학생 버전)</span>
              </li>              
            </ul>
          )}
        </li>
        <li className="hamburgerLi">
          <span className="hamburgerLiSpan">결과 확인</span>
        </li>
        <li className="hamburgerLi">
          <span className="hamburgerLiSpan">의견보내기</span>
        </li>
        <li className="hamburgerLi">
          <span className="hamburgerLiSpan">로그인</span>
        </li>
      </ul>
    </div>
  );
}