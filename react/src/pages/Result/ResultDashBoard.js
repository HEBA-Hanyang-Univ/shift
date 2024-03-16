import React from "react";
import "../../assets/styles/Result/ResultDashBoard.scss";
import { ResultDashBoardBox } from "../../components/ResultDashBoardBox/ResultDashBoardBox";
import { PreparingDashBoardBox } from "../../components/ResultDashBoardBox/PreparingDashBoardBox";

export const ResultDashBoard = () => {

  return (
    <div id="Container">
      <div className="rdbWrapper">
        <div className="rdbTitleWrapper">
          <span>테스트 결과 확인</span>
        </div>
        <div className="rdbResultDashBoardBoxWrapper">
          <ResultDashBoardBox></ResultDashBoardBox>
          <PreparingDashBoardBox></PreparingDashBoardBox>
          <PreparingDashBoardBox></PreparingDashBoardBox>
        </div>
      </div>

    </div>
  )
}