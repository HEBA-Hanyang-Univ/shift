import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import MZImg from "../../assets/images/Result_MZ.png";
import "./ResultDashBoardBox.scss";

export const ResultDashBoardBox = ({ tid, number }) => {
  const navigate = useNavigate();


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

  const onClickCheckResult = () => {
    if (number < 3) {
      alert("3명 이상의 응답자가 응답을 완료해야 결과를 확인할 수 있습니다.");
    } else {
      navigate("/result/detail/");
    }
  }

  const getColor = (number) => {
    if (number < 1) {
      return "rgba(239, 239, 239, 1)";
    } else if (number < 2) {
      return "rgba(205, 205, 205, 1)";
    } else {
      return "rgba(148, 148, 148, 1)";
    }
  }

  const getNumberString = (number) => {
    if (number >= 3) {
      return number;
    } else {
      return number + " / 3";
    }
  }

  return (
    <div className="rdbbContainer">
      <div className="rdbbWrapper">
        <div className="rdbbContentWrapper">
          <div className="rdbbContentLeft">
            <div className="rdbbContentTitle">
              <span>MZ 자기객관화 테스트</span>
            </div>
            <div className="rdbbContentSubTitle">
              <span style={number >= 3 ? {
                background: "linear-gradient(90deg, #825595 -23.48%, #9C76AC 37%, #C292D6 122.26%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              } : {color: getColor(number)}}>응답자 수 &nbsp;&nbsp;&nbsp;</span>
              <span style={number >= 3 ? {
                background: "linear-gradient(90deg, #C79DD9 -23%, #9C76AC 95.9%, #6E5678 127.5%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              } : {color: getColor(number)}}>{getNumberString(number)}</span>
            </div>
          </div>
          <div className="rdbbContentRight">
            <img src={MZImg} alt="MZImg"/>
          </div>
        </div>
        <div className="rdbbBoxBtnWrapper">
          <Button
            onClick={onClickCheckResult}
            width={7.2}
            height={1.85}
            className="rdbbPurpleBtn"
            color={number >= 3 ? "#9C76AC" : "#D3D3D3"}
          >
            <span>결과 확인하기</span>  
          </Button>
          
          <Button
            onClick={() => testShareUrl(tid)}
            width={7.2}
            height={1.85}
            className="rdbbWhiteBtn"
            color={"#A192C5"}
            >
              <span>테스트 링크 공유</span>
            </Button>
        </div>
      </div>
    </div>
  )

};