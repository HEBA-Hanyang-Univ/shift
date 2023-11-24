import React, { useState, useEffect, useRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import ExperienceTable from "components/ExperienceTable";
import { Footer } from "components/Footer";
import secureLocalStorage from "react-secure-storage";

const SQExperience = () => {

  // TODO : connect to server
  const [experienceList, setExperienceList] = useState({'성공경험':'목표를 세우고 성공한 경험', '실패경험':'목표를 세우고 실패한 경험', '장래희망':'막연했던 장래희망',});

  const onClickNext = () => {
    // for demonstration
    const before = secureLocalStorage.getItem('completed');
    console.log(before['sq-interest'], before['sq-desire']);
    const after = {...before, 'sq-motivation': before['sq-interest'] && before['sq-desire'] ? true : false};
    secureLocalStorage.setItem('completed', after);
  }

  return (
    <>
    <Header/>
    <div className="sq-experience">
      <PageTitle korean="동기" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="성공 실패 경험 (자기 결정성)"/>
      <div className="SD-content" style={{ marginTop:'0', marginBottom:'5rem', display:'flex', justifyContent:'center',}}>
        <div className="experience-box" style={{width:'100%',}}>
          {Object.entries(experienceList).map(([key, value], i) => {
            return (
              <ExperienceTable key={i} title={key} columnTitle={value}/>
            );
          })}
        </div>
      </div>
      <Footer link={'/sh'} helpContent={"자신이 성공 혹은 실패했던 경험, 그리고 가졌었던 장래희망에 대해서 써보세요."} onClickButton={onClickNext}/>
    </div>
    </>
  );
}

export default SQExperience;
