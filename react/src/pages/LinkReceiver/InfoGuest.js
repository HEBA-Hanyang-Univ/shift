    import React, { useEffect, useState } from "react";
    import "../../assets/styles/LinkReceiver/InfoGuest.scss";
    import { RadioBtn } from "../../components/Button/RadioBtn";
    import { DropDownBtn } from "../../components/Button/DropDownBtn";
    import { GuestFooter } from "../../components/Footer/GuestFooter";

    export const InfoGuest = () => {
      const relationshipOptions = [
        { key: 'relation1', value: '지인'},
        { key: 'relation2', value: '가족'},
        { key: 'relation3', value: '친구'},
        { key: 'relation4', value: '애인'},
        { key: 'relation5', value: '기타'}
      ];

      const ageRangeOptions = [
        { key: 'age1', value: '10대' },
        { key: 'age2', value: '20대' },
        { key: 'age3', value: '30대' },
        { key: 'age4', value: '40대' },
        { key: 'age5', value: '50대' },
        { key: 'age6', value: '60대' }
      ];

      const [anonymous, setAnonymous] = useState(null);
      const [name, setName] = useState('');
      const [gender, setGender] = useState(null);
      const [relationship, setRelationship] = useState(null);
      const [ageRange,setAgeRange] = useState(null);

      const handleAnonymousChange = (value) => {
        setAnonymous(value);
      };

      const handleNameChange = (e) => {
        setName(e.target.value);
      };

      const handleGenderChange = (value) => {
        setGender(value);
      };

      const handleRelationshipChange = (value) => {
        setRelationship(value);
      };

      const handleAgeRangeChange = (value) => {
        setAgeRange(value);
      };

      const [isNextEnabled, setIsNextEnabled] = useState(false);

      useEffect(() => {
        setIsNextEnabled(anonymous !== null && name.trim() !== '' && gender !== null && relationship !== null && ageRange !== null);
      }, [anonymous, name, gender, relationship, ageRange]);

      return (
        <>
        <div id="Container">
          <div className="igWrapper">
            <div className="igTitle">
              <span>MZ 자기객관화 테스트</span>
            </div>
            <div className="igDisclosure">
              <span id="infoTitle">익명으로 응답하기</span>
              <span className="igDisclosureDes">
                익명설정시 응답자님의 답변이 특정되지 않고, 
                <br/>
                통계 형태로만 전달됩니다.
              </span>
              <RadioBtn option1Text={'공개'} option2Text={'익명'} onChange={handleAnonymousChange}></RadioBtn>
            </div>
            <div className="igInputName">
              <span id="infoTitle">이름 또는 별명을 입력하세요.</span>
              <input placeholder="이름을 입력하세요" onChange={handleNameChange}></input>
            </div>
            <div className="igInputGender">
              <span id="infoTitle">성별을 선택해주세요.</span>
              <RadioBtn option1Text={'남자'} option2Text={'여자'} onChange={handleGenderChange}></RadioBtn>
            </div>
            <div className="igDropDownBox">
              <span id="infoTitle">username님과의 관계와 연령대를 선택해주세요.</span>
              {/* TODO : 추후 옵션 데이터 전달 */}
              <div className="dropDownWrapper">
                <DropDownBtn options={relationshipOptions} placeholder="관계" onChange={handleRelationshipChange} className="dropDownRelation"></DropDownBtn>
                <DropDownBtn options={ageRangeOptions} placeholder="나이" onChange={handleAgeRangeChange}
                className="dropDownAge"></DropDownBtn>
              </div>
              <span className="infoDescription">테스트 결과 제공만을 위한 정보 수집입니다.</span>
            </div>
          </div>
          <GuestFooter 
            nextPageUrl="/guest/keyword" 
            isNextEnabled={isNextEnabled}
          />
        </div>
        </>
      )
    };
