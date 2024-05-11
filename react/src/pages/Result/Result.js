import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tab } from "../../components/Tab/Tab";
import "../../assets/styles/Result/Result.scss";
import TryFetch from "../../components/FetchComponent/FetchComponent";
import ResultSummary from "./MZTabContent/ResultSummary";
import ResultDetail from "./MZTabContent/ResultDetail";
import ResultStatistic from "./MZTabContent/ResultStatistic";

const Result = () => {
  const navigate = useNavigate();
  const [ data, setData ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);

  const [tabList, setTabList] = useState([]);

  useEffect(() => {
    TryFetch("result/epa", "GET", {}, (data) => {
      if (!data["replies"] || data["replies"].length < 3) {
        alert("비정상적인 접근입니다.");
        navigate("/");
        return;
      }
      setTabList([
        { name: '결과 요약', content: <ResultSummary data={data}/> },
        { name: '자세히 보기', content: <ResultDetail data={data}/>},
        { name: '응답자 통계', content: <ResultStatistic data={data}/>}
      ]);
      setIsLoading(false);
    }, (error) => {
      console.log(error);
    }); 
  }, []);

  // when data is not loaded yet, render nothing
  if (isLoading) return null;

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