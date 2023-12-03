import React, { useState, useEffect, useRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import ButtonModal from "components/ButtonModal";
import { Footer } from "components/Footer";
import { SideBar } from "components/SideBar/SideBar";
import secureLocalStorage from "react-secure-storage";

const SQValues = () => {

  const values = [
    '안정', '도전', '능력', '행복', '욕망', '자립',
    '가족', '전통', '새로움', '성공', '성장', '비전',
    '즐거움', '프라이버시', '더불어 삶', '건강', '용기', '경쟁',
    '열정', '지혜', '경험', '논리', '사랑', '성실',
    '개방성', '효용성', '올바름', '영성', '힘', '성찰',
    '타인 인정', '신뢰', '긍정성', '부', '배움', '방향성',
    '적극성', '전문성', '봉사', '원리원칙', '창조성', '영향력',
    '공감', '절제', '지식', '겸손', '유연함', '책임감',
    '자기다움', '초연', '여유', '자유', '평화', '균형',
    '희망', '자신감', '자존감', '삶의 의미', '재미', '정직',
  ];
  const [isMouseOver, setIsMouseOver] = useState(Array.from({length:60}, (i) => false));
  const [isActive, setIsActive] = useState(Array.from({length:60}, (i) => false));
  const [isActiveButtonModal, setIsActiveButtonModal] = useState(false);

  useEffect(() => {
    // temporary process with local storage
    let selected = secureLocalStorage.getItem('values');
    if (selected == null) selected = [];
    let index_li = []
    selected.map((item) => {index_li = [...index_li, values.indexOf(item)]})

    let newIsActive = [...isActive];
    index_li.map((i) => {
      newIsActive[i] = true;
    })
    setIsActive(newIsActive);
  }, []);

  const onMouseEnter = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    let newIsMouseOver = Array.from({length:60}, (item, it) => it===i ? true : false);
    setIsMouseOver(newIsMouseOver);
  };

  const onMouseLeave = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    let newIsMouseOver = [...isMouseOver];
    newIsMouseOver[i] = false;
    setIsMouseOver(newIsMouseOver);
  };
  
  const onClickValue = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    if (isMouseOver[i]) {
      let activeCount = 0;
      isActive.map((item) => activeCount += item);
      if (activeCount >= 5 && !isActive[i]) {
        setIsActiveButtonModal(true);
        return;
      }
      let newIsActive = [...isActive];
      newIsActive[i] = !newIsActive[i];
      setIsActive(newIsActive);
    }
  };

  const onCloseModal = () => {
    setIsActiveButtonModal(false);
  }

  const onClickNext = () => {
    const li = isActive.map((value, index) => value ? index : -1).filter(index => index !== -1);
    let selected = [];
    li.map((i) => { selected = [...selected, values[i]]; })

    // save value in local
    secureLocalStorage.setItem('values', selected);
    console.log('sq-values saved:', selected);
    // save status
    const before = secureLocalStorage.getItem('completed');
    const after = {...before, 'sq-values': selected.length > 0 ? true : false};
    secureLocalStorage.setItem('completed', after);
    console.log('sq-values marked as', selected.length > 0);
  }

  const buttonStyle = { display:'flex', width: '100%', height: '100%', backgroundColor: '#FFF', justifyContent:'center', alignItems:'center', };
  const hoverButtonStyle = {...buttonStyle, border: '4px solid #CA93D3', };
  const buttonActiveStyle = { ...buttonStyle, backgroundColor:'#CA93D3', };

  const pStyle = { color: '#C0C0C0', textAlign: 'center', fontFamily: 'Wanted Sans',
                  fontSize: '1.2rem', fontStyle: 'normal', fontWeight: '600', lineHeight: 'normal' };
  const pHoverStyle = {...pStyle, color:'#A13FB0',};
  const pActiveStyle = { ...pStyle, color:'#FFF', };

  const getSpanStyle = (i) => {
    let style = isActive[i] ? buttonActiveStyle
    : isMouseOver[i] ? hoverButtonStyle
    : buttonStyle;
    
    if (i == 0) { style = {...style, borderRadius: '1rem 0 0 0', }; }
    else if (i == 5) { style = {...style, borderRadius: '0 1rem 0 0', }; }
    else if (i == 59) { style = {...style, borderRadius: '0 0 1rem 0', }; }
    else if (i == 54) { style = {...style, borderRadius: '0 0 0 1rem', }; }
    return style;
  }
  const getTextStyle = (i) => {
    let style = isActive[i] ? pActiveStyle
    : isMouseOver[i] ? pHoverStyle
    : pStyle;

    return style;
  }
  
  return (
    <>
    {isActiveButtonModal && <ButtonModal onClose={onCloseModal} title={'6개 이상 선택하시면 안됩니다!'} message={'선택한 내용들은 초기화됩니다.'} buttonMessage={'확 인'}></ButtonModal>}
    <Header/>
    <div className="wrapper">
      <div className="sq-values">
        <PageTitle korean="가치관" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="가치관 검사"/>
        <div className="SD-content" style={{ marginTop:'0', marginBottom:'7rem', display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center',}}>
          <span style={{color:'#9C6DA9', fontWeight:'600', margin: '1rem 0 1rem 0'}}>5개의 키워드를 선택해주세요</span>
          <div className="values-box" style={{width: '44.6875rem', height: '60rem', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)', gridGap: '1px', backgroundColor: '#BEBEBE', border: '1px solid #CCC', borderRadius: '1rem', overflow:'hidden', }}>
            {values.map((item, i) => {
              return (
                <span key={i} style={getSpanStyle(i)} className={"values-"+item}
                onMouseLeave={(event) => onMouseLeave(event, i)} onMouseEnter={(event) => onMouseEnter(event, i)} onClick={(event) => onClickValue(event, i)}
                >
                  <p style={getTextStyle(i)}>{item}</p>
                </span>
              );
            })}
          </div>
        </div>
        . {/* marginBottom 임시로 넣은 것 때문에 점 하나 있어야 적용됨 */}
        <Footer link={'/sh'} helpContent={"values check"} onClickButton={onClickNext}/>
      </div>
    </div>
    </>
  );
}

export default SQValues;
