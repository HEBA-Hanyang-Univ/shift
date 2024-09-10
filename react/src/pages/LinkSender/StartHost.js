import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/LinkSender/StartHost.scss";
import { Button } from '../../components/Button/Button.js';
import { MainFooter } from '../../components/Footer/MainFooter.js';
import TRO from "../../assets/images/TRO.png";
import TryFetch from "../../components/FetchComponent/FetchComponent.js";
import HandleLogin from "../../components/Login/HandleLogin.js";
import { saveDataWithExpiration, loadDataWithExpiration, loadUserData } from "../../components/CookieUtils/SecureLocalStorageExtends.js";
import { ShareTestUrl, ShareNavigator } from "../../components/Share/ShareComponent.js";


const StartHost = () => {
  const [ totalNum, setTotalNum ] = useState(0);
  const [ test, setTest ] = useState(loadUserData("myTests")); // [tid, number]
  const [ canSeeResult, setCanSeeResult ] = useState(test ? true : false);

  const [gradientValue, setGradientValue] = useState(0);
  const [increase, setIncrease] = useState(true);

  const navigate = useNavigate();

  const handleStart = () => {
    HandleLogin({
      assertLogin: true,
      navigate: navigate,
      toWhere: "/host/info",
      onLoginSuccess: () => {
        TryFetch("my_tests", "GET", {}, (data) => {
          setTest(data);
          if (data.epa) {
            alert("이미 진행중인 테스트가 있습니다. 진행을 완료하시면 기존 테스트를 삭제합니다.");
          }
        });
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
        TryFetch("my_tests", "GET", {}, (data) => {
          setTest(data);
          if (data.epa === null || data.epa === undefined) {
            alert("진행중인 테스트가 없습니다.");
          } else {
            ShareTestUrl({tid:data.epa[0], nickname: data.epa[2]});
          }
        });
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
      return;
    }

    let t = loadUserData("myTests");
    if (t) {
      setTest(t);
      return;
    }
    TryFetch("my_tests", "GET", {}, (data) => {
      if (data.epa !== null && data.epa !== undefined) {
        setTest(data);
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
    <div id="Container">
      <div className="shWrapper">
        <div className="shTitle">
          <span>남이 보는 나는 어떨까?</span>
        </div>
        <div className="shContentBox">
          <div className="shContentTitle">
            <span>결과페이지 미리보기</span>
          </div>
          <div className="shContent">
            {/* <img src={TRO} alt="main img"/> */}
          </div>
        </div>
        <div className="shFooter">
          <Button 
            onClick={handleStart} 
            className="shButton"
            color={"#9C76AC"}
          >
            <span>시작하기</span>
          </Button>
          <div className="shFooterText">
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #CFC8D2 0%, #9C76AC " + gradientValue + "%, #CFC8D2 100%)"
              }}
            >
              지금까지 {totalNum.toLocaleString()} 명이 참여했어요!
            </span>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default StartHost;
