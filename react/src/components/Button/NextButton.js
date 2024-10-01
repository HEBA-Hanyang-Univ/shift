 import React from 'react';
import './Button.scss';
import { useNavigate } from 'react-router-dom';

const NextButton = ({ isInputFocused, isNextEnabled, nextPageUrl, doBeforeNext, className, text }) => {
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
      className={`nextButton ${className} ${isInputFocused ? 'active' : isNextEnabled ? 'enabled' : ''}`} 
      onMouseDown={handleNextPage}
    >
      <span>{text}</span>
    </button>
  );
};

export default NextButton;