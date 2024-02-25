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
          keywords={['방구를 잘 뀌는', '지혜로운', '화가 많이 나는', '행복한', '히키코모리'
          ,'방구를 잘 뀌는', '지혜로운', '화가 많이 나는', '행복한', '히키코모리'
          ,'방구를 잘 뀌는', '지혜로운', '화가 많이 나는', '행복한', '히키코모리',
          '방구를 잘 뀌는', '지혜로운', '화가 많이 나는', '행복한', '히키코모리'  
        ]}
          gradient="180deg, #C6A0D6 0%, #9D7DAA 98%"
          width={5}
          height={2.4}
          className="keywordBtn"
        ></KeywordBtnBox>
      </div>
    </div>
  )
};

