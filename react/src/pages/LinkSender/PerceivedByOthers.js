import React, { useState, useEffect } from "react";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import { SelectedKeyword } from "../../components/Button/KeywordBox/SelectedKeyword";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import { useKeywords } from "../../assets/data/MZ/KeywordsProvider";
import secureLocalStorage from "react-secure-storage";

const PerceivedByOthers = () => {
  const { keywords } = useKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // 데이터에 들어가도록 가공
  // keywords에서 0번째 요소만 추출
  const processKeywords = (keywords) => {
    const keywordZeroIndex = Object.values(keywords).map(arr => arr[0]);
    const groupSize = Math.ceil(keywordZeroIndex.length / 4);
    return Array.from({ length: 4 }, (_, i) => 
      keywordZeroIndex.slice(i * groupSize, i * groupSize + groupSize)
    );
  };

  const keywordList = processKeywords(keywords);

  const [username, setUsername] = useState("username");


  useEffect(() => {
    const userInfoStr = secureLocalStorage.getItem("userInfo");
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      setUsername(userInfo.nickname);
    }
  }, []);

  const saveSelectedKeywords = () => {
    secureLocalStorage.setItem("keywordOthers", JSON.stringify(selectedKeywords));
    // 저장 시 콘솔에 로그 출력
    console.log("Selected Keywords Saved:", selectedKeywords);
  };

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
          <span className="idTitleSpan" style={{paddingRight: '0.2rem'}}>다른 사람들이</span>
          <span className="idTitleUserName"> {username}</span>
          <span className="idTitleSpan">님에 대해</span>
        </div>
        <div className="idTitleBottom">
          <span>고를 것 같은 키워드 5개를 선택해 주세요.</span>
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
        prevPageUrl={"/host/aspiration"}
        nextPageUrl={"/host/completion"}
        isNextEnabled={selectedKeywords.length === 5}
        onClickNext={saveSelectedKeywords}
      />
    </div>
  )
};

export default PerceivedByOthers;