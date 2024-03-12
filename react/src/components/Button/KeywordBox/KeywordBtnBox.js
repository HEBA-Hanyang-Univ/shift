import React, { useState } from "react";
import { Button } from "../Button";
import "../Button.scss";

export const KeywordBtnBox = ({ keywords, color, width, height, className, onKeywordClick }) => {

  const [activeButtons, setActiveButtons] = useState(
    keywords.flat().reduce((acc, keyword) => ({ ...acc, [keyword]: true }), {})
  );

  const handleClick = (keyword) => {
    // 버튼 클릭 핸들러에서 상위 컴포넌트의 onKeywordClick 호출
    onKeywordClick(keyword);
    // 해당 키워드 버튼을 비활성화
    setActiveButtons(prev => ({ ...prev, [keyword]: false }));
  };

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
            onClick={() => activeButtons[keyword] && handleClick(keyword)}
            key={`${index}-${subIndex}`}
            disabled={!activeButtons[keyword]}
          >
            {keyword}
          </Button>
          ))}
        </div>
      ))}
    </div>
  );
};
