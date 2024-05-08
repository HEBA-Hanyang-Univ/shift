import React, { useEffect, useState } from "react";
import "../../../assets/styles/Result/Result.scss";
import ResultSummarySectionOne from "../../../components/ResultMZTab/ResultSummaryTab/ResultSummarySectionOne";
import ResultSummarySectionTwo from "../../../components/ResultMZTab/ResultSummaryTab/ResultSummarySectionTwo";
import ResultSummarySectionThree from "../../../components/ResultMZTab/ResultSummaryTab/ResultSummarySectionThree";
import TryFetch from "../../../components/FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../../components/CookieUtils/SecureLocalStorageExtends";

const ResultSummary = ({ data }) => {
  const username = data.nickname;
  const [replyKeywords, setReplyKeywords] = useState([]);
  const [descriptionSentences, setDescriptionSentences] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [epaKeywords, setEpaKeywords] = useState(loadDataWithExpiration("epa_keywords"));

  useEffect(() => {
    const oneLineIntro = [];
    const keywordsInOthers = [];
    data.replies.map((reply) => {
      oneLineIntro.push(reply.one_line_intro);
      keywordsInOthers.push(reply.keyword_in_others);
    });
    setDescriptionSentences(oneLineIntro);
    setReplyKeywords(keywordsInOthers);
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
    <div id="Container" className="rsContainer">
      <div className="rsWrapper">
        {/* From Title to selected keywords */}
        <ResultSummarySectionOne
          username={username}
          keywordOthers={data.keyword_others}
          replyKeywords={replyKeywords}
          replyCount={data.replies.length}
          epaKeywords={epaKeywords}
        />
        {/* From type of user and graph */}
        <ResultSummarySectionTwo
          keywordData={data}
          epaKeywords={epaKeywords}
        />
        {/* OneLineDescription  */}
        <ResultSummarySectionThree
          username={username}
          descriptionSentences={descriptionSentences}
        />
      </div>
    </div>
  );  
}

export default ResultSummary;