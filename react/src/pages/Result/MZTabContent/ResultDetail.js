import React from "react";
import "../../../assets/styles/Result/Result.scss";
import ResultDetailSectionOne from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionOne";
import ResultDetailSectionTwo from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionTwo";
import ResultDetailSectionThree from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionThree";


const ResultDetail = ({ data }) => {

  return (
    <div id="Container" className="rdContainer">
      <div className="rdWrapper">
        <ResultDetailSectionOne data={data} />
        <ResultDetailSectionTwo data={data} />        <ResultDetailSectionThree data={data} />
      </div>
    </div>
  )
}

export default ResultDetail;