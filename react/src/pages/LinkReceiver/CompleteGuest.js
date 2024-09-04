import React, { useState } from 'react';
import "../../assets/styles/LinkReceiver/CompleteGuest.scss";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import CompleteImoji from "../../assets/images/Guest_complete.png";
import cgImg1 from "../../assets/images/StartHost/shImg1.png";
import cgImg2 from "../../assets/images/StartHost/shImg2.png";
import cgImg3 from "../../assets/images/StartHost/shImg3.png";
import cgImg4 from "../../assets/images/StartHost/shImg4.png";
import shareImg from "../../assets/images/StartHost/shareImg.svg";
import HandleLogin from '../../components/FetchComponent/FetchComponent';
import TryFetch from '../../components/FetchComponent/FetchComponent';
import { loadUserData } from '../../components/CookieUtils/SecureLocalStorageExtends';

const CompleteGuest = ()  => {
  const [ test, setTest ] = useState(loadUserData("myTests")); // [tid, number]

  const handleShareTest = () => {
    HandleLogin({
      assertLogin: true,
      onLoginSuccess: () => {
        if (test === null || test === undefined) {
          TryFetch("my_tests", "GET", {}, (data) => {
            setTest(data);
            if (data.epa === null || data.epa === undefined) {
              alert("진행중인 테스트가 없습니다.");
            } else {
              testShareUrl(data.epa[0], data.epa[2]);
            }
          });
        } else {
          if (test.epa)
            testShareUrl(test.epa[0], test.epa[2]);
          else
            alert("진행중인 테스트가 없습니다.");
        }
      }
    });
  };

  const testShareUrl = (tid, nickname) => {
    if (navigator.share) {
      navigator.share({
        title: 'SHIFT',
        text: nickname + '님의 MZ 자기객관화 테스트',
        url: 'https://shift2me.com/guest/' + tid,
      });
    } else {
      alert('공유하기 기능을 지원하지 않는 브라우저입니다.');
    }
  }

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SHIFT',
        text: 'MZ 자기객관화 테스트',
        url: 'https://shift2me.com',
      });
    } else {
      alert('공유하기 기능을 지원하지 않는 브라우저입니다.');
    }
  };
  
  return (
    <div id="Container" className="cgContainer">
      <div className="cgImgWrapper">
        <img src={CompleteImoji} alt="checked img"/>
        <span>완료되었습니다! </span>
      </div>
      <div className="cgInfoWrapper">
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle">
            <span>수치로 확인하는 자기객관성</span>
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
            <span>나를 어떻게 생각할까?</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg2} alt="boxImg" />
          </div>
          <div className="shInfoBoxMainTitle">
            <span>친구에게 공유하기</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle">
            <span>내가 아는 나 vs 남이 아는 나</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg3} alt="boxImg" />
          </div>
          <div className="shInfoBoxMainTitle">
            <span>체계적 자기객관화</span>
          </div>
        </div>
        <div className="cgInfoBox">
          <div className="cgInfoBoxSubTitle">
            <span>간단한 5분 테스트</span>
          </div>
          <div className="cgInfoBoxImg">
            <img src={cgImg4} alt="boxImg" />
          </div>
          <div className="shInfoBoxMainTitle">
            <span>무료 테스트</span>
          </div>
        </div>
      </div>
      <Link to="/">
        <Button color="#9C76AC" width={16} height={2.5} className="cgLinkBtn">
          <span>나도 검사하기</span>
        </Button>
      </Link>
      <div className="cgShareLink">
        <Button color="#F5F5F5" width={9.66} height={1.9} className="cgShareLinkBtn" onClick={handleShareLink}>
          <img src={shareImg} alt="shareImg"/>
          <span>테스트 공유하기</span>
        </Button>
        <Button color="#F5F5F5" width={9.66} height={1.9} className="cgShareLinkBtn" onClick={handleShareTest}>
          <img src={shareImg} alt="shareImg"/>
          <span>설문링크 공유하기</span>
        </Button>
      </div>
    </div>
  )
};

export default CompleteGuest;