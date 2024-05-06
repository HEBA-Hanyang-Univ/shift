import React from "react";
import ResultStatisticSectionOne from "../../../components/ResultMZTab/ResultStatisticTab/ResultStatisticSectionOne";
import ResultStatisticSectionTwo from "../../../components/ResultMZTab/ResultStatisticTab/ResultStatisticSectionTwo";

const ResultStatistic = () => {

  return (
    <div id="Container" className="rstContainer">
      <div className="rstWrapper">
        <ResultStatisticSectionOne />
        <ResultStatisticSectionTwo />
      </div>
    </div>
  )
}

export default ResultStatistic;