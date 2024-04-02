import React, { useState } from "react";
import { ResultSummary } from "../../pages/Result/ResultSummary";
import "./Tab.scss";

export const Tab = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabList = [
    { name: '결과 요약', content: <ResultSummary /> },
    { name: '자세히 보기', content: <div>상세 결과</div> },
    { name: '응답자 통계', content: <div>준비중입니다.</div> }
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