import React from "react";
import "../../../assets/styles/Result/Result.scss";
import  ResultSummarySectionOne from "../../../components/ResultMZTab/ResultSummaryTab/ResultSummarySectionOne";
import ResultSummarySectionTwo from "../../../components/ResultMZTab/ResultSummaryTab/ResultSummarySectionTwo";
import ResultSummarySectionThree from "../../../components/ResultMZTab/ResultSummaryTab/ResultSummarySectionThree";

const ResultSummary = ({ data }) => {
  // const { username, percentage, correctKeywords, typeOfUser, descriptionSentences } = data;

  return (
    <div id="Container" className="rsContainer">
      <div className="rsWrapper">
        {/* From Title to selected keywords */}
        <ResultSummarySectionOne
          // username={username}
          // correctKeywords={correctKeywords}
          // percentage={percentage}
        />
        {/* From type of user and graph */}
        <ResultSummarySectionTwo
          // username={username}
          // typeOfUser={typeOfUser}       
        />
        {/* OneLineDescription  */}
        <ResultSummarySectionThree
          // username={username}
          // descriptionSentences={descriptionSentences}
        />
      </div>
    </div>
  );  
}

export default ResultSummary;