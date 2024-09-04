import React, {useEffect, useState} from "react";
import "../../assets/styles/LinkReceiver/StartGuest.scss";
import { Button } from "../../components/Button/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import TryFetch from "../../components/FetchComponent/FetchComponent";
import { saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const StartGuest = () => {
  const { tid } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [total, setTotal] = useState(0);

  const [gradientValue, setGradientValue] = useState(0);
  const [increase, setIncrease] = useState(true);

  useEffect(() => {
    if (tid === undefined || tid === null) {
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    }

    TryFetch("my_tests", "GET", {}, (data) => {
      if (data.epa !== null && data.epa !== undefined) {
        if (data.epa[0] === tid) {
          alert("자기 자신의 테스트는 응답할 수 없습니다.");
          navigate("/");
          return;
        }
      }
    }, (error) => {});

    TryFetch(`epa_test_reply/${tid}`, "GET", {}, (data) => {
      const test = {};
      test["tid"] = tid;
      test["nickname"] = data["nickname"];
      test["keyword_myself"] = data["keyword_myself"];
      test["keyword_want"] = data["keyword_want"];
      test["keyword_others"] = data["keyword_others"];
      saveDataWithExpiration("epa_received_test", test);

      setUsername(data["nickname"]);
      setTotal(data["total_num"]);
    }, (error) => {
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    });

    const timer = setTimeout(() => {
      setGradientValue(0);
      setIncrease(true);
    }, 2000);   // 2초 후에 로딩 상태 변경

    return () => {
      clearTimeout(timer);
    };
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
    <div id="Container" className="sgContainer">
      <div className="sgWrapper">
        <div className="sgTitleWrapper">
          <span className="sgTitleBlack">평소 내가 생각했던</span>
          <span className="sgTitlePurple">{username}</span>
        </div>
        <div className="sgButtonWrapper">
          <Link to={`/guest/info/${tid}`}>
            <Button gradient="180deg, #9C76AC 0%, #AC86BD 100%" width={9.7} height={4} className="sgStartBtn">
              <span>응답하기</span>
            </Button>
          </Link>
          <span className="sgBtnSpan" style={{backgroundImage: "linear-gradient(90deg, #CFC8D2 0%, #9C76AC " + gradientValue + "%, #CFC8D2 100%)"}}>
            지금까지 {total}명이 참여했어요!</span>
        </div>          
      </div> 
      <div className="sgFooter">
        <span>평균 소요시간 : 2분</span>
      </div>
    </div>
  )
};

export default StartGuest;