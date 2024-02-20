import React, { useState } from "react";
import "./Button.scss";

export const DropDownBtn = ({ options }) => {
  const {selectedOption, setSelectedOption} = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  return (
    <select value={selectedOption} onChange={handleChange} style={{width : '5.4rem', height: '2.4rem'}}>
      {options.map((option, index) => 
      <option key={index} value={option}>
        {option}
      </option>
      )}
    </select>
  );
}