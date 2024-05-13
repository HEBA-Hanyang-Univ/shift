import React, { useState, useEffect } from "react";
import "../../assets/styles/LinkSender/InfoHost.scss";
import { RadioBtn } from "../../components/Button/RadioBtn";
import { DropDownBtn } from "../../components/Button/DropDownBtn";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import { saveDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";
import HandleLogin from "../../components/Login/HandleLogin";

const InfoHost = () => {
  const ageOptions = Array.from({ length: 51}, (_, i) => ({key:i, value: `${i + 10}세`}));

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };

  useEffect(() => {
    HandleLogin({
      assertLogin: true
    });
  }, []);

  useEffect(() => {
    setIsNextEnabled(name.trim() !== '' && gender !== '' && age !== '');
  }, [name, gender, age]);

  const saveInfo = () => {
    saveDataWithExpiration("epa_test", {
        nickname: name,
        gender: (gender === "option1") ? "male" : "female",
        age: age,
    });
  }
  
  return (
    <div id="Container">
      <div className="ihWrapper">
        <div className="ihTitle">
          <span>MZ 자기객관화 테스트</span>
        </div> 
        <div className="ihInputName">
          <span id="infoTitle">
            이름 또는 별명을 입력하세요.
          </span>
          <input placeholder="이름 또는 별명을 입력하세요" onChange={handleNameChange}></input>
        </div>
        <div className="ihInputGender">
          <span id="infoTitle">
            성별을 선택해주세요.
          </span>
          <RadioBtn option1Text={'남자'} option2Text={'여자'}  onChange={handleGenderChange}/>
        </div>
        <div className="ihInputAge">
          <span id="infoTitle">
            연령을 선택해주세요.
          </span>
          <DropDownBtn options={ageOptions} placeholder="나이" onChange={handleAgeChange} ></DropDownBtn>
        </div>
        <span className="ihAgreeNotice">
          테스트 결과 제공만을 위한 정보 수집입니다.
        </span>
      </div>
      <GuestFooter
        prevPageUrl={"/"} 
        nextPageUrl={"/host/identity"} 
        isNextEnabled={isNextEnabled}
        doBeforeNext={saveInfo}
      /> 
    </div>
  )
};

export default InfoHost; 