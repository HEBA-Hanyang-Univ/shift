  import React, { useState, useEffect } from "react";
  import "../../assets/styles/LinkReceiver/Reasoning.scss";
  import { GuestFooter } from "../../components/Footer/GuestFooter";
  import { motion, AnimatePresence } from "framer-motion";

  export const Reasoning = () => {
    // dummy data 
    const [keywords, setKeywords] = useState([
      { id: 1, text: "방구를 잘뀌는", visible: true, reason: "" },
      { id: 2, text: "킹 받는", visible: false, reason: "" },
      { id: 3, text: "마음씨가 고운", visible: false, reason: "" },
      { id: 4, text: "아는체를 잘하는", visible: false, reason: "" },
      { id: 5, text: "밥을 잘사주는 이쁜", visible: false, reason: "" }
    ]);

    const [isNextEnabled, setIsNextEnabled] = useState(false);

    const toggleVisibility = (id) => {
      const updatedKeywords = keywords.map((keyword) => {
        if (keyword.id === id) {
          return { ...keyword, visible: !keyword.visible };
        }
        return { ...keyword, visible: false };
      });
      setKeywords(updatedKeywords);
    };

    const updateReason = (id, reason) => {
      const updatedKeywords = keywords.map((keyword) => (
        keyword.id === id ? { ...keyword, reason: reason } : keyword
      ));
      setKeywords(updatedKeywords);
    };
  
    useEffect(() => {
      setIsNextEnabled(true);
    }, []);

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
                      <textarea className="reKeywordReasonInput" placeholder="일화를 입력하세요" value={keyword.reason} onChange={(e) => updateReason(keyword.id, e.target.value)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        <GuestFooter 
          prevPageUrl={"/guest/keyword"} 
          nextPageUrl={"/guest/description"} 
          isNextEnabled={isNextEnabled}
        />
      </div>
    )
  };
