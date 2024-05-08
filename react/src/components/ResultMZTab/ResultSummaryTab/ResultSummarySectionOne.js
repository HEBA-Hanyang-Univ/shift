import React, { useEffect, useState } from "react"
import "../../../assets/styles/Result/Result.scss";
import Arrow from "../../../assets/images/rangeArrow.png";

const ResultSummarySectionOne = ({ correctKeywords, percentage }) => {
  const [rangeWidth, setRangeWidth] = useState(17);
  const [username, setUsername] = useState("username");

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
        {/* TODO : 추후 상위 퍼센트 넣기 */}
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
          {/* TODO : 추후 멘트 변경? */}
          <span className="rsorResultTitle">
            객관적인 눈을 가지셨군요!
          </span>
          {/* TODO : 맞춘 갯수 출력 */}
          <span className="rsorResultSubTitle">
            총 4개의 응답에서 예측한 5개의 키워드 중
            <br/>
            3개를 맞췄습니다!
          </span>
        </div>
        <div className="rsSectionOneResultKeywordBox">
          {/* TODO : 맞춘 키워드 받아오기 */}
          {/* {correctKeywords.map((keyword, index) => (
            <div 
              key={index} 
              className="rsorKeyword"
            >
              <span>{keyword}</span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  )
};

export default ResultSummarySectionOne;