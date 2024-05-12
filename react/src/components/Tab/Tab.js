import React, { useEffect, useState } from "react";
import "./Tab.scss";

// use Tab component like this
// const Tabs = [{name: '', content: <Component/> }]

export const Tab = ({ tabList, initialTab = 0 }) => {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [scrollInto, setScrollInto] = useState(0);

  const selectMenuHandler = (index) => {
    window.scrollTo(0, 0);
    setScrollInto(0);
    setCurrentTab(index);
  };

  const focusImmediately = (index, subIndex = 0) => {
    window.scrollTo(0, 0);
    setScrollInto(subIndex);
    setCurrentTab(index);
  }

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
        {React.cloneElement(tabList[currentTab].content, { scrollInto: scrollInto, setCurrentTab: focusImmediately })}
      </div>
    </div>
  );
}