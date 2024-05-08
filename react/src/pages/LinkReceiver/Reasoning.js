import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/LinkReceiver/Reasoning.scss";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import { motion, AnimatePresence } from "framer-motion";
import { saveDataWithExpiration, loadDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const Reasoning = () => {
  const { tid } = useParams();
  const navigate = useNavigate();

  const [keywords, setKeywords] = useState([]);

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
    const t = loadDataWithExpiration("epa_received_test");
    const keywordData = loadDataWithExpiration("epa_keywords");
    const rep = loadDataWithExpiration("epa_reply");
    if (t === null || t === undefined || t.tid !== tid ||
      keywordData === null || keywordData === undefined ||
      rep === null || rep === undefined) {
      alert("잘못된 접근입니다. 다시 시도해주세요.");
      navigate("/");
    }

    setKeywords(rep.keyword_selected.map((keyword, idx) => {
      const match = keywordData[keyword][1] + " " + keywordData[keyword][0];
      return { id: keyword, text: match, visible: false, reason: "" }
    }));
  }, []);

  const saveKeywords = () => {
    const rep = loadDataWithExpiration("epa_reply");
    if (rep === null || rep === undefined) {
      alert("잘못된 접근입니다. 다시 시도해주세요.");
      navigate("/");
    }
    rep.keyword_detail = keywords.map(keyword => {
      return { id: keyword.id, reason: keyword.reason }
    });
    saveDataWithExpiration("epa_reply", rep);
  }

  return (
    <div id="Container" className="reContainer">
      <div className="reWrapper">
        <div className="reTitleWrapper">
          <div className="reMainTitle">
            <span className="reTitleBlack">키워드를 선택한 </span>
            <span className="reTitlePurple">이유</span>
            <span className="reTitleBlack">나</span>
            <br/>
            <span className="reTitlePurple">일화</span>
            <span className="reTitleBlack">를 자세히 적어주세요.</span>
          </div>
          <div className="reSubTitle">
            <span>구체적으로 적을수록 응답 신뢰도가 올라갑니다.</span>
          </div>
        </div>
        <div className="reReasoningBox">
          {keywords.map((keyword) => (
            <div key={keyword.id}>
              <button onClick={() => toggleVisibility(keyword.id)} className={`reKeywordBtn ${keyword.visible ? 'toggleActive' : ''} ${keyword.reason.trim() !== '' ? 'reasonFilled' : ''}`}>
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
                      type="text"
                      maxLength={150}
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
