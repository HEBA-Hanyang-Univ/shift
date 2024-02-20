import React, { useState } from "react";
import "./Button.scss";

export const RadioBtn = ({ option1Text, option2Text }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="radioBtnWrapper">
      <button className="optionBtn" onClick={() => setSelectedOption('option1')}
        style={selectedOption === 'option1' ? { backgroundColor: '#FFF', color: '#1A1A1A', border: '2px solid #A570C4'} : { backgroundColor: '#F1F1F1' }}
      >
      
        {option1Text}
      </button>
      <button className="optionBtn" onClick={() => setSelectedOption('option2')}
        style={selectedOption === 'option2' ? { backgroundColor: '#FFF', color: '1A1A1A', border: '2px solid #A570C4' } : { backgroundColor: '#F1F1F1' }}
      >
        {option2Text}
      </button>
    </div>
  );
};
