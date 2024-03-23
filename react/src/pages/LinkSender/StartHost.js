import React from "react";
import "../../assets/styles/LinkSender/StartHost.scss";
import { Button } from '../../components/Button/Button.js';
import { MainFooter } from '../../components/Footer/MainFooter.js';
import shImg1 from "../../assets/images/StartHost/shImg1.svg";
import shImg2 from "../../assets/images/StartHost/shImg2.svg";
import shImg3 from "../../assets/images/StartHost/shImg3.svg";
import shImg4 from "../../assets/images/StartHost/shImg4.svg";
import shareImg from "../../assets/images/StartHost/shareImg.svg";
import shFooterImg from "../../assets/images/StartHost/shFooter.svg";

export const StartHost = () => {

  return (
    <>
    <div id="Container" className="shContainer">
      <div className="shWrapper">
        <div className="shTitleWrapper">
          <span className="shTitleS">남의 눈으로 확인하는</span>
          <span className="shTitleM">MZ 자기객관화 테스트</span>
        </div>
        <div className="shBoxWrapper">
          <div className="shBox">
            <div className="shBoxSubTitle" style={{marginTop: '-0.4rem', marginBottom:'0.29rem'}}>
              <span>수치로 확인하는 자기 객관성</span>
            </div>
            <div className="shBoxImg">
              <img src={shImg1} alt="boxImg" style={{width: '3.6rem', height: 'auto', marginBottom: '-0.2rem'}} />
            </div>
            <div className="shBoxMainTitle">
              <span>나는 상위 몇 % 일까?</span>
            </div>
          </div>
          <div className="shBox">
            <div className="shBoxSubTitle" style={{marginTop: '-0.3rem', paddingBottom: '0.698rem'}}>
              <span>나를 어떻게 생각할까?</span>
            </div>
            <div className="shBoxImg">
              <img src={shImg2} alt="boxImg" style={{width:'4.33rem', height: 'auto'}} />
            </div>
            <div className="shBoxMainTitle">
              <span>친구에게 공유하기!</span>
            </div>
          </div>
          <div className="shBox">
            <div className="shBoxSubTitle" style={{marginTop: '-0.65rem', paddingBottom: '0.3rem'}}>
              <span>내가 아는 나 vs 남이 아는 나</span>
            </div>
            <div className="shBoxImg">
              <img src={shImg3} alt="boxImg" style={{width: '6.17rem', height: 'auto'}}/>
            </div>
            <div className="shBoxMainTitle">
              <span>체계적 자기객관화</span>
            </div>
          </div>
          <div className="shBox">
            <div className="shBoxSubTitle" style={{marginTop: '-0.6rem'}}>
              <span>간단한 5분 테스트</span>
            </div>
            <div className="shBoxImg">
              <img src={shImg4} alt="boxImg" style={{paddingTop: '0.34rem', width: '3.8rem', height: 'auto'}} />
            </div>
            <div className="shBoxMainTitle">
              <span>심지어 무료!</span>
            </div>
          </div>
        </div>
        <div className="shButtonContainer">
          <Button className="shButtonL" gradient="180deg, #9B6EB6 20%, #9361B0 80%" width={19.7} height={3.4}>
            <span className="shButtonSpanL" style={{paddingTop: '0.2rem'}}>시작하기</span>
            {/* TODO : 추후 참여 인원 수 넣기 */}
            <span className="shButtonSpanS">지금까지 1,054 명이 참여했어요!</span>
          </Button>
          <Button className="shButtonL" gradient="180deg, #A27DB2 0%, #A570C4 100%" width={19.7} height={3.4}>
            <span className="shButtonSpanL">결과 확인하기</span>
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
      <MainFooter/>
    </div>
    
    {/* <MainFooter/> */}
    </>
  )
};
