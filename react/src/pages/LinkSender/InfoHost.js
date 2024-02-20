import React from "react";
import "../../assets/styles/common.scss";
import "../../assets/styles/LinkSender/InfoHost.scss";

export const InfoHost = () => {
  
  return (
    <div id="Container">
      <div className="ihWrapper">
        <div className="ihTitle">
          <span>MZ 자기객관화 테스트</span>
        </div> 
        <div className="ihInputName">
          <span id="infoTitle">
            이름 또는 별명을 입력하세요
          </span>
        </div>
      </div> 
    </div>
  )
};
