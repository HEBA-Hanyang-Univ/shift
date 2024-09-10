import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import KeywordNextBtn from "../../components/Button/KeywordNextBtn";
import HandleLogin from "../../components/Login/HandleLogin";
import TryFetch from "../../components/FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const MyAspiration = () => {
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

  const saveSelectedKeyword = () => {
    const testData = loadDataWithExpiration("epa_test");
    testData.keyword_want = selectedKeywords;
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

    let epa_keywords = loadDataWithExpiration("epa_keywords");
    if (epa_keywords === null) {
      TryFetch("get_epa_keywords", "GET", {}, (data) => {
        saveDataWithExpiration("epa_keywords", data);
        epa_keywords = data;
      }, (error) => {
        alert("키워드를 불러오는데 실패했습니다.");
        navigate("/");
        return;
      });
    }

    for (let key in testInfo.keyword_myself) {
      delete epa_keywords[key];
    }
    setKeywords(epa_keywords);
  }, []);

  return (
    <div id="Container">
      <div className="hostKeywordWrapper">
        <div className="hostKeywordTitle">
          <span>
            <span className="purpleText">{username}</span>님을
            <br />
            나타내지 않지만 갖고싶은 키워드
            <br />
            5개를 선택해주세요.
          </span>
        </div>
        <div className="hostKeyword">
          {keywords && <KeywordBtnBoxContainer
            keywords={keywords}
            selectedKeywords={selectedKeywords}
            onKeywordClick={handleKeywordClick}
          />}
        </div>
        <div className="nextBtnBox">
          <KeywordNextBtn
            className="keywordNextBtn"
            nextPageUrl="/host/perception"
            isNextEnabled={selectedKeywords.length === 5}
            doBeforeNext={saveSelectedKeyword}
          />
      </div>
      </div>
    </div>
  );
};

export default MyAspiration;
