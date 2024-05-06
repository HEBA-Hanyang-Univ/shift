import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tab } from "../../components/Tab/Tab";
import "../../assets/styles/Result/Result.scss";
import TryFetch from "../../components/FetchComponent/FetchComponent";
import ResultSummary from "./MZTabContent/ResultSummary";
import ResultDetail from "./MZTabContent/ResultDetail";
import ResultStatistic from "./MZTabContent/ResultStatistic";

const Result = () => {
  const { tid } = useParams();
  const navigate = useNavigate();
  const [ data, setData ] = useState({});

  const tabList = [
    { name: '결과 요약', content: <ResultSummary /> },
    { name: '자세히 보기', content: <ResultDetail />},
    { name: '응답자 통계', content: <ResultStatistic />}
  ]; 

  useEffect(() => {
    TryFetch("/result/epa", "GET", {}, (data) => {
      if (!data["replies"] || data["replies"].length < 3) {
        alert("비정상적인 접근입니다.");
        navigate("/");
        return;
      }
      console.log(data);
    }, (error) => {
      console.log(error);
    }); 
  }, []);

  return (
    <div id="Container" className="resultContainer">
      <div className="resultContent">
        {/* Todo : make Tab more reusable */}
        <Tab tabList={tabList}/>
      </div>
    </div>
  );
} 

export default Result;