import React, { useState, useEffect } from "react";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import { SelectedKeyword } from "../../components/Button/KeywordBox/SelectedKeyword";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import { useKeywords } from "../../assets/data/MZ/KeywordsProvider";
import secureLocalStorage from "react-secure-storage";

const MyAspiration = () => {
  const { keywords } = useKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [disabledKeywords, setDisabledKeywords] = useState([]); 

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

  // 데이터 불러오기
  useEffect(() => {
    try {
      // 사용자 정보 불러오기
      const userInfoStr = secureLocalStorage.getItem("userInfo");
      if (userInfoStr && typeof userInfoStr === "string") {
        const userInfo = JSON.parse(userInfoStr);
        setUsername(userInfo.nickname);
      }

      // 선택된 키워드 불러오기
      const keywordMyselfStr = secureLocalStorage.getItem("keywordMyself");
      if(keywordMyselfStr) {
        const keywordMyself = JSON.parse(keywordMyselfStr);
        setDisabledKeywords(keywordMyself);
      }
    } catch (error) {
      console.error("데이터 파싱 중 오류 발생:", error);
    }
  }, []);

  const saveSelectedKeywords = () => {
    secureLocalStorage.setItem("keywordWant", JSON.stringify(selectedKeywords));
    // 저장 시 콘솔에 로그 출력
    console.log("Selected Keywords Saved:", selectedKeywords);
  };

  const handleKeywordClick = (keyword) => {
    if(disabledKeywords.includes(keyword)) {
      return;
    }
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
        disabledKeywords={disabledKeywords}
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
        onClickNext={saveSelectedKeywords}
      />
    </div>
  )
};

export default MyAspiration;
