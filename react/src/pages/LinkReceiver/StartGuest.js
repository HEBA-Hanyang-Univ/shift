import React, {useEffect, useState} from "react";
import "../../assets/styles/common.scss";
import "../../assets/styles/LinkReceiver/StartGuest.scss";
import { Button } from "../../components/Button/Button";
import { LandingGuest } from "./LandingGuest";

export const StartGuest = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);   // 2초 후에 로딩 상태 변경
  }, []);

  if(isLoading) {
    return <LandingGuest />;
  }

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
