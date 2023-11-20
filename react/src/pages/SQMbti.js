import React, { useState, useEffect, useRef } from "react";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";

const SQMbti = () => {

  const mbtis = [
    'ENFP', 'ESFP', 'INFP', 'ISFP',
    'ENFJ', 'ESFJ', 'INFJ', 'ISFJ',
    'ENTP', 'ESTP', 'INTP', 'ISTP',
    'ENTJ', 'ESTJ', 'INTJ', 'ISTJ'
  ];
  const [isMouseOver, setIsMouseOver] = useState(Array.from({length:16}, (i) => false));
  const [isActive, setIsActive] = useState(Array.from({length:16}, (i) => false));

  const onMouseEnter = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    let newIsMouseOver = [...isMouseOver];
    newIsMouseOver[i] = true;
    setIsMouseOver(newIsMouseOver);
  };

  const onMouseLeave = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    let newIsMouseOver = [...isMouseOver];
    newIsMouseOver[i] = false;
    setIsMouseOver(newIsMouseOver);
  };
  
  const onClick = (event, i) => {
    event.preventDefault();
    event.stopPropagation();
    if (isMouseOver[i]) {
      let activeCount = 0;
      isActive.map((item) => activeCount += item);
      if (activeCount >= 2 && !isActive[i]) {
        alert('already 2 buttons are active!');
        return;
      }
      let newIsActive = [...isActive];
      newIsActive[i] = !newIsActive[i];
      setIsActive(newIsActive);
    }
  };

  const buttonStyle = { display:'flex', width: '100%', height: '100%', backgroundColor: '#FFF', border: '1px solid #CCC', borderRadius: '0.3125rem', justifyContent:'center', alignItems:'center', };
  const hoverButtonStyle = {...buttonStyle, border: '4px solid #9C6DA9', };
  const buttonActiveStyle = { ...buttonStyle, backgroundColor:'#9C6DA9', };

  const pStyle = { color: '#C0C0C0', textAlign: 'center', fontFamily: 'Wanted Sans',
                  fontSize: '1.875rem', fontStyle: 'normal', fontWeight: '600', lineHeight: 'normal', };
  
  const pActiveStyle = { ...pStyle, color:'#FFF', };
  
  return (
    <div className="sq-mbti">
      <Header/>
      <PageTitle korean="성향" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="Myers-Briggs Type Indicator(MBTI)"/>
      <div className="SD-content" style={{ marginTop:'0', display:'flex', justifyContent:'center',}}>
        <div className="mbti-box" style={{width: '44.6875rem', height: '25rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)', gap: '2.0rem 2.5rem', }}>
          {mbtis.map((item, i) => {
            return (
              <span key={i} style={isActive[i] ? buttonActiveStyle
                                  : isMouseOver[i] ? hoverButtonStyle
                                  : buttonStyle} className={"mbti-"+item}
              onMouseLeave={(event) => onMouseLeave(event, i)} onMouseEnter={(event) => onMouseEnter(event, i)} onClick={(event) => onClick(event, i)}
              >
                <p style={isActive[i] ? pActiveStyle : pStyle}>{item}</p>
              </span>
            );
          })}
          {/*<button ref={isMouseOver[0]} type="button" style={buttonStyle} className="mbti mbti-ENFP"><p style={pStyle}>ENFP</p></button>*/}
          {/*<button ref={isMouseOver[1]} type="button" style={buttonStyle} className="mbti mbti-ESFP"><p style={pStyle}>ESFP</p></button>*/}
          {/*<button ref={isMouseOver[2]} type="button" style={buttonStyle} className="mbti mbti-INFP"><p style={pStyle}>INFP</p></button>*/}
          {/*<button ref={isMouseOver[3]} type="button" style={buttonStyle} className="mbti mbti-ISFP"><p style={pStyle}>ISFP</p></button>*/}
          {/*<button ref={isMouseOver[4]} type="button" style={buttonStyle} className="mbti mbti-ENFJ"><p style={pStyle}>ENFJ</p></button>*/}
          {/*<button ref={isMouseOver[5]} type="button" style={buttonStyle} className="mbti mbti-ESFJ"><p style={pStyle}>ESFJ</p></button>*/}
          {/*<button ref={isMouseOver[6]} type="button" style={buttonStyle} className="mbti mbti-INFJ"><p style={pStyle}>INFJ</p></button>*/}
          {/*<button ref={isMouseOver[7]} type="button" style={buttonStyle} className="mbti mbti-ISFJ"><p style={pStyle}>ISFJ</p></button>*/}
          {/*<button ref={isMouseOver[8]} type="button" style={buttonStyle} className="mbti mbti-ENTP"><p style={pStyle}>ENTP</p></button>*/}
          {/*<button ref={isMouseOver[9]} type="button" style={buttonStyle} className="mbti mbti-ESTP"><p style={pStyle}>ESTP</p></button>*/}
          {/*<button ref={isMouseOver[10]} type="button" style={buttonStyle} className="mbti mbti-INTP"><p style={pStyle}>INTP</p></button>*/}
          {/*<button ref={isMouseOver[11]} type="button" style={buttonStyle} className="mbti mbti-ISTP"><p style={pStyle}>ISTP</p></button>*/}
          {/*<button ref={isMouseOver[12]} type="button" style={buttonStyle} className="mbti mbti-ENTJ"><p style={pStyle}>ENTJ</p></button>*/}
          {/*<button ref={isMouseOver[13]} type="button" style={buttonStyle} className="mbti mbti-ESTJ"><p style={pStyle}>ESTJ</p></button>*/}
          {/*<button ref={isMouseOver[14]} type="button" style={buttonStyle} className="mbti mbti-INTJ"><p style={pStyle}>INTJ</p></button>*/}
          {/*<button ref={isMouseOver[15]} type="button" style={buttonStyle} className="mbti mbti-ISTJ"><p style={pStyle}>ISTJ</p></button>*/}
        </div>
    </div>
      
    </div>
  );
}

export default SQMbti;
