import React, { useState } from "react";
import "../../assets/styles/LinkReceiver/SelectKeyword.scss";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import { SelectedKeyword } from "../../components/Button/KeywordBox/SelectedKeyword";
import { GuestFooter } from "../../components/Footer/GuestFooter";

// dummy data
const dummyKeywords = [
  ["지혜로운", "옷을 굉장히 잘 입는", "방구를 심히 잘 뀌어버리는", "킹 받는", "밥을 잘 사주는 이쁜", "아는체를 잘하는"], 
  ["마음씨가 고운", "행복한", "버블티", "vkdfld", "항상 감사하고", "응원해주시고"], 
  ["성원해주시고", "자고싶어", "ㅗ", "개강하기 싫은", "무엇을 쓸 지 모르겠는", "이것은"],
  ["더미데이터", "아이스 아메리카노", "기이이이이이인 문장", "키워드", "세 단어만 더", "두 단어만 더"]
]

export const SelectKeyword = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const removeKeyword = (indexToRemove) => {
    setSelectedKeywords(selectedKeywords.filter((_, index) => index !== indexToRemove));
  };

  const handleKeywordClick = (keyword) => {
    if(selectedKeywords.includes(keyword)) {
      return;
    }

    if(selectedKeywords.length < 5) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    } else {
      alert('키워드는 최대 5개까지 선택 가능합니다.');
    }
  }

  const isNextEnabled = selectedKeywords.length === 5;

  return (
  <div id="Container" className="miContainer">
    <div className="idTitle">
      <div className="idTitleTop">
        <span className="idTitleUserName">username</span>
        <span className="idTitleSpan">님을 가장 잘 나타내는</span>
      </div>
      <div className="idTitleBottom">
        <span>키워드 5개를 선택해 주세요.</span>
      </div>
    </div>
    <KeywordBtnBoxContainer
      keywords={dummyKeywords}
      selectedKeywords={selectedKeywords}
      onKeywordClick={handleKeywordClick}
    />
    <div className="idSelectedKeywordWrapper">
      <SelectedKeyword selectedKeywords={selectedKeywords} removeKeyword={removeKeyword} />
    </div>
    <GuestFooter
      prevPageUrl={"/guest/info"} 
      nextPageUrl={"/guest/reasoning"} 
      isNextEnabled={isNextEnabled}
    />
  </div>
  )
};
