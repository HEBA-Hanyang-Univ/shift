import React, { useState } from "react"
import "../../assets/styles/Result/Result.scss";
import Arrow from "../../assets/images/rangeArrow.png";

const ResultMZSectionOne = ({ username, correctKeywords, percentage }) => {

  const arrowWidth = 0.6; // 화살표 너비
  const rangeWidth = 17;
  const marginLeft = (rangeWidth - arrowWidth) * (percentage / 100); // 화살표 위치 계산

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
          <span className="rsosBold">자기객관화 상위 5%</span>
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
          {correctKeywords.map((keyword, index) => (
            <div 
              key={index} 
              className="rsorKeyword"
            >
              <span>{keyword}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default ResultMZSectionOne;