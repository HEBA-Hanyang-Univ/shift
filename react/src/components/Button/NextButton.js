 import React from 'react';
import './Button.scss';
import { useNavigate } from 'react-router-dom';

const NextButton = ({ isInputFocused, isNextEnabled, nextPageUrl, doBeforeNext }) => {
  const navigate = useNavigate();

  const handleNextPage = (e) => {
    e.preventDefault();
    if(isNextEnabled) {
      doBeforeNext?.();
      document.activeElement.blur(); // Remove focus from input field
      navigate(nextPageUrl);
    } else {
      alert('이 필드는 반드시 입력해야합니다.');
    }
  };

  return (
    <button 
      className={`nextButton ${isInputFocused ? 'active' : isNextEnabled ? 'enabled' : ''}`} 
      onMouseDown={handleNextPage} 
    >
      <span>다음</span>
    </button>
  );
};

export default NextButton;