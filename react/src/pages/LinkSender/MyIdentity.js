import React from "react";
import "../../assets/styles/common.scss";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBox } from "../../components/Button/KeywordBtnBox";

export const MyIdentity = () => {
  
  return (
    <div id="Container" className="miContainer">
      <div className="idTitle">
        <div className="idTitleTop">
          <span className="idTitleUserName">username</span>
          <span>님을 가장 잘 나타내는</span>
        </div>
        <div className="idTitleBottom">
          <span>키워드 5개를 선택해 주세요.</span>
        </div>
      </div>
      <div className="keywordBox">  
        <KeywordBtnBox 
          color="#FFF" 
          width={5.2} 
          height={3.2}
          className="keywordBtn"
        ></KeywordBtnBox>
      </div>
    </div>
  )
};

