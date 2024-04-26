import React from "react";
import { KeywordBtnBox } from "./KeywordBtnBox";
import "../Button.scss";

export const KeywordBtnBoxContainer = ({keywords, selectedKeywords, onKeywordClick, disabledKeywords}) => {
  return (
    <div className="keywordBoxContainer">
      <div className="keywordBox">  
        <KeywordBtnBox 
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          color="#FFF" 
          onKeywordClick={onKeywordClick}
          disabledKeywords={disabledKeywords}
        />
      </div>
    </div> 
  )
}