import React, { useState } from "react";
import "./Button.scss";

export const RadioBtn = ({ option1Text, option2Text, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (optionValue, optionText) => {
    setSelectedOption(optionValue);
    onChange(optionText);
  };

  return (
    <div className="radioBtnWrapper">
      <button className="optionBtn" onClick={() => handleClick('option1', option1Text)}
        style={selectedOption === 'option1' ? { backgroundColor: '#FFF', color: '#1A1A1A', border: '2px solid #A570C4'} : { backgroundColor: '#F1F1F1' }}
      >
        <span style={{fontSize: '0.84rem', fontWeight: '600'}}>
          {option1Text}
        </span>
      </button>
      <button className="optionBtn" onClick={() => handleClick('option2', option2Text)}
        style={selectedOption === 'option2' ? { backgroundColor: '#FFF', color: '1A1A1A', border: '2px solid #A570C4' } : { backgroundColor: '#F1F1F1' }}
      >
        <span style={{fontSize: '0.84rem', fontWeight: '600'}}>
          {option2Text}
        </span>
      </button>
    </div>
  );
};
