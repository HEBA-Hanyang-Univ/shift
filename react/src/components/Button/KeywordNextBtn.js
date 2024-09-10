import React from 'react';
import './Button.scss';
import { useNavigate } from 'react-router-dom';

const KeywordNextBtn = ({ isInputFocused, isNextEnabled, nextPageUrl, doBeforeNext }) => {
  const navigate = useNavigate();

  const handleNextPage = (e) => {
    e.preventDefault();
    if(isNextEnabled) {
      doBeforeNext?.();
      document.activeElement.blur(); // Remove focus from input field
      navigate(nextPageUrl);
    };
  };

  return (
    <button 
      className={`keywordNextBtn ${isInputFocused ? 'active' : isNextEnabled ? 'enabled' : ''}`} 
      onMouseDown={handleNextPage} 
    >
      <span>다음</span>
    </button>
  );
};

export default KeywordNextBtn;