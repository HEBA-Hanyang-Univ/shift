import React, { useEffect, useState } from "react";
import { saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";
import NextButton from "../../components/Button/NextButton";
import InputField from "../../components/InputField/InputField";
import HandleLogin from "../../components/Login/HandleLogin";

const InputName = () => {
  const [name, setName] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDelete = () => {
    setName('');
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const saveInfo = () => {
    saveDataWithExpiration("epa_test", {
      nickname: name,
    });
  };

  useEffect(() => {
    HandleLogin({
      assertLogin: true
    });
  }, []);

  useEffect(() => {
    setIsNextEnabled(name.trim() !== '');
  }, [name]);
  
  return (
    <div id="Container">
      <div className="inputInfoWrapper">
        <div className="inputInfoBox">
          <div className="inputBox">
            <InputField
              type="text"
              value={name}
              maxLength={10}
              onChange={handleNameChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onDelete={handleDelete}
              label="이름을 입력해주세요."
              smallLabel="이름"
            />
          </div>
        </div>
        <NextButton
          className="nextButton"
          isInputFocused={isInputFocused}
          isNextEnabled={isNextEnabled}
          nextPageUrl="/host/info/age"
          doBeforeNext={saveInfo}
        />
      </div>
    </div>
  )
};

export default InputName;