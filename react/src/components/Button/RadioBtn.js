import React, { useState } from "react";
import "./Button.scss";

export const RadioBtn = ({ option1Text, option2Text, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (optionValue) => {
    setSelectedOption(optionValue);
    onChange(optionValue);
  };

  return (
    <div className="radioBtnWrapper">
      <button className="optionBtn" onClick={() => handleClick('option1')}
        style={selectedOption === 'option1' ? { backgroundColor: '#FFF', border: '2px solid #A570C4'} : { backgroundColor: '#F1F1F1' }}
      >
        <span style={{fontSize: '0.84rem', fontWeight: '600', color: '#1A1A1A'}}>
          {option1Text}
        </span>
      </button>
      <button className="optionBtn" onClick={() => handleClick('option2')}
        style={selectedOption === 'option2' ? { backgroundColor: '#FFF', border: '2px solid #A570C4' } : { backgroundColor: '#F1F1F1' }}
      >
        <span style={{fontSize: '0.84rem', fontWeight: '600', color: '#1A1A1A'}}>
          {option2Text}
        </span>
      </button>
    </div>
  );
};
