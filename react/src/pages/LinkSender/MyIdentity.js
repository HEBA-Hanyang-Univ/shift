import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import { SelectedKeyword } from "../../components/Button/KeywordBox/SelectedKeyword";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import HandleLogin from "../../components/Login/HandleLogin";
import TryFetch from "../../components/FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const MyIdentity = () => {
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
    const testData = loadDataWithExpiration("epa_test");
    testData.keyword_myself = selectedKeywords;
    saveDataWithExpiration("epa_test", testData);
  }

  useEffect(() => {
    HandleLogin({
      assertLogin: true,
    });
    const testInfo = loadDataWithExpiration("epa_test");
    if (!testInfo) {
      alert("비정상적인 접근입니다.");
      navigate("/");
      return;
    }
    setUsername(testInfo.nickname);

    const epa_keywords = loadDataWithExpiration("epa_keywords");
    if (epa_keywords === null) {
      TryFetch("get_epa_keywords", "GET", {}, (data) => {
        saveDataWithExpiration("epa_keywords", data);
        setKeywords(data);
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
          <span className="idTitleUserName">{username}</span>
          <span>님을 가장 잘 나타내는</span>
        </div>
        <div className="idTitleBottom">
          <span>키워드 5개를 선택해 주세요.</span>
        </div>
      </div>
      {keywords && <KeywordBtnBoxContainer
        keywords={keywords}
        selectedKeywords={selectedKeywords}
        onKeywordClick={handleKeywordClick}
      />}
      <div className="idSelectedKeywordContainer">
        <SelectedKeyword
          originalKeyword={keywords}
          selectedKeywords={selectedKeywords}
          removeKeyword={removeKeyword} 
        />
      </div>
      <GuestFooter 
        prevPageUrl={"/host/info"} 
        nextPageUrl={"/host/aspiration"} 
        isNextEnabled={selectedKeywords.length === 5}
        doBeforeNext={saveSelectedKeyword}
      />
    </div>
  );
};

export default MyIdentity;