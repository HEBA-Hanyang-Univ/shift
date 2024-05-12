import React, { useEffect, useRef, useState } from "react";
import "../../../assets/styles/Result/Result.scss";
import ResultDetailSectionOne from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionOne";
import ResultDetailSectionTwo from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionTwo";
import ResultDetailSectionThree from "../../../components/ResultMZTab/ResultDetailTab/ResultDetailSectionThree";

import TryFetch from "../../../components/FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../../components/CookieUtils/SecureLocalStorageExtends";

const ResultDetail = ({ data, scrollInto }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [epaKeywords, setEpaKeywords] = useState(loadDataWithExpiration("epa_keywords"));

  const [sectionTwoLoaded, setSectionTwoLoaded] = useState(false);
  const [sectionThreeLoaded, setSectionThreeLoaded] = useState(false);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);

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

  useEffect(() => {
    if (scrollInto === 2 && sectionTwoLoaded) sectionTwoRef.current?.scrollIntoView({behavior: "smooth"});
    else if (scrollInto === 3 && sectionThreeLoaded) sectionThreeRef.current?.scrollIntoView({behavior: "smooth"});
  }, [sectionTwoLoaded, sectionThreeLoaded]);

  if (isLoading) return null;

  return (
    <div id="Container" className="rdContainer">
      <div className="rdWrapper">
        <ResultDetailSectionOne keywordData={data} />
        <ResultDetailSectionTwo keywordData={data} epaKeywords={epaKeywords} setLoadStatus={setSectionTwoLoaded} ref={sectionTwoRef}/>
        <ResultDetailSectionThree keywordData={data} setLoadStatus={setSectionThreeLoaded} ref={sectionThreeRef}/>
      </div>
    </div>
  )
}

export default ResultDetail;