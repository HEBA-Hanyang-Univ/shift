  import React, { useState, useEffect } from "react";
  import { Button } from "../Button";
  import "../Button.scss";


  export const KeywordBtnBox = ({ keywords, onKeywordClick, selectedKeywords, disabledKeywords }) => {

    KeywordBtnBox.defaultProps = {
      selectedKeywords: [],
      disabledKeywords: []
    };
  
    // activeButtons: 키워드 버튼의 활성화 여부를 관리하는 상태
    const [activeButtons, setActiveButtons] = useState(
      keywords.flat().reduce((acc, keyword) => ({ ...acc, [keyword]: true }), {})
    );

    // selectedKeywords가 변경될 때마다 activeButtons를 업데이트
    useEffect(() => {
      const updatedActiveButtons = keywords.flat().reduce((acc, keyword) => ({
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

    return (
      <div className="keywordBtnWrapper">
        {keywords.map((keywordGroup, index) => (
            <div 
              key={index} 
              className={`keywordRow ${index === 0 ? 'marginFirstRow' : index === 2 ? 'marginThirdRow' : ''}`}
            >
                {keywordGroup.map((keyword, subIndex) => (  
                  <Button
                    width={5.1}
                    height={3.51}
                    className={`keywordBtn ${activeButtons[keyword] ? 'buttonInactive' : 'buttonActive'} ${disabledKeywords.includes(keyword) ? 'buttonDisabled' : ''}`}
                    onClick = {() => handleClick(keyword)}
                    key={`${index}-${subIndex}`}
                    disabled={disabledKeywords.includes(keyword)}
                  >
                    {keyword}
                  </Button>
                ))}
          </div>
        ))}      
      </div>
    );
  };
