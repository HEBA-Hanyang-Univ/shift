import React from 'react';
import "../../assets/styles/LinkReceiver/CompleteGuest.scss";
import { Button } from '../../components/Button/Button';
import Checked from "../../assets/images/CheckedCircle.svg";
import cgImg1 from "../../assets/images/StartHost/shImg1.svg";
import cgImg2 from "../../assets/images/StartHost/shImg2.svg";
import cgImg3 from "../../assets/images/StartHost/shImg3.svg";
import cgImg4 from "../../assets/images/StartHost/shImg4.svg";
export const CompleteGuest = ()  => {
  
  return (
    <div id="Container" className="cgContainer">
      <div className="cgImgWrapper">
        <img src={Checked} alt="checked img"/>
        <span>완료되었습니다! </span>
      </div>
      <div className="cgInfoWrapper">
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle" style={{marginTop: '-0.6rem', marginBottom:'0.3rem'}}>
            <span>나에 대한 객관적 수치 분석</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg1} alt="boxImg" style={{width: '3.67rem', height: 'auto', marginBottom: '-0.2rem'}}/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>나는 상위 몇 % 알까?</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle" style={{marginTop: '-0.6rem', paddingBottom: '0.8rem'}}>
            <span>다른 사람들은 나를 어떻게 생각할까?</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg2} alt="boxImg" style={{width: '4.303rem', height: 'auto'}}/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>친구에게 공유하기!</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle" style={{marginTop: '-0.65rem', paddingBottom:'0.3rem'}}>
            <span>내가 아는 나 vs 너가 아는 나</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg3} alt="boxImg" style={{width: '6.37rem', height: 'auto'}}/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>체계적 자기객관화</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle" style={{marginTop: '-0.7rem', marginBottom: '0.2rem'}}>
            <span>5분 테스트</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg4} alt="boxImg" style={{ paddingTop: '0.34rem', width:'3.8rem', height: 'auto'}}/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>무료 TEST</span>
          </div>
        </div>
      </div>
      {/* TODO: 추후 검사 링크 넣기 */}
      <Button color="#A570C4" width={10.16} height={3.14} className="cgLinkBtn">
        <span>나도 검사하기</span>
      </Button>
    </div>
  )
};
