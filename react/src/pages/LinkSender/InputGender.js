import React, { useEffect, useState }from "react";
import "../../assets/styles/LinkSender/InfoHost.scss";
import Male from "../../assets/images/radioMale.png";
import Female from "../../assets/images/radioFemale.png";
import NextButton from "../../components/Button/NextButton";
import HandleLogin from "../../components/Login/HandleLogin";
import { RadioBtn } from "../../components/Button/RadioBtn";
import { saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const InputGender = () => {
  const [gender, setGender] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  useEffect(() => {
    HandleLogin({
      assertLogin: true
    });
  }, []);

  useEffect(() => {
    setIsNextEnabled(gender !== '');
  }, [gender]);

  const saveInfo = () => {
    saveDataWithExpiration("epa_test", {
      gender: (gender === "option1") ? "male" : "female",
    });
  };

  return (
    <div id="Container">
      <div className="inputInfoWrapper">
        <div className="inputInfoBox">
          <div className="inputInfoTitle">
            <span>성별을 선택해주세요.</span>
          </div>
          <RadioBtn
            option1Img={Male}
            option2Img={Female}
            onChange={handleGenderChange}
            className={"genderRadio"}
          />
        </div>
        <NextButton
          className="nextButton"
          isNextEnabled={isNextEnabled}
          nextPageUrl="/host/identity"
          doBeforeNext={saveInfo}
        />
      </div>
    </div>
  )
};

export default InputGender;