import React from "react";
import { Button } from "../Button/Button";
import MZImg from "../../assets/images/Result_MZ.svg";
import "./ResultDashBoardBox.scss";

export const ResultDashBoardBox = () => {
  return (
    <div className="rdbbWrapper">
      <div className="rdbbContentWrapper">
        
      </div>
      <div className="rdbbBoxBtnWrapper">
        <Button width={3} height={1} className="rbbPurpleBtn">
          <span>결과 확인하기</span>
        </Button>
        <Button></Button>
      </div>
    </div>
  )

};