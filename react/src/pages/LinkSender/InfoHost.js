import React from "react";
import "../../assets/styles/common.scss";
import "../../assets/styles/LinkSender/InfoHost.scss";
import { RadioBtn } from "../../components/Button/RadioBtn";
import { DropDownBtn } from "../../components/Button/DropDownBtn";

export const InfoHost = () => {
  const ageOptions = Array.from({ length: 51}, (_, i) => `${i + 10}세`);
  
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
          <input className="ihUserName" placeholder="난준석그냥돌"></input>
        </div>
        <div className="ihInputGender">
          <span id="infoTitle">
            성별을 선택해주세요
          </span>
          <RadioBtn option1Text={'남자'} option2Text={'여자'} />
        </div>
        <div className="ihInputAge">
          <span id="infoTitle">
            연령을 선택해주세요
          </span>
          <DropDownBtn options={ageOptions}></DropDownBtn>
        </div>
        <div className="ihPushAgree">
          <span id="infoTitle">알림톡 발송 동의</span>
          <span className="ihPushAgreeDescription">
            3명 이상의 지인의 응답 완료시 알림톡을 통해
            <br></br>
            결과를 전달해드립니다.
          </span>
          <RadioBtn option1Text={'동의'} option2Text={'비동의'} />
          <span className="ihPushAgreeNotice">
            테스트 결과 제공만을 위한 정보 수집입니다.
          </span>
        </div>
      </div> 
    </div>
  )
};
