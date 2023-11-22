import React, { useState, useEffect, useRef } from "react";
import 'assets/styles/ExperienceTable.scss'

const ExperienceTable = ({title, columnTitle}) => {
  const [values, setValues] = useState([]);
  const textAreaRefs = useRef([]);
  const cellHeightRef = useRef(null);

  const leftPercentageRef = useRef([]);
  const rightPercentageRef = useRef([]);

  useEffect(() => {
    cellHeightRef.current = window.getComputedStyle(document.getElementsByTagName('tr')[0]).height.split('px')[0];
    for (const textArea of textAreaRefs.current) {
      resizeTextarea(textArea);
    }
    for (let i = 0; i < 3; i++) {
      setPercentageText(i, 50);
    }
  }, []);

  const onTextAreaChange = (e, i) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();

    resizeTextarea(textAreaRefs.current[i]);
  }

  const resizeTextarea = (textarea) => {
    textarea.style.height = '0px';
    const scrollHeight = textarea.scrollHeight;
    const style = window.getComputedStyle(textarea);
    const borderTop = parseInt(style.borderTop);
    const borderBottom = parseInt(style.borderBottom);
    let newHeight = (scrollHeight + borderTop + borderBottom);
    
    if (newHeight > cellHeightRef.current) newHeight = cellHeightRef.current;
    textarea.style.height = String(newHeight) + 'px';
  }

  const onSliderChange = (e, i) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    const val = 4 + e.target.value * 92/100;
    e.target.style.background = 'linear-gradient(to right, #FDA746 0%, #FDA746 ' + val + '%, #B689C8 ' + val + '%, #B689C8 100%)';
    
    if (val >= 50) {
      e.target.style.setProperty('--sliderBackground', 'linear-gradient(90deg, #FDA541 7.53%, #ECB77B 91.5%)');
    } else {
      e.target.style.setProperty('--sliderBackground', 'linear-gradient(270deg, #B689C8 19%, #B576CE 80.4%)');
    }

    setPercentageText(i, e.target.value);
  }

  const setPercentageText = (i, val) => {
    let newVals = [...values];
    newVals[i] = val;
    setValues(newVals);

    leftPercentageRef.current[i].innerHTML = newVals[i] + '%';
    leftPercentageRef.current[i].style.marginLeft = 'calc(' + ((newVals[i]/2)+'%') + ' - ' + window.getComputedStyle(leftPercentageRef.current[i]).width.split('px')[0]/2+'px';
    rightPercentageRef.current[i].innerHTML = 100 - newVals[i] + '%';
    rightPercentageRef.current[i].style.marginLeft = 'calc(' + (50+(newVals[i])/2+'%') + ' - ' + window.getComputedStyle(rightPercentageRef.current[i]).width.split('px')[0]/2+'px';
    
    if (val < 15) {
      leftPercentageRef.current[i].style.visibility='hidden';
    } else {
      leftPercentageRef.current[i].style.visibility='visible';
    }
    if (val > 85) {
      rightPercentageRef.current[i].style.visibility='hidden';
    } else {
      rightPercentageRef.current[i].style.visibility='visible';
    }
  }
  
  return (
    <div className="experience-table">
      <div className='experience-table-title'>
        {title}
      </div>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th style={{width:'27%'}}>{columnTitle}</th>
              <th style={{width:'35%'}}>목표를 세운 이유</th>
              <th style={{width:'38%'}}>외적 내적 동기</th>
            </tr>
            <tr>
              <td><textarea ref={(elem) => {textAreaRefs.current[0] = elem}} onChange={(event) => onTextAreaChange(event, 0)} placeholder="입력" spellCheck='false'/></td>
              <td><textarea ref={(elem) => {textAreaRefs.current[1] = elem}} onChange={(event) => onTextAreaChange(event, 1)} placeholder="입력" spellCheck='false'/></td>
              <td>
                <div className='slidebar'>
                  <span className='slidebar-left-span'>외적 동기</span>
                  <span className='slidebar-right-span'>내적 동기</span>
                  <div ref={(elem => {leftPercentageRef.current[0] = elem})}>50%</div>
                  <input className='slidebar-input' type="range" onChange={(event) => onSliderChange(event, 0)} min="0" max="100"/>
                  <div ref={(elem => {rightPercentageRef.current[0] = elem})}>50%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td><textarea ref={(elem) => {textAreaRefs.current[2] = elem}} onChange={(event) => onTextAreaChange(event, 2)} placeholder="입력" spellCheck='false'/></td>
              <td><textarea ref={(elem) => {textAreaRefs.current[3] = elem}} onChange={(event) => onTextAreaChange(event, 3)} placeholder="입력" spellCheck='false'/></td>
              <td>
                <div className='slidebar'>
                  <span className='slidebar-left-span'>외적 동기</span>
                  <span className='slidebar-right-span'>내적 동기</span>
                  <div ref={(elem => {leftPercentageRef.current[1] = elem})}>50%</div>
                  <input className='slidebar-input' type="range" onChange={(event) => onSliderChange(event, 1)} min="0" max="100"/>
                  <div ref={(elem => {rightPercentageRef.current[1] = elem})}>50%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td><textarea ref={(elem) => {textAreaRefs.current[4] = elem}} onChange={(event) => onTextAreaChange(event, 4)}  placeholder="입력" spellCheck='false'/></td>
              <td><textarea ref={(elem) => {textAreaRefs.current[5] = elem}} onChange={(event) => onTextAreaChange(event, 5)}  placeholder="입력" spellCheck='false'/></td>
              <td>
                <div className='slidebar'>
                  <span className='slidebar-left-span'>외적 동기</span>
                  <span className='slidebar-right-span'>내적 동기</span>
                  <div ref={(elem => {leftPercentageRef.current[2] = elem})}>50%</div>
                  <input className='slidebar-input' type="range" onChange={(event) => onSliderChange(event, 2)} min="0" max="100"/>
                  <div ref={(elem => {rightPercentageRef.current[2] = elem})}>50%</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExperienceTable;
