    import React from "react";
    import "../../assets/styles/LinkReceiver/InfoGuest.scss";
    import { RadioBtn } from "../../components/Button/RadioBtn";
    import { DropDownBtn } from "../../components/Button/DropDownBtn";
    import { GuestFooter } from "../../components/Footer/GuestFooter";

    export const InfoGuest = () => {
      const relationshipOptions = ['지인', '가족', '친구', '애인', '기타'];
      const ageRangeOptions = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

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
              <RadioBtn option1Text={'공개'} option2Text={'익명'}></RadioBtn>
            </div>
            <div className="igInputName">
              <span id="infoTitle">이름 또는 별명을 입력하세요.</span>
              <input placeholder="난준석그냥돌"></input>
            </div>
            <div className="igInputGender">
              <span id="infoTitle">성별을 선택해주세요.</span>
              <RadioBtn option1Text={'남자'} option2Text={'여자'}></RadioBtn>
            </div>
            <div className="igDropDownBox">
              <span id="infoTitle">username님과의 관계와 연령대를 선택해주세요.</span>
              <div className="dropDownWrapper">
                <DropDownBtn options={relationshipOptions} placeholder="관계"></DropDownBtn>
                <DropDownBtn options={ageRangeOptions} placeholder="나이"></DropDownBtn>
              </div>
              <span className="infoDescription">테스트 결과 제공만을 위한 정보 수집입니다.</span>
            </div>
          </div>
        </div>
        <GuestFooter/>
        </>
      )
    };
