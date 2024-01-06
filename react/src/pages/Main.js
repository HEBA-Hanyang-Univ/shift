import React from "react";
import "assets/styles/Main.scss";
import ShiftBtn from "assets/images/MH/MH_Btn.svg";
import ShiftLogo from "assets/images/MH/WhiteBoxLogo.svg";

const Main = () => {

  return (
    <div id="mainWrapper">
      <div className="mainContainer">
        <div className="mainSectionOneWrapper">
          <div className="mainSectionOneContent">
            <div className="mainSectionOneTitle">
              <span className="mainSectionOneTitleTop">
                인생의 전환 축
              </span>
              <span className="mainSectionOneTitleBottom">
                당신의 SHIFT
              </span>
              <img src={ShiftBtn} alt="main Btn img"></img>
            </div>
            <div className="mainSectionOneLink">
              <img src={ShiftLogo} alt="main white Btn img"></img>
              <span>나를 위한 자기계발 웹서비스, SHIFT</span>
            </div>
            <div className="mainSectionOneText">
              <div className="mainSectionOneTextLeft">
                <span>
                  나 자신<br/>
                  잘 알고 있나요?
                </span>
              </div>
              <div className="mainSectionOneTextRight">
                <div className="mainSectionOneTextRightTop">
                  <span>
                    매일 작심삼일만 하던 나, <br/>
                    어쩌면 나에게 맞는 목표가 아니었을지 몰라요
                  </span>
                </div>
                <div className="mainSEctionOneTextRightBottom">
                  <span>
                    SHIFT는 자기이해를 기반으로 <br/>
                    자신에게 알맞는 목표를 설정하고 성취할 수 있도록 돕는 <br/>
                    나를 위한 자기계발 웹서비스입니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Main;