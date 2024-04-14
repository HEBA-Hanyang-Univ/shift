import React, { useState } from "react";
import "../../../assets/styles/Result/Result.scss";
import  ResultMZSectionOne from "../../../components/ResultMZ/ResultMZSectionOne";
import ResultMZSectionTwo from "../../../components/ResultMZ/ResultMZSectionTwo";
import ResultMZSectionThree from "../../../components/ResultMZ/ResultMZSectionThree";

//dummy data
const correctKeywords = ["이성적인", "아이스 아메리카노", "밥을 잘 사주는 이쁜", "행복한", "똑똑한"];

export const ResultSummary = () => {
  // TODO : username 받아오기
  const [username, setUsername] = useState("username");

  // TODO : 상위 % 여부 props 전달(SectionOne)

  // TODO : 맞춘 키워드 갯수 props 전달(SectionOne)


  return (
    <div id="Container" className="rsContainer">
      <div className="rsWrapper">
        {/* From Title to selected keywords */}
        <ResultMZSectionOne username={username} correctKeywords={correctKeywords} percentage={10}/>
        {/* From type of user and graph */}
        <ResultMZSectionTwo username={username}/>
        {/* OneLineDescription  */}
        <ResultMZSectionThree username={username}/>
      </div>
    </div>
  );  
}