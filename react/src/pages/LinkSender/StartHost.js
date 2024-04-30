import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/LinkSender/StartHost.scss";
import { Button } from '../../components/Button/Button.js';
import { MainFooter } from '../../components/Footer/MainFooter.js';
import shImg1 from "../../assets/images/StartHost/shImg1.svg";
import shImg2 from "../../assets/images/StartHost/shImg2.svg";
import shImg3 from "../../assets/images/StartHost/shImg3.svg";
import shImg4 from "../../assets/images/StartHost/shImg4.svg";
import shareImg from "../../assets/images/StartHost/shareImg.svg";
import shFooterImg from "../../assets/images/StartHost/shFooter.svg";
import TryFetch from "../../components/FetchComponent/FetchComponent.js";
import HandleLogin from "../../components/Login/HandleLogin.js";
import { saveDataWithExpiration, loadDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends.js";


const StartHost = () => {
  const [ totalNum, setTotalNum ] = useState(0);
  const [ test, setTest ] = useState(null); // [tid, number]
  const [ canSeeResult, setCanSeeResult ] = useState(false); // [tid, number

  const [gradientValue, setGradientValue] = useState(0);
  const [increase, setIncrease] = useState(true);

  const navigate = useNavigate();

  const handleStart = () => {
    HandleLogin({
      assertLogin: true,
      navigate: navigate,
      toWhere: "/"
    });

    if (test && test.epa !== null && test.epa !== undefined) {
      alert("이미 진행중인 테스트가 있습니다. 기존 테스트를 삭제합니다.");
      navigate("/host/info");
    } else {
      navigate("/host/info");
    }
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
      navigate: navigate,
      toWhere: "/"
    });

    const tid = loadDataWithExpiration("tid");
    if (tid === null || tid === undefined) {
      TryFetch("my_tests", "GET", {}, (data) => {
        if (data.epa === null || data.epa === undefined) {
          alert("진행중인 테스트가 없습니다.");
        } else {
          testShareUrl(data.epa[0]);
        }
      });
    } else {
      testShareUrl(tid);
    }
  };

  const testShareUrl = (tid) => {
    if (navigator.share) {
      navigator.share({
        title: 'SHIFT',
        text: 'MZ 자기객관화 테스트',
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

  useEffect(() => {
    const before = loadDataWithExpiration("totalNum");
    if (before !== null) {
      setTotalNum(before);
      return;
    }

    TryFetch("total_num", "GET", {}, (data) => {
      saveDataWithExpiration("totalNum", data.total_num, 1);
      setTotalNum(data.total_num);
    });

    TryFetch("my_tests", "GET", {}, (data) => {
      setTest(data);
      if (data.epa !== null && data.epa !== undefined && data.epa[1] >= 3) {
        setCanSeeResult(true);
      }
    });
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
            <Button onClick={handleStart}className="shButtonL" gradient="180deg, #9B6EB6 20%, #9361B0 80%" width={19.7} height={3.4}>
              <span className="shButtonSpanL" style={{paddingTop: '0.2rem'}}>시작하기</span>
              {/* TODO: 페이지 디자인 변경하면서 색상 변경하기 */}
              <span className="shButtonSpanS" style={{
                backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #000000 " + gradientValue + "%, #FFFFFF 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"}}>지금까지 {totalNum.toLocaleString()} 명이 참여했어요!</span>
            </Button>
            <Button onClick={handleResult}className="shButtonL" gradient={canSeeResult ? "180deg, #A27DB2 0%, #A570C4 100%" : "180deg, #F1F1F1 0%, #F5F5F5 100%"} width={19.7} height={3.4}>
              <span className="shButtonSpanL">결과 확인하기</span>
            </Button>
            <div className="shShareButtonWrapper">
              <Button onClick={handleShareLink} className="testButton" color="#FFF" width={9.2} height={2}>
                <img src={shareImg} alt="share img"></img>
                <span>테스트 공유하기</span>
              </Button>
              <Button onClick={handleShareTest} className="testButton" color="#FFF" width={9.2} height={2}>
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
    </>
  );
};

export default StartHost;
