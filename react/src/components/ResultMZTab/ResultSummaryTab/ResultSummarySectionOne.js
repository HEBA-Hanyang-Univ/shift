import React, { useEffect, useState } from "react"
import "../../../assets/styles/Result/Result.scss";
import Arrow from "../../../assets/images/rangeArrow.png";

const SelfPercentage = [
  [85, 50, 40, 15, 5, 0.3],
  [90, 70, 50, 20, 5, 1],
  [95, 85, 65, 40, 12, 5],
  [100, 95, 80, 55, 35, 10],
]

const ResultMention = [
  "객관적인 눈을 가지셨군요!",
  "가끔 객관적으로 돌아보고 계시는군요",
  "평소에 세상을 아름답게 보고 계시는군요...",
  "이제 그만 깨어나세요! 객관적인 자신을 찾아보세요",
]

const ResultSummarySectionOne = ({ username, replyCount, keywordOthers, replyKeywords, epaKeywords }) => {
  const [rangeWidth, setRangeWidth] = useState(17);

  const uniqueReplyKeywords = [...new Set(replyKeywords.flat())];
  const count = uniqueReplyKeywords.filter((keyword) => keywordOthers.includes(keyword)).length;

  const calPercentage = () => {
    let key;
    if (replyCount < 5) {
      key = 0;
    } else if (replyCount < 10) {
      key = 1;
    } else if (replyCount < 30) {
      key = 2;
    } else {
      key = 3;
    }

    return SelfPercentage[key][count];
  }

  const percentage = calPercentage();

  const getResultMention = () => {
    let key;
    if (count <= 25) {
      key = 0;
    } else if (count <= 50) {
      key = 1;
    } else if (count <= 75) {
      key = 2;
    } else {
      key = 3;
    }
    return ResultMention[key];
  }

  const matchedKeywords = [];
  uniqueReplyKeywords.map((keyword) => {
    matchedKeywords.push(epaKeywords[keyword]);
  });

  useEffect(() => {
    // update rangeWidth based on media query
    const updateRangeWidth = () => {
      if (window.matchMedia("(max-width: 300px)").matches) {
        setRangeWidth(14);
      } else {
        setRangeWidth(17);
      }
    };

    // add event listener for window resize
    updateRangeWidth();
    window.addEventListener("resize", updateRangeWidth);

    // remove event listener when component unmounts
    return () => window.removeEventListener("resize", updateRangeWidth);
   }, []); // empty dependency array to run only once

   const arrowWidth = 0.6;
   const marginLeft = (rangeWidth - arrowWidth) * (percentage / 100);
   
  return(
    <div className="rsSectionOne"> 
      <div className="rsSectionOneTitle">
        <span>MZ 자기객관화 테스트 결과</span>
      </div>
      <div className="rsSectionOneSubTitle">
        <div className="rsSectionOneSubTitleTop">
          <span className="rsosPurple">{username}</span>
          <span className="rsosBlack">&nbsp;님은 </span>
        </div>
        <div className="rsSectionOneSubTitleBottom">
          <span className="rsosBold">자기객관화 상위 {percentage}%</span>
          <span className="rsosGray">&nbsp;입니다.</span>
        </div>
      </div>

      <div className="rsSectionOneRange">
        <div className="percentChart">
          <div className="percentArrow" style={{ marginLeft: `${marginLeft}rem`}}>
            <span style={{fontSize: '0.4rem'}}>{percentage}%</span>
            <img src={Arrow} alt="arrow" style={{width: '0.6rem'}}/>
          </div>
          <div className="percentRange" style={{width : `${rangeWidth}rem`}}></div>
        </div>
      </div>
      <div className="rsSectionOneResultBox">
        <div className="rsSectionOneResultTitle">
          <span className="rsorResultTitle">
            {getResultMention()}
          </span>
          <span className="rsorResultSubTitle">
            총 {replyCount}개의 응답에서 예측한 {keywordOthers.length}개의 키워드 중
            <br/>
            {count}개를 맞췄습니다!
          </span>
        </div>
        <div className="rsSectionOneResultKeywordBox">
          {matchedKeywords.filter(keyword=>keyword!==undefined).map((keyword, index) => (
            <div 
              key={index} 
              className="rsorKeyword"
            >
              <span>{keyword[1]} {keyword[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default ResultSummarySectionOne;