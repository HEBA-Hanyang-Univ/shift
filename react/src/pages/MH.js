import React from "react";
import { Link } from "react-router-dom";
import "assets/styles/MH.scss";
import Logo from "assets/images/ShiftLogoWhite.svg";
import BtnImg from "assets/images/MH/Rectangle.png";

const MH = () => {
  
  return (
    <>
    <header>
      <div className="headerLeft">
        <img src={Logo} alt="shiftLogo"></img>
      </div>
      <div className="headerRight">
        <span>|</span>
        {/* link would be added */}
        <Link>
          <button className="headerLogin">로그인</button>
        </Link>
        <Link>
          <button className="headerJoin">회원가입</button>
        </Link>
      </div>
    </header>
    <main>
      <section id="firstMainSection">
        <div className="fmsTitle">
          <span className="fmsMainTitle">인생의 전환 축</span>
          <span className="fmsSubTitle">당신의 SHIFT</span>
        </div>
        <Link to={'/sh'}>
          <img src={BtnImg} alt="mainImg"></img>
        </Link>
      </section>

    </main>
    </>
  )
}

export default MH;