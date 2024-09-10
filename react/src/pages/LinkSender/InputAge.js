import React, { useEffect, useState } from "react";
import { saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";
import NextButton from "../../components/Button/NextButton";
import InputField from "../../components/InputField/InputField";
import HandleLogin from "../../components/Login/HandleLogin";

const InputAge = () => {
  const [age, setAge] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleAgeChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setAge(numericValue);
  };
  
  const handleDelete = () => {
    setAge('');
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const saveInfo = () => {
    saveDataWithExpiration("epa_test", {
        age: age,
    });
  };

  useEffect(() => {
    HandleLogin({
      assertLogin: true
    });
  }, []);

  useEffect(() => {
    setIsNextEnabled(age !== '');
  }, [age]);
  
  return (
    <div id="Container">
      <div className="inputInfoWrapper">
        <div className="inputInfoBox">
          <div className="inputBox">
            <InputField
              type="text"
              value={age}
              maxLength={2}
              onChange={handleAgeChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onDelete={handleDelete}
              label="나이를 알려주세요."
              smallLabel="나이"
            />
          </div>
        </div>
        <NextButton
          className="nextButton"
          isInputFocused={isInputFocused}
          isNextEnabled={isNextEnabled}
          nextPageUrl="/host/info/gender"
          doBeforeNext={saveInfo}
        />
      </div>
    </div>
  )
};

export default InputAge;