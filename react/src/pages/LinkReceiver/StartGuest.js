import React from "react";
import "../../assets/styles/common.scss";
import "../../assets/styles/LinkReceiver/StartGuest.scss";
import { Button } from "../../components/Button/Button";

export const StartGuest = () => {

  return (
    <div id="Container" className="sgContainer">
      <div className="sgWrapper">
        <div className="sgTitleWrapper">
          <span className="sgTitleBlack">평소 내가 생각했던</span>
          <span className="sgTitlePurple">USERNAME</span>
        </div>
        <div className="sgButtonWrapper">
          <Button gradient="180deg, #9C76AC 0%, #AC86BD 100%" width={8} height={3} className="sgStartBtn">시작하기</Button>
          <span>지금까지 5,800명이 참여했어요!</span>
        </div>          
      </div>
      <div className="sgFooter">
        <span>평균 소요시간 : 2분</span>
      </div>
    </div>
  )
};
