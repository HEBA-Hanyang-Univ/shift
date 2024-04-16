import React from "react";
import "../../../assets/styles/Result/Result.scss";
import  ResultMZSectionOne from "../../../components/ResultMZ/ResultMZSectionOne";
import ResultMZSectionTwo from "../../../components/ResultMZ/ResultMZSectionTwo";
import ResultMZSectionThree from "../../../components/ResultMZ/ResultMZSectionThree";

const ResultSummary = ({ data }) => {
  const { username, percentage, correctKeywords, typeOfUser, descriptionSentences } = data;

  return (
    <div id="Container" className="rsContainer">
      <div className="rsWrapper">
        {/* From Title to selected keywords */}
        <ResultMZSectionOne
          username={username}
          correctKeywords={correctKeywords}
          percentage={percentage}
        />
        {/* From type of user and graph */}
        <ResultMZSectionTwo
          username={username}
          typeOfUser={typeOfUser}       
        />
        {/* OneLineDescription  */}
        <ResultMZSectionThree username={username}/>
      </div>
    </div>
  );  
}

export default ResultSummary;