import React, { useState } from "react";
import "./Tab.scss";

// use Tab component like this
// const Tabs = [{name: '', content: <Component/> }]

export const Tab = ({ tabList, initialTab = 0 }) => {
  const [currentTab, setCurrentTab] = useState(initialTab);

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