import React, { useState, useEffect, useRef, forwardRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import QuestionElement from "components/QuestionElement";
import { FetchData } from "components/FetchData";
import { Footer } from "components/Footer";
import secureLocalStorage from "react-secure-storage";

const SQDesire = () => {
  const [questionList, setQuestionList] = useState({});
  const questionRef = useRef({});

  let preData = secureLocalStorage.getItem('sq-desire');
  if (preData == null) preData = {};

  useEffect(() => {
    FetchData('http://150.230.252.177:5000/get-desire', 'GET')
    .then((response) => {
      if (response.message !== 'success') {
        console.log('something went wrong, response : ', response);
        return response;
      }
      setQuestionList(response.result);
      return response;
    })
    .then((response) => {
      for (const p in response.result) {
        for (const q of response.result[p]) {
          if (preData[p] && preData[p][q]) {
            questionRef.current[p] = {...questionRef.current[p], [q]: preData[p][q]};
          }
        }
      }
    })

  }, []);

  const onCheckElem = (val, c, key) => {
    questionRef.current[c] = {...questionRef.current[c], [key]:val};
  }

  const onClickNext = () => {
    secureLocalStorage.setItem('sq-desire', questionRef.current);
    console.log('sq-desire saved:', questionRef.current)

    let total = 0;
    Object.entries(questionList).map(([key, value], i) => {
      total += questionList[key].length;
    });

    let len = 0;
    Object.entries(questionRef.current).map(([key, val], it) => {
      len += Object.keys(val).length;
    });

    const before = secureLocalStorage.getItem('completed');
    const after = {...before, 'sq-desire': len == total};
    secureLocalStorage.setItem('completed', after);
    console.log('sq-desire marked as', len == total);
  }

  return (
    <>
    <Header/>
    <div className="sq-desire">
      <PageTitle korean="동기" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="Glasser 욕구 강도 프로파일"/>
      <div className="SD-content" style={{ marginTop:'0', marginBottom:'5rem', display:'flex', justifyContent:'center',}}>
        <div className="desire-box" style={{width:'100%',}}>
          {Object.entries(questionList).map(([key, value], i) => {
            return (
              <div key={key} style = {{ color:'#9C6DA9', fontFamily:'Wanted Sans', fontSize:'2rem', fontWeight:'800', }}>
                {i+1}. {key} - Test
                { value.map((item, index) => {
                  return (
                    <QuestionElement question={item} index={i} key={'question-'+index} onChecked={(val) => onCheckElem(val, key, item)} val={questionRef.current[key] ? questionRef.current[key][item] ? questionRef.current[key][item] : undefined : undefined}/>
                  );
                })
                }
              </div>
            );
          })}
        </div>
      </div>
      
      <Footer link={'/sq-interest'} helpContent={"질문을 보고 자신에게 맞는 응답을 체크해주세요."} onClickButton={onClickNext}></Footer>
    </div>
    </>
  );
}

export default SQDesire;
