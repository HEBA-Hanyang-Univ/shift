import React, { useState, useEffect, useRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import ExperienceTable from "components/ExperienceTable";

const SQExperience = () => {

  // TODO : connect to server
  const [experienceList, setExperienceLisst] = useState({'성공경험':'목표를 세우고 성공한 경험', '실패경험':'목표를 세우고 실패한 경험', '장래희망':'막연했던 장래희망',});

  return (
    <div className="sq-experience">
      <Header/>
      <PageTitle korean="성공실패경험" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="성공 실패 경험 (자기 결정성)"/>
      <div className="SD-content" style={{ marginTop:'0', display:'flex', justifyContent:'center',}}>
        <div className="experience-box" style={{width:'100%',}}>
          {Object.entries(experienceList).map(([key, value], i) => {
            return (
              <ExperienceTable key={i} title={key} columnTitle={value}/>
            );
          })}
        </div>
    </div>
      
    </div>
  );
}

export default SQExperience;
