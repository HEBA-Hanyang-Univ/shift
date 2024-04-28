import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import { SelectedKeyword } from "../../components/Button/KeywordBox/SelectedKeyword";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import HandleLogin from "../../components/Login/HandleLogin";
import secureLocalStorage from "react-secure-storage";
import TryFetch from "../../components/FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const PerceivedByOthers = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("username");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywords, setKeywords] = useState({});

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

  const saveSelectedKeyword = () => {
    const testData = secureLocalStorage.getItem("epa_test");
    testData.keyword_others = selectedKeywords;
    TryFetch("save_epa", "POST", testData, (data) => {
      secureLocalStorage.setItem("tid", data.tid);
    }, (error) => {
      alert("저장하는데 실패했습니다: ", error);
      navigate("/");
    });
    secureLocalStorage.removeItem("epa_test");
    secureLocalStorage.removeItem("epa_keywords");
  }

  useEffect(() => {
    HandleLogin({
      assertLogin: true,
    });
    const testInfo = secureLocalStorage.getItem("epa_test");
    if (!testInfo) {
      alert("비정상적인 접근입니다.");
      navigate("/");
      return;
    }
    setUsername(testInfo.nickname);

    let epa_keywords = loadDataWithExpiration("epa_keywords");
    if (epa_keywords === null) {
      TryFetch("get_epa_keywords", "GET", {}, (data) => {
        saveDataWithExpiration("epa_keywords", data, 720);
        epa_keywords = data;
      }, (error) => {
        alert("키워드를 불러오는데 실패했습니다.");
        navigate("/");
        return;
      });
    }
    setKeywords(epa_keywords);
  }, []);

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
        keywords={keywords}
        selectedKeywords={selectedKeywords}
        onKeywordClick={handleKeywordClick}
      />
      <div className="idSelectedKeywordContainer">
        <SelectedKeyword
          originalKeyword={keywords}
          selectedKeywords={selectedKeywords}
          removeKeyword={removeKeyword} 
        />
      </div>
      <GuestFooter
        prevPageUrl={"/host/aspiration"}
        nextPageUrl={"/host/completion"}
        isNextEnabled={selectedKeywords.length === 5}
        doBeforeNext={saveSelectedKeyword}
      />
    </div>
  )
};

export default PerceivedByOthers;