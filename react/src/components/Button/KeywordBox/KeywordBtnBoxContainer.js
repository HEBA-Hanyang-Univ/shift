import React from "react";
import { KeywordBtnBox } from "./KeywordBtnBox";
import "../Button.scss";

export const KeywordBtnBoxContainer = ({keywords, selectedKeywords, onKeywordClick}) => {
  return (
    <div className="keywordBoxContainer">
      <div className="keywordBox">  
        <KeywordBtnBox 
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          color="#FFF" 
          width={6.97} 
          height={4.8}
          className="keywordBtn"  
          onKeywordClick={onKeywordClick}
        />
      </div>
    </div> 
  )
}