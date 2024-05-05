import React, { useState } from "react";
import ResultSummary from "../../pages/Result/MZTabContent/ResultSummary";
import ResultDetail from "../../pages/Result/MZTabContent/ResultDetail";
import ResultStatistic from "../../pages/Result/MZTabContent/ResultStatistic";
import "./Tab.scss";

export const Tab = ({ data }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabList = [
    { name: '결과 요약', content: <ResultSummary data={data} /> },
    // TODO : meterValues 받아오기
    { name: '자세히 보기', content: <ResultDetail data={data}/>},
    { name: '응답자 통계', content: <ResultStatistic />}
  ]; 

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className="tabContainer">
      <div className="tabWrapper">
        <div className="tabMenu">
          {tabList.map((tab, index) => (
            <div
              key={index}
              className={index === currentTab ? "selectedTab" : "tab"}
              onClick={() => selectMenuHandler(index)}
            >
              <span>{tab.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="tabContent">
        {tabList[currentTab].content}
      </div>
    </div>
  );
}