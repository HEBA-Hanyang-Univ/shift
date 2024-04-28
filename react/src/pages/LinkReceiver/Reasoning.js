import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/LinkReceiver/Reasoning.scss";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import { motion, AnimatePresence } from "framer-motion";
import secureLocalStorage from "react-secure-storage";
import { loadDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const Reasoning = () => {
  const { tid } = useParams();
  const navigate = useNavigate();

  // text is dummy before fetching data
  const [keywords, setKeywords] = useState([
    { id: 1, text: "방구를 잘뀌는", visible: true, reason: "" },
    { id: 2, text: "킹 받는", visible: false, reason: "" },
    { id: 3, text: "마음씨가 고운", visible: false, reason: "" },
    { id: 4, text: "아는체를 잘하는", visible: false, reason: "" },
    { id: 5, text: "밥을 잘사주는 이쁜", visible: false, reason: "" }
  ]);

  const toggleVisibility = (id) => {
    setKeywords(keywords.map((keyword) =>
      keyword.id === id ? { ...keyword, visible: !keyword.visible } : { ...keyword, visible: false }
    ));
  };

  const updateReason = (id, reason) => {
    setKeywords(keywords.map(keyword =>
      keyword.id === id ? { ...keyword, reason: reason } : keyword
    ));
  };

  useEffect(() => {
    const t = secureLocalStorage.getItem("epa_test");
    const keywordData = loadDataWithExpiration("epa_keywords");
    const rep = secureLocalStorage.getItem("epa_reply");
    if (t === null || t === undefined || t.tid !== tid ||
      keywordData === null || keywordData === undefined ||
      rep === null || rep === undefined) {
      alert("잘못된 접근입니다. 다시 시도해주세요.");
      navigate("/");
    }

    setKeywords(rep.keyword_selected.map((keyword, idx) => {
      const match = keywordData[keyword][0];
      return { id: keyword, text: match, visible: false, reason: "" }
    }));
  }, []);

  const saveKeywords = () => {
    const rep = secureLocalStorage.getItem("epa_reply");
    if (rep === null || rep === undefined) {
      alert("잘못된 접근입니다. 다시 시도해주세요.");
      navigate("/");
    }
    rep.keyword_detail = keywords.map(keyword => {
      return { id: keyword.id, reason: keyword.reason }
    });
    secureLocalStorage.setItem("epa_reply", rep);
  }

  return (
    <div id="Container" className="reContainer">
      <div className="reWrapper">
        <div className="reTitleWrapper">
          <span className="reTitleBlack">키워드를 선택한 </span>
          <span className="reTitlePurple">이유</span>
          <span className="reTitleBlack">나</span>
          <br/>
          <span className="reTitlePurple">일화</span>
          <span className="reTitleBlack">가 있다면 적어보세요.</span>
        </div>
        <div className="reReasoningBox">
          {keywords.map((keyword) => (
            <div key={keyword.id}>
              <button onClick={() => toggleVisibility(keyword.id)} className={`reKeywordBtn ${keyword.visible ? 'toggleActive' : ''}`}>
                <span>{keyword.text}</span>
              </button>
              <AnimatePresence>
                {keyword.visible && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{duration: 0.2}}
                    className="reKeywordReasonInputBox"
                  >
                    <textarea
                      className="reKeywordReasonInput"
                      placeholder="일화를 입력하세요"
                      value={keyword.reason}
                      onChange={(e) => updateReason(keyword.id, e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <GuestFooter
        prevPageUrl={`/guest/keyword/${tid}`}
        nextPageUrl={`/guest/description/${tid}`}
        isNextEnabled={true}
        doBeforeNext={saveKeywords}
      />
    </div>
  )
};

export default Reasoning;
