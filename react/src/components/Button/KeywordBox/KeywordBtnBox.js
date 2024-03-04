import React from "react";
import { Button } from "../Button";
import "../Button.scss";

export const KeywordBtnBox = ({ keywords, color, width, height, className, onKeywordClick }) => {

  return (
    <div className="keywordBtnBox">
      {keywords.map((keywordGroup, index) => (
        <div className={`keywordRow keywordRow-${index}`} key={index}>
          {keywordGroup.map((keyword, subIndex) => (
          <Button
            color={color}
            width={width}
            height={height}
            className={className}
            onClick={() => {onKeywordClick(keyword)}}
            key={`${index}-${subIndex}`}
          >
            {keyword}
          </Button>
          ))}
        </div>
      ))}
    </div>
  );
};
