import React from "react";
import { KeywordBtnBox } from "./KeywordBtnBox";
import "../Button.scss";

export const KeywordBtnBoxContainer = ({keywords, onKeywordClick}) => {
  return (
    <div className="keywordBoxContainer">
      <div className="keywordBox">  
        <KeywordBtnBox 
          keywords={keywords}
          color="#FFF" 
          width={5.1} 
          height={3.51}
          className="keywordBtn"  
          onKeywordClick={onKeywordClick}
        />
      </div>
    </div> 
  )
}