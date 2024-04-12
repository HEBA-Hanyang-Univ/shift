import React from "react";
import { Tab } from "../../components/Tab/Tab";
import "../../assets/styles/Result/Result.scss";

const Result = () => {
  return (
    <div id="Container" className="resultContainer">
      <div className="resultContent">
        <Tab />
      </div>
    </div>
  );
} 

export default Result;