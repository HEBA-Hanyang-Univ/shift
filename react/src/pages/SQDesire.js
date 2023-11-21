import React, { useState, useEffect, useRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import QuestionElement from "components/QuestionElement";

const SQDesire = () => {

  // TODO : connect to server
  const [questionList, setQuestionList] = useState({S:['응애', '응애2'], L:['응애3', '응애4'], E:['응애5', '응애6'], F:['응애7', '응애8']});

  return (
    <div className="sq-desire">
      <Header/>
      <PageTitle korean="욕구" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="Glasser 욕구 강도 프로파일"/>
      <div className="SD-content" style={{ marginTop:'0', display:'flex', justifyContent:'center',}}>
        <div className="desire-box" style={{width:'100%',}}>
          {Object.entries(questionList).map(([key, value], i) => {
            return (
              <div key={key} style = {{ color:'#9C6DA9', fontFamily:'Wanted Sans', fontSize:'2rem', fontWeight:'800', }}>
                {i+1}. {key} - Test
                {value.map((item, index) => {
                  return (
                    <QuestionElement question={item} index={i} key={'question-'+index}/>
                  );
                })}
              </div>
            );
          })}
        </div>
    </div>
      
    </div>
  );
}

export default SQDesire;
