import React from "react";
import "./InputField.scss";
import DelButton from "../../assets/images/infoDelBtn.png";

const InputField = ({ type, value, maxLength, onChange, onFocus, onBlur, onDelete, label, smallLabel }) => {
  return (
    <div className="inputField">
      <input
        type={type}
        spellCheck="false"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        maxLength={maxLength}
        required
      />
      <button onClick={onDelete}>
        <img src={DelButton} alt="delete" />
      </button>
      <span className="bar"/>
      <label>{label}</label>
      <span className="smallLabel">{smallLabel}</span>
    </div>
  );
};

export default InputField;