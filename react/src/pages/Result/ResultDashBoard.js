import React from "react";
import { useHistory } from "react-router-dom";
import "../../assets/styles/Result/ResultDashBoard.scss";
import HandleLogin from "../../components/Login/HandleLogin.js";
import { ResultDashBoardBox } from "../../components/ResultDashBoardBox/ResultDashBoardBox";
import { PreparingDashBoardBox } from "../../components/ResultDashBoardBox/PreparingDashBoardBox";

const ResultDashBoard = () => {

  HandleLogin(() => {});

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

export default ResultDashBoard;