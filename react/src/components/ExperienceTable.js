import React, { useState, useEffect, useRef } from "react";
import 'assets/styles/ExperienceTable.scss'

const ExperienceTable = ({title, columnTitle, numsOfRow, initialData, onChange}) => {
  const [values, setValues] = useState([]);
  const textAreaRefs = useRef([]);
  const cellHeightRef = useRef(null);

  const leftPercentageRef = useRef([]);
  const rightPercentageRef = useRef([]);
  const sliderRef = useRef([]);

  const data = useRef(initialData);

  useEffect(() => {
    for (let i in data.current) {
      values[i] = data.current[i].rate;
      textAreaRefs.current[i*2].value = data.current[i][0];
      textAreaRefs.current[i*2+1].value = data.current[i][1];
    }
    cellHeightRef.current = window.getComputedStyle(document.getElementsByTagName('tr')[0]).height.split('px')[0];
    for (const textArea of textAreaRefs.current) {
      resizeTextarea(textArea);
    }
    for (let i = 0; i < numsOfRow; i++) {
      setPercentageText(i, values[i]);
      setSliderStyle(i, values[i])
      sliderRef.current[i].value = values[i];
    }
  }, []);

  const onTextAreaChange = (e, i) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();

    data.current[Math.floor(i/2)][i%2] = e.target.value;
    resizeTextarea(textAreaRefs.current[i]);
    onChange(title, data.current);
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

  const setSliderStyle = (i, value) => {
    const val = 4 + value * 92/100;
    sliderRef.current[i].style.background = 'linear-gradient(to right, #FDA746 0%, #FDA746 ' + val + '%, #B689C8 ' + val + '%, #B689C8 100%)';
    
    if (val >= 50) {
      sliderRef.current[i].style.setProperty('--sliderBackground', 'linear-gradient(90deg, #FDA541 7.53%, #ECB77B 91.5%)');
    } else {
      sliderRef.current[i].style.setProperty('--sliderBackground', 'linear-gradient(270deg, #B689C8 19%, #B576CE 80.4%)');
    }

    setPercentageText(i, value);
  }

  const onSliderChange = (e, i) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();

    setSliderStyle(i, e.target.value);

    data.current[i].rate = e.target.value;
    onChange(title, data.current);
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

  const makeTable = (num) => {
    let result = [];
    for (let i = 0; i < num; i++) {
      result.push(
        <tr key={i}>
          <td><textarea ref={(elem) => {textAreaRefs.current[i*2] = elem}} onChange={(event) => onTextAreaChange(event, i*2)} placeholder="입력" spellCheck='false'/></td>
          <td><textarea ref={(elem) => {textAreaRefs.current[i*2+1] = elem}} onChange={(event) => onTextAreaChange(event, i*2+1)} placeholder="입력" spellCheck='false'/></td>
          <td>
            <div className='slidebar'>
              <span className='slidebar-left-span'>외적 동기</span>
              <span className='slidebar-right-span'>내적 동기</span>
              <div ref={(elem => {leftPercentageRef.current[i] = elem})}>50%</div>
              <input className='slidebar-input' type="range" ref={(elem) => {sliderRef.current[i] = elem}} onChange={(event) => onSliderChange(event, i)} min="0" max="100"/>
              <div ref={(elem => {rightPercentageRef.current[i] = elem})}>50%</div>
            </div>
          </td>
        </tr>
      );
    }
    return result;
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
            {makeTable(numsOfRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExperienceTable;
