import React from "react";
import "../../assets/styles/common.scss";
import "../../assets/styles/LinkSender/StartHost.scss";
import { Button } from '../../components/Button/Button.js';
import shImg1 from "../../assets/images/StartHost/shImg1.svg";
import shImg2 from "../../assets/images/StartHost/shImg2.svg";
import shImg3 from "../../assets/images/StartHost/shImg3.svg";
import shImg4 from "../../assets/images/StartHost/shImg4.svg";
import shareImg from "../../assets/images/StartHost/shareImg.svg";
import shFooterImg from "../../assets/images/StartHost/shFooter.svg";

export const StartHost = () => {

  return (
    <div id="Container" className="shContainer">
      <div className="shTitleWrapper">
        <span className="shTitleS">남의 눈으로 확인하는</span>
        <span className="shTitleM">MZ 자기객관화 테스트</span>
      </div>
      <div className="shBoxWrapper">
        <div className="shBox">
          <div className="shBoxSubTitle">
            <span>수치로 확인하는 자기 객관성</span>
          </div>
          <div className="shBoxImg">
            <img src={shImg1} alt="boxImg" />
          </div>
          <div className="shBoxMainTitle">
            <span>나는 상위 몇 % 일까?</span>
          </div>
        </div>
        <div className="shBox">
          <div className="shBoxSubTitle">
            <span>나를 어떻게 생각할까?</span>
          </div>
          <div className="shBoxImg">
            <img src={shImg2} alt="boxImg" />
          </div>
          <div className="shBoxMainTitle">
            <span>친구에게 공유하기!</span>
          </div>
        </div>
        <div className="shBox">
          <div className="shBoxSubTitle">
            <span>내가 아는 나 vs 남이 아는 나</span>
          </div>
          <div className="shBoxImg">
            <img src={shImg3} alt="boxImg" />
          </div>
          <div className="shBoxMainTitle">
            <span>체계적 자기객관화</span>
          </div>
        </div>
        <div className="shBox">
          <div className="shBoxSubTitle">
            <span>간단한 5분 테스트</span>
          </div>
          <div className="shBoxImg">
            <img src={shImg4} alt="boxImg" />
          </div>
          <div className="shBoxMainTitle">
            <span>심지어 무료!</span>
          </div>
        </div>
      </div>
      <div className="shButtonContainer">
        <Button className="shButtonL" gradient="180deg, #9B6EB6 20%, #9361B0 80%" width={19.7} height={3.94}>
          <span className="shButtonSpanL">시작하기</span>
          <span className="shButtonSpanS">지금까지 1,054 명이 참여했어요!</span>
        </Button>
        <div className="shShareButtonWrapper">
          <Button className="testButton" color="#FFF" width={9.2} height={2}>
            <img src={shareImg} alt="share img"></img>
            <span>테스트 공유하기</span>
          </Button>
          <Button className="testButton" color="#FFF" width={9.2} height={2}>
            <img src={shareImg} alt="share img"></img>
            <span>설문 링크 공유하기</span>
          </Button>
        </div>
      </div>
      <div className="shFooter">
        <img src={shFooterImg} alt="footer logo" />
      </div>
    </div>
  )
};
