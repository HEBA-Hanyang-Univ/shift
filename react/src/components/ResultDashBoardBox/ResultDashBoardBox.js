import React from "react";
import { Button } from "../Button/Button";
import MZImg from "../../assets/images/Result/Result_MZ.png";
import "./ResultDashBoardBox.scss";
import { Link } from "react-router-dom";

export const ResultDashBoardBox = ({ resultLink }) => {
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
              <span>0 / 3</span>
            </div>
          </div>
          <div className="rdbbContentRight">
            <img src={MZImg} alt="MZImg"/>
          </div>
        </div>
        <div className="rdbbBoxBtnWrapper">
          <Link to={resultLink}>
            <Button 
              width={7.2} 
              height={1.85} 
              className="rdbbPurpleBtn" 
              color={"#9C76AC"}
            >
              <span>결과 확인하기</span>  
            </Button>
          </Link>
          <Button 
            width={7.2} 
            height={1.85} 
            className="rdbbWhiteBtn"
            color={"#D3D3D3"}
            >
              <span>테스트 링크 공유</span>
            </Button>
        </div>
      </div>
    </div>
  )

};