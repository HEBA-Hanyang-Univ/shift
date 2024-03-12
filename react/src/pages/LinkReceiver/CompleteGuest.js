import React from 'react';
import "../../assets/styles/common.scss";
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
          <div className="cgInfoBoxSubTitle">
            <span>나에 대한 객관적 수치 분석</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg1} alt="boxImg"/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>나는 상위 몇 % 알까?</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle">
            <span>다른 사람들은 나를 어떻게 생각할까?</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg2} alt="boxImg"/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>친구들에게 공유하기!</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle">
            <span>내가 아는 나 vs 너가 아는 나</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg3} alt="boxImg"/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>체계적 자기객관화</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle">
            <span>5분 테스트</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg4} alt="boxImg"/>
          </div>
          <div className="shInfoBoxMainTitle">
            <span>무료 TEST</span>
          </div>
        </div>
      </div>
      <Button color="#A570C4" width={10.16} height={3.14} className="cgLinkBtn">
        <span>나도 검사하기</span>
      </Button>
    </div>
  )
};
