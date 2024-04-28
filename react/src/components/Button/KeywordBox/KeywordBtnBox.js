import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import "../Button.scss";

export const KeywordBtnBox = ({ keywords, width, height, className, onKeywordClick, selectedKeywords }) => {
  const wordsPerLine = 10;

  // activeButtons: 키워드 버튼의 활성화 여부를 관리하는 상태
  const [activeButtons, setActiveButtons] = useState(
    Object.keys(keywords).reduce((acc, keyword) => ({ ...acc, [keyword]: true }), {})
  );

  // selectedKeywords가 변경될 때마다 activeButtons를 업데이트
  useEffect(() => {
    const updatedActiveButtons = Object.keys(keywords).reduce((acc, keyword) => ({
      ...acc,
      [keyword]:!selectedKeywords.includes(keyword)
    }),{});
    setActiveButtons(updatedActiveButtons);
  }, [selectedKeywords, keywords]);

  // handleClick: 키워드 버튼 클릭 시 실행되는 함수
  const handleClick = (keyword) => {
    if (selectedKeywords.length >= 5 && !selectedKeywords.includes(keyword)) {
      // I know the code below is not good, but I don't know how to fix it....
      alert("키워드는 5개까지 선택 가능합니다.");
      return;
    }
    // 버튼 클릭 핸들러에서 상위 컴포넌트의 onKeywordClick 호출
    onKeywordClick(keyword);
    // 해당 키워드 버튼을 비활성화
    setActiveButtons(prev => ({...prev, [keyword]: !prev[keyword]}));
  };

  const entries = Object.entries(keywords);
  const chunks = [];
  const lines = Math.floor(entries.length / wordsPerLine);
  const remain = entries.length % wordsPerLine;
  for (let i = 0; i < lines; i++) {
    chunks.push(entries.slice(i*wordsPerLine, (i === lines-1)? (i+1)*wordsPerLine+remain : (i+1)*wordsPerLine));
  }

  return (
    <div className="keywordBtnBox">
      {chunks.map((chunk, index) => (
        <div className={`keywordRow keywordRow-${index}`} key={index}>
          {chunk.map(([keyword, value]) => (
          <Button
            width={width}
            height={height}
            className={`${className} ${activeButtons[keyword] ? 'buttonInactive' : 'buttonActive'}`}
            onClick = {() => handleClick(keyword)}
            key={`${index}-${keyword-wordsPerLine*index}`}
          >
            {value[0]}
          </Button>
          ))}
        </div>
      ))}
    </div>
  );
};
