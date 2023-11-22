import React, {useRef, useState, useEffect, ReactElement} from "react";
import { Link } from "react-router-dom";
import { Header } from "components/Header";
import "assets/styles/StartHomepage.scss";
import ModifyBtn from "assets/images/modifyBtn.svg";
import Dashed from "assets/images/dashedLine.png";
import Portrait from "assets/images/portrait.png";
import DropDown from "components/DropDown";
import Icon from "components/Icon";
import SQImg from "assets/images/SH_sq.svg";  
import SIImg from "assets/images/SH_SI.svg";
import SWOTImg from "assets/images/SH_Swot.svg";
import EPAImg from "assets/images/SH_Epa.svg";
import SPImg from "assets/images/SH_Sp.svg";
import secureLocalStorage from "react-secure-storage";

// 진행률 막대
const ProgressBar = ({progress}) => {
  return (
    <div className="SHProgressBar">
      <div className="SHProgressbarColored" style={{width: `${progress}%`, height: '100%', borderRadius: '0.75rem' ,backgroundColor: '#CDB0D9'}}></div>
    </div>
  )
}

export const StartHomepage = () => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const sectionSRef = useRef(null);
  const sectionHRef = useRef(null);  
  const sectionIRef = useRef(null);  
  const sectionFRef = useRef(null);  
  const sectionTRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('S');

  const scrollToRef = (ref) => ref.current.scrollIntoView({behavior: 'smooth'});

  const executeScroll = (event) => {
    const section = event.target.innerText;
    setCurrentSection(section);
    switch(section) {
      case 'S':
        scrollToRef(sectionSRef)
        break;
      case 'H':
        scrollToRef(sectionHRef)
        break;
      case 'I':
        scrollToRef(sectionIRef)
        break;
      case 'F':
        scrollToRef(sectionFRef)
        break;
      case 'T':
        scrollToRef(sectionTRef)
        break;
      default:
        break;
    }
  }

  const increaseProgress = () => {
    if(progress < 100) {
      setProgress((prevProgress) => prevProgress + 10);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      setCompleted(true);
    }
  }, [progress]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id.replace('section', ''));
        }
      });
    }, {threshold:0.7});

    observer.observe(sectionSRef.current);
    observer.observe(sectionHRef.current);
    observer.observe(sectionIRef.current);
    observer.observe(sectionFRef.current);
    observer.observe(sectionTRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  let completeStatus = secureLocalStorage.getItem('completed');
  if (completeStatus == null) completeStatus = {};

  return (
    <>
    <Header></Header>
    <div id="SHWrap">
      <div id="SHContainer">
        {/* 상단 프로필 */}
        <div className="SHProfile">
          <div className="SHProfileLeft">
            <div className="userProfileImg">
              {/* TODO: 추 후 userImg 삽입 */}
              <img src={Portrait} alt="blanked img"></img>
            </div>
            <div className="SHProfileContent">
              <div className="userProfileBox">
                {/* TODO: 추 후 userName 삽입 */}
                <div className="userName">깍두기응애응애응님</div>
                <button className="userNameModifyBtn">
                  <img src={ModifyBtn} alt="modify button"></img>
                </button>
              </div>
              <div className="dropDownBox">
                <DropDown></DropDown>
              </div>
            </div>
          </div>
          <div className="SHProfileRight">
            <div className="SHBtnBox">
              <button className="SHBtnPurple">
                <Link to='/sq-mbti' onClick={() => secureLocalStorage.clear()}>
                  <span>시작하기</span>
                </Link>
              </button>
              <button className="SHBtnWhite">
                <span>결과지 확인</span>
              </button>
            </div>
            <div className="lastModifiedDate">
              <span>마지막 수정일 : </span>
              {/* TODO: 마지막 수정일 입력하기 */}
              <span>2023.09.30</span>
            </div>
          </div>
        </div>
        {/* SHIFT 진도 페이지 */}
        <div className="SHProgressTextBox">
          <div className={`SHProgressText ${currentSection === 'S' ? 'activeButton' : ''}`}>
            <button onClick={executeScroll}>
              <span>S</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className={`SHProgressText ${currentSection === 'H' ? 'activeButton' : ''}`}>
            <button onClick={executeScroll}>
              <span>H</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className={`SHProgressText ${currentSection === 'I' ? 'activeButton' : ''}`}>
            <button onClick={executeScroll}>
              <span>I</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className={`SHProgressText ${currentSection === 'F' ? 'activeButton' : ''}`}>
            <button onClick={executeScroll}>
              <span>F</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className={`SHProgressText ${currentSection === 'T' ? 'activeButton' : ''}`}>
            <button onClick={executeScroll}>
              <span>T</span>
            </button>
          </div>
        </div>
        {/* SHIFT 진도 컨텐츠 */}
        <div className="SHProgressContentBox">
          {/* S */}
          <div className="SHProgressContentS" id="sectionS" ref={sectionSRef}> 
            <div className="SHProgressTitle">
              <div className="SHProgressTitleMain">
                Self Defining
              </div>
              {/* TODO: 코스마다 해당 페이지로 이동 */}
              <div className="SHProgressTitleLink">
                코스 자세히 보기
              </div>
            </div>
            <div className="SHProgressSubTitleS">
              <div className="SHProgressSubTitleSSpan"style={{marginRight: '5rem'}}>
                Self-questioning
              </div>
              <div className="SHProgressSubTitleSSpan" style={{marginRight: '5.4rem'}}>
                Self Inspection
              </div>
              <div className="SHProgressSubTitleSSpan" style={{marginRight: '3.1rem'}}>
                SWOT Analysis
               </div>
              <div className="SHProgressSubTitleSSpan" style={{marginRight: '2.7rem'}}>
                External Perception Analysis
              </div>
              <div className="SHProgressSubTitleSSpan">
                Self Profiling
              </div>
            </div>
            <div className="SHProgressDetailBox">
              <div className="SHProgressDetailBoxColored">
                <div className="mainSD">
                  <img src={SQImg} alt="SQ main img"></img>
                </div>
                <div className="mainSD">
                  <img src={SIImg} alt="SI main img"></img>
                </div>
                <div className="mainSD">
                  <img src={SWOTImg} alt="SWOT main img" style={{marginLeft: '0.5rem'}}></img>
                </div>
                <div className="mainSD">
                  <img src={EPAImg} alt="EPA main img" style={{marginLeft: '0.6rem'}}></img>
                </div>
                <div className="mainSD">
                  <img src={SPImg} alt="SP main img" style={{marginLeft:'1rem'}}></img>
                </div>
                <div className="subSD subSDB">
                  <Icon index={0} completed={completeStatus['sq-mbti']} link={'/sq-mbti'}></Icon>
                  <span>성격</span>
                </div>
                <div className="subSD subSDC">
                  <Icon index={3} completed={false}></Icon>
                  <span>경제능력</span>
                </div>                
                <div className="subSD subSDD">
                  <Icon index={7} completed={false}></Icon>
                  <span>내부요인 분석</span>
                </div>                
                <div className="subSD subSDE">
                  <Icon index={9} completed={false}></Icon>
                  <span>내부시점분석</span>
                </div>                
                <div className="subSD subSDF">
                  <Icon index={11} completed={false}></Icon>
                  <span>한줄 정의</span>
                </div>                
                <div className="subSD subSDB">
                  <Icon index={1} completed={completeStatus['sq-motivation']} link={'/sq-desire'}></Icon>
                  <span>동기</span>
                </div>
                <div className="subSD subSDC">
                  <Icon index={4} completed={false}></Icon>
                  <span>인간관계</span>
                </div>
                <div className="subSD subSDD">
                  <Icon index={8} completed={false}></Icon>
                  <span>외부요인 분석</span>
                </div>
                <div className="subSD subSDE">
                  <Icon index={10} completed={false}></Icon>
                  <span>외부시점분석</span>
                </div>
                <div className="subSD subSDF">
                  <Icon index={12} completed={false}></Icon>
                  <span>리마인드</span>
                </div>
                <div className="subSD" style={{marginLeft: '-1.8rem'}}>
                  <Icon index={2} completed={false}></Icon>
                  <span>가치관</span>
                </div>
                <div className="subSD subSDC" style={{marginLeft: '0.4rem'}}>
                  <Icon index={5} completed={false}></Icon>
                  <span>시간관리능력</span>
                </div>
                <div className="blankIcon"></div>
                <div className="blankIcon"></div>
                <div className="subSD subSDF">
                  <Icon index={13} completed={false}></Icon>
                  <span>결과확인</span>
                </div>
                <div className="blankIcon"></div>
                <div className="subSD subSDC">
                  <Icon index={6} completed={false}></Icon>
                  <span>작업능력</span>
                </div>
              </div>
            </div>
          </div>
          {/* H */}
          <div className="SHProgressContentH" id="sectionH" ref={sectionHRef}></div>
          {/* I */}
          <div className="SHProgressContentI" id="sectionI" ref={sectionIRef}></div>
          {/* F */}
          <div className="SHProgressContentF" id="sectionF" ref={sectionFRef}></div>
          {/* T */}
          <div className="SHProgressContentT" id="sectionT" ref={sectionTRef}></div>
        </div>
        {/* 진행률 */}
        <div className="SHProgressBarBox">
          <span>진행률</span>
          <ProgressBar progress={progress}></ProgressBar>
        </div>
      </div>
    </div>
    </>
  )
}  