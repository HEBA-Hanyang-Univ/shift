import React, { useState } from "react";
import "./Button.scss";

export const RadioBtn = ({ option1Img, option2Img, onChange, className }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (optionValue) => {
    setSelectedOption(optionValue);
    onChange(optionValue);
  };

  return (
    <div className={`radioBtnWrapper ${className}`}>
      <button
        className={`optionBtn option1Btn ${selectedOption === 'option1' ? 'selected' : ''}`}
        onClick={() => handleClick('option1')}
        style={{ opacity: selectedOption === 'option1' || selectedOption === null ? 1 : 0.5 }}
      >
        <img src={option1Img} alt="option1" />
      </button>
      <button
        className={`optionBtn option2Btn ${selectedOption === 'option2' ? 'selected' : ''}`}
        onClick={() => handleClick('option2')}
        style={{ opacity: selectedOption === 'option2' || selectedOption === null ? 1 : 0.5 }}
      >
        <img src={option2Img} alt="option2" />
      </button>
    </div>
  );
};