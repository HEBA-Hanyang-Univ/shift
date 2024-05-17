import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/LinkSender/StartHost.scss";
import { Button } from '../../components/Button/Button.js';
import { MainFooter } from '../../components/Footer/MainFooter.js';
import shImg1 from "../../assets/images/StartHost/shImg1.png";
import shImg2 from "../../assets/images/StartHost/shImg2.png";
import shImg3 from "../../assets/images/StartHost/shImg3.png";
import shImg4 from "../../assets/images/StartHost/shImg4.png";
import shareImg from "../../assets/images/StartHost/shareImg.svg";
import TryFetch from "../../components/FetchComponent/FetchComponent.js";
import HandleLogin from "../../components/Login/HandleLogin.js";
import { saveDataWithExpiration, loadDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends.js";
import { ShareTestUrl, ShareNavigator } from "../../components/Share/ShareComponent.js";


const StartHost = () => {
  const [ totalNum, setTotalNum ] = useState(0);
  const [ test, setTest ] = useState(loadDataWithExpiration("myTests")); // [tid, number]
  const [ canSeeResult, setCanSeeResult ] = useState(false);

  const [gradientValue, setGradientValue] = useState(0);
  const [increase, setIncrease] = useState(true);

  const navigate = useNavigate();

  const handleStart = () => {
    HandleLogin({
      assertLogin: true,
      navigate: navigate,
      toWhere: "/host/info",
      onLoginSuccess: () => {
        if (test && test.epa !== null && test.epa !== undefined) {
          alert("이미 진행중인 테스트가 있습니다. 기존 테스트를 삭제합니다.");
        }
      }
    });
  };

  const handleResult = () => {
    HandleLogin({
      assertLogin: true,
      navigate: navigate,
      toWhere: "/result/dashboard"
    });
  };

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
              ShareTestUrl(data.epa[0], data.epa[2]);
            }
          });
        } else {
          if (test.epa)
            ShareTestUrl(test.epa[0], test.epa[2]);
          else
            alert("진행중인 테스트가 없습니다.");
        }
      }
    });
  };

  useEffect(() => {
    const before = loadDataWithExpiration("totalNum");
    if (before !== null) {
      setTotalNum(before);
    } else {
      TryFetch("total_num", "GET", {}, (data) => {
        saveDataWithExpiration("totalNum", data.total_num, 1);
        setTotalNum(data.total_num);
      });
    }

    if (test) {
      setCanSeeResult(true);
    } else {
      TryFetch("my_tests", "GET", {}, (data) => {
        setTest(data);
        if (data.epa !== null && data.epa !== undefined) {
          setCanSeeResult(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (increase) {
        setGradientValue((prevValue) => prevValue + 1);
        if (gradientValue >= 100) {
          setIncrease(false);
        }
      } else {
        setGradientValue((prevValue) => prevValue - 1);
        if (gradientValue <= 0) {
          setIncrease(true);
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [increase, gradientValue]);


  return (
    <>
      <div id="Container" className="shContainer">
        <div className="shWrapper">
          <div className="shTitleWrapper">
            <span className="shTitleS">다른 사람이 보는 나</span>
            <span className="shTitleM">MZ 자기객관화 테스트</span>
          </div>
          <div className="shBoxWrapper">
            <div className="shBox">
              <div className="shBoxSubTitle">
                <span>수치로 확인하는 자기 객관성</span>
              </div>
              <div className="shBoxImg">
                <img src={shImg1} alt="boxImg"/>
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
                <img src={shImg2} alt="boxImg"/>
              </div>
              <div className="shBoxMainTitle">
                <span>친구에게 공유하기</span>
              </div>
            </div>
            <div className="shBox">
              <div className="shBoxSubTitle">
                <span>내가 아는 나 vs 남이 아는 나</span>
              </div>
              <div className="shBoxImg">
                <img src={shImg3} alt="boxImg"/>
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
                <img src={shImg4} alt="boxImg"/>
              </div>
              <div className="shBoxMainTitle">
                <span>무료 테스트</span>
              </div>
            </div>
          </div>
          <div className="shUserCount">
            <span className="shButtonSpanS" style={{
              fontWeight: "700",
              backgroundImage: "linear-gradient(90deg, #CFC8D2 0%, #9C76AC " + gradientValue + "%, #CFC8D2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"}}>지금까지 {totalNum.toLocaleString()} 명이 참여했어요!</span>
          </div>
          <div className="shButtonContainer">
            <Button onClick={handleStart}className="shButtonL" color="#9C76AC" width={19.7} height={3.4}>
              <span className="shButtonSpanL" style={{paddingTop: '0.2rem'}}>시작하기</span>
            </Button>
            <Button onClick={handleResult} className="shButtonL" color={canSeeResult ? "#A192C5" : "#F3F3F3"} width={19.7} height={3.4}>
              <span className="shButtonSpanL">결과 확인하기</span>
            </Button>
            <div className="shShareButtonWrapper">
              <Button onClick={() => ShareNavigator('SHIFT', 'MZ 자기객관화 테스트', 'https://shift2me.com')} className="testButton" color="#F5F5F5" width={9.2} height={2}>
                <img src={shareImg} alt="share img"></img>
                <span>테스트 공유하기</span>
              </Button>
              <Button onClick={handleShareTest} className="testButton" color="#F5F5F5" width={9.2} height={2}>
                <img src={shareImg} alt="share img"></img>
                <span>설문 링크 공유하기</span>
              </Button>
            </div>
          </div>
          <div className="shFooter">
          </div>
        </div>
        <MainFooter/>
      </div>
    </>
  );
};

export default StartHost;
