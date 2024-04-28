import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/LinkReceiver/SelectKeyword.scss";
import "../../assets/styles/LinkSender/MyIdentity.scss";
import { KeywordBtnBoxContainer } from "../../components/Button/KeywordBox/KeywordBtnBoxContainer";
import { SelectedKeyword } from "../../components/Button/KeywordBox/SelectedKeyword";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import secureLocalStorage from "react-secure-storage";
import TryFetch from "../../components/FetchComponent/FetchComponent.js";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends.js";

const SelectKeyword = () => {
  const navigate = useNavigate();
  const { tid } = useParams();
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const [ test, setTest ] = useState(null);
  const [ username, setUsername ] = useState("username");
  const [ keywords, setKeywords ] = useState([]);

  useEffect(() => {
    const t = secureLocalStorage.getItem("epa_test");
    if (t === null || t === undefined || t.tid !== tid) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
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
    setTest(t);
    setKeywords(epa_keywords);
    setUsername(t['nickname']);
  },[]);

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

  const saveKeywords = () => {
    const replyData = secureLocalStorage.getItem("epa_reply");
    const testData = secureLocalStorage.getItem("epa_test");
    if (replyData === null || replyData === undefined || testData === null || testData === undefined) {
      alert("잘못된 접근입니다.")
      navigate("/");
      return;
    }
    replyData.keyword_selected = selectedKeywords;
    replyData.keyword_in_myself = [];
    replyData.keyword_not_in_myself = [];
    replyData.keyword_in_want = [];
    replyData.keyword_not_in_want = [];
    replyData.keyword_in_others = [];
    replyData.keyword_not_in_others = [];

    selectedKeywords.forEach((keyword) => {
      if (testData['keyword_myself'].includes(keyword)) {
        replyData.keyword_in_myself.push(keyword);
      } else {
        replyData.keyword_not_in_myself.push(keyword);
      }
      if (testData.keyword_want.includes(keyword)) {
        replyData.keyword_in_want.push(keyword);
      } else {
        replyData.keyword_not_in_want.push(keyword);
      }
      if (testData.keyword_others.includes(keyword)) {
        replyData.keyword_in_others.push(keyword);
      } else {
        replyData.keyword_not_in_others.push(keyword);
      }
    });
    secureLocalStorage.setItem("epa_reply", replyData);
  }

  return (
  <div id="Container" className="miContainer">
    <div className="idTitle">
      <div className="idTitleTop">
        <span className="idTitleUserName">{username}</span>
        <span className="idTitleSpan">님을 가장 잘 나타내는</span>
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
    <div className="idSelectedKeywordWrapper">
      <SelectedKeyword
        originalKeyword={keywords}
        selectedKeywords={selectedKeywords} 
        removeKeyword={removeKeyword} 
      />
    </div>
    <GuestFooter
      prevPageUrl={`/guest/info/${tid}`} 
      nextPageUrl={`/guest/reasoning/${tid}`}
      isNextEnabled={selectedKeywords.length === 5}
      doBeforeNext={saveKeywords}
    />
  </div>
  )
};

export default SelectKeyword;