import React, {useEffect, useState} from "react";
import "../../assets/styles/LinkReceiver/StartGuest.scss";
import { Button } from "../../components/Button/Button";
import { LandingGuest } from "./LandingGuest";
import { Link } from "react-router-dom";

export const StartGuest = () => {

  // 랜딩페이지
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);   // 2초 후에 로딩 상태 변경

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if(isLoading) {
    return <LandingGuest />;
  }

  return (
    <div id="Container" className="sgContainer">
      <div className="sgWrapper">
        <div className="sgTitleWrapper">
          <span className="sgTitleBlack">평소 내가 생각했던</span>
          {/* TODO : username 받아오기 */}
          <span className="sgTitlePurple">username</span>
        </div>
        <div className="sgButtonWrapper">
          <Link to="/guest/info">
            <Button gradient="180deg, #9C76AC 0%, #AC86BD 100%" width={9.7} height={4}className="sgStartBtn">
              <span>응답하기</span>
            </Button>
          </Link>
          {/* TODO : 참여 인원 받아오기 */}
          <span className="sgBtnSpan">지금까지 5,800명이 참여했어요!</span>
        </div>          
      </div> 
      <div className="sgFooter">
        <span>평균 소요시간 : 2분</span>
      </div>
    </div>
  )
};
