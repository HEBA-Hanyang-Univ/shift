import React from "react";
import "../Button.scss";

export const SelectedKeywordContainer = ({selectedKeywords}) => {

  return (
    <div className="selectedKeywordWrapper">
      <div className="skTitle">
        <span>선택된 키워드</span>
      </div>
      <div className="selectedKeywordBox">
        {selectedKeywords.map((keyword, index) => (
          <div className="selectedKeyword" key={index}>
            {keyword}
          </div>
        ))}
      </div>
    </div>
  )
};