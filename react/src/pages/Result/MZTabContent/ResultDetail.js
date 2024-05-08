import React, { useEffect, useState } from "react";
import "../../../assets/styles/Result/Result.scss";
import ResultDetailSectionOne from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionOne";
import ResultDetailSectionTwo from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionTwo";
import ResultDetailSectionThree from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionThree";

import TryFetch from "../../../components/FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../../components/CookieUtils/SecureLocalStorageExtends";

const ResultDetail = ({ data }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [epaKeywords, setEpaKeywords] = useState(loadDataWithExpiration("epa_keywords"));

  useEffect(() => {
    if (!epaKeywords) {
      TryFetch("get_epa_keywords", "GET", {}, (data) => {
        saveDataWithExpiration("epa_keywords", data, 1);
        setEpaKeywords(data);
        setIsLoading(false);
      }, (error) => {});
    } else {
      setIsLoading(false);
    }
  },[]);

  if (isLoading) return null;

  return (
    <div id="Container" className="rdContainer">
      <div className="rdWrapper">
        <ResultDetailSectionOne keywordData={data} />
        <ResultDetailSectionTwo keywordData={data} epaKeywords={epaKeywords} />
        <ResultDetailSectionThree keywordData={data} />
      </div>
    </div>
  )
}

export default ResultDetail;