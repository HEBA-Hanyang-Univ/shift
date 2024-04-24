import React, { useState } from "react";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import { SelectedKeyword } from "../../components/Button/KeywordBox/SelectedKeyword";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import { useKeywords } from "../../assets/data/MZ/KeywordsProvider";


const MyAspiration = () => {
  const { keywords } = useKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // 데이터에 들어가도록 가공
  // keywords에서 0번째 요소만 추출
  const keywordZeroIndex = Object.values(keywords).map(arr => arr[0]);

  const groupSize = Math.ceil(keywordZeroIndex.length / 4);

  const keywordList = Array.from({ length: 4 }, (_, i) => 
  keywordZeroIndex.slice(i * groupSize, i * groupSize + groupSize)
  );

  const [username, setUsername] = useState("username"); //TODO: 추후 사용자 이름 받아오기

  const handleKeywordClick = (keyword) => {
    // if keyword is already selected, remove it from selectedKeywords
    if(selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword))
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    };
  };
  
  const removeKeyword = (indexToRemove) => {
    setSelectedKeywords(selectedKeywords.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div id="Container" className="miContainer">
      <div className="idTitle">
        <div className="idTitleTop">
          <span className="idTitleUserName">{username}</span>
          <span className="idTitleSpan">님을 나타내지 않지만</span>
        </div>
        <div className="idTitleBottom">
          <span>갖고 싶은 키워드 5개를 선택해 주세요.</span>
        </div>
      </div>
      <KeywordBtnBoxContainer
        keywords={keywordList}
        selectedKeywords={selectedKeywords}
        onKeywordClick={handleKeywordClick}
      />
      <div className="idSelectedKeywordContainer">
        <SelectedKeyword 
          selectedKeywords={selectedKeywords} 
          removeKeyword={removeKeyword}
         />
      </div>
      <GuestFooter 
        prevPageUrl={"/host/identity"} 
        nextPageUrl={"/host/perception"}
        isNextEnabled={selectedKeywords.length === 5}
      />
    </div>
  )
};

export default MyAspiration;
