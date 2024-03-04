import React from "react";
import { KeywordBtnBox } from "./KeywordBtnBox";
import "../Button.scss";

export const KeywordBoxContainer = ({keywords, onKeywordClick}) => {
  return (
    <div className="keywordBoxContainer">
      <div className="keywordBox">  
        <KeywordBtnBox 
          keywords={keywords}
          color="#FFF" 
          width={5.2} 
          height={3.2}
          className="keywordBtn"  
          onKeywordClick={onKeywordClick}
        />
      </div>
    </div> 
  )
}