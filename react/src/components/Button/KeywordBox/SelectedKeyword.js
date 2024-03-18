import React from "react";
import "../Button.scss";
import DeleteBtn from "../../../assets/images/delBtn.svg";

export const SelectedKeyword = ({selectedKeywords, removeKeyword}) => {
  
  return (
    <div className="isSelectedKeywordWrapper">
      <div className="isSelectedKeywordTitle">
        <span>선택된 키워드</span>
      </div>
      <div className="isSelectedKeywordBox">
        {selectedKeywords.map((keyword, index) => (
          <div className="selectedKeyword" key={index}>
            {keyword}
            <button onClick={() => removeKeyword(index)}>
              <img src={DeleteBtn} alt="delete btn"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}