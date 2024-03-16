import React, { useState } from "react";
import "../../assets/styles/LinkReceiver/Reasoning.scss";
import { GuestFooter } from "../../components/Footer/GuestFooter";

export const Reasoning = () => {
  // dummy data 
  const [keywords, setKeywords] = useState([
    { id: 1, text: "방구를 잘뀌는", visible: true },
    { id: 2, text: "킹 받는", visible: false },
    { id: 3, text: "마음씨가 고운", visible: false },
    { id: 4, text: "아는체를 잘하는", visible: false },
    { id: 5, text: "밥을 잘사주는 이쁜", visible: false }
  ]);

  const toggleVisibility = (id) => {
    const updatedKeywords = keywords.map((keyword) => {
      if (keyword.id === id) {
        return { ...keyword, visible: !keyword.visible };
      }
      return { ...keyword, visible: false };
    });
    setKeywords(updatedKeywords);
  };

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
              <button onClick={() => toggleVisibility(keyword.id)} className="reKeywordBtn">
                <span>{keyword.text}</span>
              </button>
              {keyword.visible && (
                <div className="reKeywordReasonInputBox">
                  <textarea placeholder="일화를 입력하세요" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <GuestFooter/>
    </div>

  )
};
