import React, { useEffect, useState } from "react";
import Arrow from "../../assets/images/headerArrow.svg";
import secureLocalStorage from "react-secure-storage";
import "./Hamburger.scss";
import { Link, useNavigate } from "react-router-dom";

const HamburgerMenu = ({ toggleMenu }) => {

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = secureLocalStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    secureLocalStorage.clear();
    setIsLoggedIn(false);
    navigate("/"); // redirect to main page
  };

  const showPreparationAlert = () => {
    alert("준비중입니다!  다음 컨텐츠도 기대헤주세요 :)");
  };

  return (
    <div className="hamburgerContainer">
      <ul className="hamburgerUl">
        <li onClick={() => setIsSubMenuOpen(!isSubMenuOpen)} className={`hamburgerLi ${isSubMenuOpen ? 'active' : ''}`}>
          <img src={Arrow} alt="arrow"></img>
          <span className="hamburgerLiSpan">자기이해 검사</span>
          {isSubMenuOpen && (
            <ul className="hamburgerSubUl">
              <Link to={"/"} onClick={toggleMenu}>
                <li className="hamburgerSubLi">
                  <span>남이 보는 나 ( MZ 버전 )</span>
                </li>
              </Link>
              <li className="hamburgerSubLi" onClick={showPreparationAlert}>
                <span>남이 보는 나 (대학생 버전)</span>
              </li>              
            </ul>
          )}
        </li>
        <Link to={"/result/dashboard"} onClick={toggleMenu}>
          <li className="hamburgerLi">
            <span className="hamburgerLiSpan">결과 확인</span>           
          </li>
        </Link>
        <li className="hamburgerLi" onClick={toggleMenu}>
          <a href="mailto:godsaenglab@gmail.com?subject=의견 보내기&body=여기에 의견을 작성해주세요.">
            <span className="hamburgerLiSpan">의견보내기</span>
            </a>
        </li>
        <Link to={"/login"} onClick={toggleMenu}>
          {isLoggedIn ? (
            <li className="hamburgerLi" onClick={handleLogout}>
              <span className="hamburgerLiSpan">로그아웃</span>
            </li>
          ) : (
            <li className="hamburgerLi">
              <span className="hamburgerLiSpan">로그인</span>
            </li>
          )}
        </Link>
      </ul>
    </div>
  );
}

export default HamburgerMenu;