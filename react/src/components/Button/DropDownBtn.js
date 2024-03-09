import React, { useState } from "react";
import "./Button.scss";

export const DropDownBtn = ({ options, placeholder }) => {
  const {selectedOption, setSelectedOption} = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  return (
    <select  className="dropDownBtn" value={selectedOption} onChange={handleChange}>
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((option, index) => 
      <option key={index} value={option}>
        {option}
      </option>
      )}
    </select>
  );
}