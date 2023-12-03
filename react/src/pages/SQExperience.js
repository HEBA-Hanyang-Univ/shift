import React, { useState, useEffect, useRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import ExperienceTable from "components/ExperienceTable";
import { Footer } from "components/Footer";
import secureLocalStorage from "react-secure-storage";

const SQExperience = () => {
  const experienceList = {'성공경험':'목표를 세우고 성공한 경험', '실패경험':'목표를 세우고 실패한 경험', '장래희망':'막연했던 장래희망',};
  const numsOfRow = 3;
  const tableData = useRef(getInitialData());

  const onClickNext = () => {
    secureLocalStorage.setItem('sq-experience', tableData.current);
    console.log('sq-experience saved:', tableData.current);

    const before = secureLocalStorage.getItem('completed');
    console.log('state of sq-interest and sq-desire',before['sq-interest'], before['sq-desire']);

    // TODO : check complete condition of sq-experience
    const after = {...before,
      'sq-motivation': before['sq-interest'] && before['sq-desire'] ? true : false};
    secureLocalStorage.setItem('completed', after);
    console.log('sq-motivation marked as', after['sq-motivation']);
  }

  const setDataFromTable = (key, value) => {
    tableData.current[key] = value;
  }

  // TODO : set initial data as server-side data
  function getInitialData() {
    let initialData = secureLocalStorage.getItem('sq-experience');
    if (initialData == null) {
      initialData = {};
      Object.keys(experienceList).map((item) => {
        initialData[item] = {};
      });
      Object.entries(initialData).map(([key, value]) => {
        let d = {};
        for (let i = 0; i < numsOfRow; i++) {
          d[i] = {0: '', 1: '', rate:'50'};
        }
        initialData[key] = d;
      });
    }

    return initialData;
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
              <ExperienceTable key={i} title={key} columnTitle={value} numsOfRow={numsOfRow} initialData={tableData.current[key]} onChange={setDataFromTable}/>
            );
          })}
        </div>
      </div>
      <Footer link={'/sq-values'} helpContent={"자신이 성공 혹은 실패했던 경험, 그리고 가졌었던 장래희망에 대해서 써보세요."} onClickButton={onClickNext}/>
    </div>
    </>
  );
}

export default SQExperience;
