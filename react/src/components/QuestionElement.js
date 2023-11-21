import React, { useState, useEffect, useRef } from "react";
import CheckIcon from "assets/images/portrait.png"; // TODO : change icon.

const QuestionElement = ({question, index}) => {

  const [isMouseOver, setIsMouseOver] = useState(Array.from({length:5}, (i) => false));
  const [activeButton, setActiveButton] = useState(-1);
  
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
      setActiveButton(i);
    }
  };
  
  const buttonStyle = { display:'flex', justifyContent:'center', alignItems:'center',
    width: '3rem', height: '3rem', backgroundColor: '#FFF',
    border: '1px solid #CCC', borderRadius: '50%', margin:'0 1rem 0 1rem',};
  const selectedButtonStyle = {...buttonStyle, backgroundColor: '#CCAFD9', };
  //const buttonActiveStyle = { ...hoverButtonStyle,  };

  const calcSize = (i, isString) => {
    const size = Math.abs(i-2)*0.5 + 1.5;
    if (isString) { return String(size)+'rem'; }
    else { return size; }
  }

  return (
    <div className="desire-question" style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'1.5rem 0 1.5rem 0', borderBottom: '1px solid #E6E6E6', marginBottom:'1.0rem'}}>
      <div className='desire-question-string' style={{ color:'#000', fontSize:'1.25rem', fontWeight:'700', marginBottom:'1rem',}}>
        {question}
      </div>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center',}}>
        {Array.from({length:5}, (item, i) => {
          const size = calcSize(i, false);
          const sizeStr = String(size)+'rem';
          return (
            <div key={index+'-'+i} onClick={(event) => onClick(event, i)}
            onMouseEnter={(event) => onMouseEnter(event, i)} onMouseLeave={(event) => onMouseLeave(event, i)}
            style={activeButton === i || isMouseOver[i] ? {...selectedButtonStyle, width:sizeStr, height:sizeStr}
            : {...buttonStyle, width:sizeStr, height:sizeStr}}
            >
              {activeButton === i ? <img src={CheckIcon} style={{width:String(size*0.6)+'rem', height:String(size*0.6)+'rem'}}/>:null}
            </div>
          );
        })}
      </div>
      <div style={{display:'flex', flexDirection:'row', marginTop:'1rem', gap:'0 4.5rem', color:'#424245', fontSize:'0.6rem', fontWeight:'700', fontFamily:'Wanted Sans'}}>
        <span>전혀 아니다</span>
        <span>때때로 그렇다</span>
        <span>매우 그렇다</span>
      </div>
    </div>
  );
};

export default QuestionElement;
