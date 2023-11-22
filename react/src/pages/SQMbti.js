import React, { useState, useEffect, useRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import ButtonModal from "components/ButtonModal";
import { Footer } from "components/Footer";
import secureLocalStorage from "react-secure-storage";

const SQMbti = () => {

  const mbtis = [
    'ENFP', 'ESFP', 'INFP', 'ISFP',
    'ENFJ', 'ESFJ', 'INFJ', 'ISFJ',
    'ENTP', 'ESTP', 'INTP', 'ISTP',
    'ENTJ', 'ESTJ', 'INTJ', 'ISTJ'
  ];
  const [isMouseOver, setIsMouseOver] = useState(Array.from({length:16}, (i) => false));
  const [isActive, setIsActive] = useState(Array.from({length:16}, (i) => false));
  const [isActiveButtonModal, setIsActiveButtonModal] = useState(false);

  useEffect(() => {
    // temporary process with local storage
    let selected = secureLocalStorage.getItem('mbti');
    if (selected == null) selected = [];
    let index_li = []
    selected.map((item) => {index_li = [...index_li, mbtis.indexOf(item)]})

    let newIsActive = [...isActive];
    index_li.map((i) => {
      newIsActive[i] = true;
    })
    setIsActive(newIsActive);
  }, []);

  const onMouseEnter = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    let newIsMouseOver = Array.from({length:16}, (item, it) => it===i ? true : false);
    setIsMouseOver(newIsMouseOver);
  };

  const onMouseLeave = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    let newIsMouseOver = [...isMouseOver];
    newIsMouseOver[i] = false;
    setIsMouseOver(newIsMouseOver);
  };
  
  const onClickMbti = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    if (isMouseOver[i]) {
      let activeCount = 0;
      isActive.map((item) => activeCount += item);
      if (activeCount >= 2 && !isActive[i]) {
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
    li.map((i) => { selected = [...selected, mbtis[i]]; })

    // save value in local
    secureLocalStorage.setItem('mbti', selected);

    // save status
    const before = secureLocalStorage.getItem('completed');
    const after = {...before, 'sq-mbti': selected.length > 0 ? true : false};
    secureLocalStorage.setItem('completed', after);

    console.log(secureLocalStorage.getItem('mbti'));
    console.log(secureLocalStorage.getItem('completed'));
  }

  const buttonStyle = { display:'flex', width: '100%', height: '100%', backgroundColor: '#FFF', border: '1px solid #CCC', borderRadius: '0.3125rem', justifyContent:'center', alignItems:'center', };
  const hoverButtonStyle = {...buttonStyle, border: '4px solid #9C6DA9', };
  const buttonActiveStyle = { ...buttonStyle, backgroundColor:'#9C6DA9', };

  const pStyle = { color: '#C0C0C0', textAlign: 'center', fontFamily: 'Wanted Sans',
                  fontSize: '1.875rem', fontStyle: 'normal', fontWeight: '600', lineHeight: 'normal', };
  const pActiveStyle = { ...pStyle, color:'#FFF', };
  
  return (
    <div className="sq-mbti">
      {isActiveButtonModal && <ButtonModal onClose={onCloseModal} title={'3개 이상 선택하시면 안됩니다!'} message={'선택한 내용들은 초기화됩니다.'} buttonMessage={'확 인'}></ButtonModal>}
      <Header/>
      <PageTitle korean="성향" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="Myers-Briggs Type Indicator(MBTI)"/>
      <div className="SD-content" style={{ marginTop:'0', marginBottom:'7rem', display:'flex', justifyContent:'center',}}>
        <div className="mbti-box" style={{width: '44.6875rem', height: '25rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)', gap: '2.0rem 2.5rem', }}>
          {mbtis.map((item, i) => {
            return (
              <span key={i} style={isActive[i] ? buttonActiveStyle
                                  : isMouseOver[i] ? hoverButtonStyle
                                  : buttonStyle} className={"mbti-"+item}
              onMouseLeave={(event) => onMouseLeave(event, i)} onMouseEnter={(event) => onMouseEnter(event, i)} onClick={(event) => onClickMbti(event, i)}
              >
                <p style={isActive[i] ? pActiveStyle : pStyle}>{item}</p>
              </span>
            );
          })}
        </div>
      </div>
      . {/* marginBottom 임시로 넣은 것 때문에 점 하나 있어야 적용됨 */}
      <Footer link={'/sq-desire'} helpContent={"자신에게 맞는 또는 가장 가까운 것 같은 MBTI를 최대 2개까지 선택할 수 있습니다."} onClickButton={onClickNext}/>
    </div>
  );
}

export default SQMbti;
