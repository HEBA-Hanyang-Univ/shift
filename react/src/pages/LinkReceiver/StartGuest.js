import React, {useEffect, useState} from "react";
import "../../assets/styles/LinkReceiver/StartGuest.scss";
import { Button } from "../../components/Button/Button";
import { LandingGuest } from "./LandingGuest";
import { Link, useParams, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import TryFetch from "../../components/FetchComponent/FetchComponent";

const StartGuest = () => {
  const { tid } = useParams();
  const navigate = useNavigate();

  // 랜딩페이지
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let alertMsg = "";
    if (tid === undefined || tid === null) {
      alertMsg = "잘못된 접근입니다.";
    } else if (secureLocalStorage.getItem("tid") === tid) {
      alertMsg = "자기 자신의 테스트는 응답할 수 없습니다.";
    }
    if (alertMsg !== "") {
      alert(alertMsg);
      navigate("/");
      return;
    }

    TryFetch(`epa_test_reply/${tid}`, "GET", {}, (data) => {
      const test = {};
      test["tid"] = tid;
      test["nickname"] = data["nickname"];
      test["keyword_myself"] = data["keyword_myself"];
      test["keyword_want"] = data["keyword_want"];
      test["keyword_others"] = data["keyword_others"];
      secureLocalStorage.setItem("epa_test", test);

      setUsername(data["nickname"]);
      setTotal(data["total_num"]);
    }, (error) => {
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    });

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
          <span className="sgTitlePurple">{username}</span>
        </div>
        <div className="sgButtonWrapper">
          <Link to={`/guest/info/${tid}`}>
            <Button gradient="180deg, #9C76AC 0%, #AC86BD 100%" width={9.7} height={4} className="sgStartBtn">
              <span>응답하기</span>
            </Button>
          </Link>
          <span className="sgBtnSpan">지금까지 {total}명이 참여했어요!</span>
        </div>          
      </div> 
      <div className="sgFooter">
        <span>평균 소요시간 : 2분</span>
      </div>
    </div>
  )
};

export default StartGuest;