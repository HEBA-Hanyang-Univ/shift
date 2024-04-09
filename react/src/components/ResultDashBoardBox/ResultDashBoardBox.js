import React from "react";
import { Button } from "../Button/Button";
import MZImg from "../../assets/images/Result_MZ.svg";
import "./ResultDashBoardBox.scss";

export const ResultDashBoardBox = () => {
  return (
    <div className="rdbbContainer">
      <div className="rdbbWrapper">
        <div className="rdbbContentWrapper">
          <div className="rdbbContentLeft">
            <div className="rdbbContentTitle">
              <span>MZ 자기객관화 테스트</span>
            </div>
            <div className="rdbbContentSubTitle">
              <span>응답자 수 &nbsp;&nbsp;&nbsp;</span>
              <span>1 / 3</span>
            </div>
          </div>
          <div className="rdbbContentRight">
            <img src={MZImg} alt="MZImg"/>
          </div>
        </div>
        <div className="rdbbBoxBtnWrapper">
          <Button width={3} height={1} className="rbbPurpleBtn" color={"#9C76AC"}>
            <span>결과 확인하기</span>  
          </Button>
          <Button></Button>
        </div>
      </div>
    </div>
  )

};