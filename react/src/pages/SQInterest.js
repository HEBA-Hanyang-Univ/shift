import React, { useState, useEffect, useRef } from "react";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import HeadImg from "assets/images/SQ_Head.svg";
import AddButtonImg from "assets/images/AddBtnImg.svg"
import ToolBox from "components/ToolBox";
import PageTitle from "components/PageTitle";
import PageSubTitleIcon from "assets/images/portrait.png"; // TODO : change icon. this is a temporary.
import { Header } from "components/Header";
import { Footer } from "components/Footer";

// Known Problem : If Drag or Resize over item below, Layout limitation works bad.
// What I have to do is if empty row is exist, delete them
const SQInterest = () => {
  const [layout, setLayout] = useState([
    {w:4, h:35, x:0, y:0, i:'101', static:true},
    {w:6, h:6, x:4, y:0, i:'102', static:true},
    {w:4, h:2, x:4, y:6, i:'103', static:true},
    {w:3, h:2, x:4, y:8, i:'104', static:true},
    {w:2, h:2, x:4, y:10, i:'105', static:true},
    {w:2, h:2, x:4, y:28, i:'106', static:true},
    {w:3, h:2, x:4, y:30, i:'107', static:true},
    {w:4, h:3, x:4, y:32, i:'108', static:true},
    {w:20, h:2, x:10, y:0, i:'109', static:true},
    {w:3, h:2, x:10, y:2, i:'110', static:true},
    {w:1, h:1, x:13, y:2, i:'111', static:true},
    {w:2, h:1, x:28, y:2, i:'112', static:true},
    {w:5, h:4, x:30, y:0, i:'113', static:true},
    {w:2, h:2, x:33, y:4, i:'114', static:true},
    {w:5, h:8, x:35, y:0, i:'115', static:true},
    {w:2, h:2, x:36, y:8, i:'116', static:true},
    {w:2, h:27, x:38, y:8, i:'117', static:true},
  ]);
  const [archived, setArchived] = useState([]);
  const inputs = useRef([]);
  const [inputValues, setInputValues] = useState({});
  const val = useRef(0);
  const maxCol = 40;
  const maxRow = 35;
  const gridWidth = 400;
  const gridHeight = 300;
  const minW = 3;
  const minH = 3;
  const gridMargin = [3, 3];
  const [compactType, setCompactType] = useState(null);

  let archivedList = [];
  let totalArea = useRef(0);

  const onLayoutChange = (newLayout) => {
    for (let item of archivedList) {
      newLayout = newLayout.filter((elem) => elem.i !== item.i);
    }
    archivedList = [];

    if (!isValidLayout(newLayout)) {
      setCompactType("vertical");
      assertLayout(newLayout);
    } else {
      setCompactType(null);
      setLayout(newLayout);
    }
    totalArea.current = 0;
    newLayout.map((item) => {
      if (item.static) return;
      totalArea.current += item.w*item.h
    });
  };

  const onTakeItem = (item, value) => {
    let w = item.w;
    let h = item.h;
    let emptySpace = null;
    while(emptySpace == null && w >= minW && h >= minH) {
      emptySpace = findEmptySpace(layout, w, h);
      if (w > minW) { w -= 1; }
      if (h > minH) { h -= 1; }
    }
    if (emptySpace == null) {
      alert('no where to place!');
      return;
    }
    item.x = emptySpace.x;
    item.y = emptySpace.y;
    item.w = w > minW ? w : minW;
    item.h = h > minH ? h : minH;
    setArchived(archived.filter((elem) => elem.i !== item.i));
    setLayout([...layout, item]);
    setInputValues({...inputValues, [item.i]:value});
  };

  const onPutItem = (item) => {
    setInputValues({...inputValues, [item.i]:inputs.current[item.i].value ? inputs.current[item.i].value : inputs.current[item.i].placeholder});
    setArchived([...archived, item]);
    setLayout(layout.filter((elem) => elem.i !== item.i));
  };

  const assertLayout = (newLayout) => {
    let deleteList = [];
    newLayout.map((item) => {
      if (!isValidItem(item)) {
        item.x = 0;
        item.w = minW;
        item.y = 0;
        item.h = minH;
        deleteList = [...deleteList, item];
      }
    });
    for (let el of deleteList) {
      onPutItem(el);
    }
  }

  const addNewComponent = () => {
    if (val.current >= 8) {
      alert('no more add!');
      return;
    }
    // for now, there's no need to check empty space here
    // const emptySpace = findEmptySpace(layout, 1, 1);
    // if (emptySpace == null) {
    //   alert('no where to add!');
    //   return;
    // }
    const newItem = {
      i: val.current.toString(), // Use a unique identifier for each item
      x: 0, // x: emptySpace.x
      y: 0, // y: emptySpace.y
      w: 7,
      h: 7,
      minW: minW,
      minH: minH,
      resizeHandles: ['nw', 'sw', 'ne', 'se'],
    };
    setArchived([...archived, newItem]);
    val.current++;
  };

  const findEmptySpace = (currentLayout, w, h) => {
    // Logic to find an empty space in the layout
    // For simplicity, just finds the first available position
    let x = 0;
    let y = 0;
    let isFull = false;
    while (isSpaceOccupied(currentLayout, x, y, w, h)) {
      x+=minW;
      if (x >= maxCol - (w-1)) {
        x = 0;
        y+=minH;
      }
      if (y >= maxRow - (h-1)) {
        isFull = true;
        break;
      }
    }
    if (isFull) return null;

    return { x, y };
  };
  const isSpaceOccupied = (currentLayout, x, y, w, h) => {
    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        if (isCellOccupied(currentLayout, i, j)) {
          return true;
        }
      }
    }
    return false;
  };

  const isCellOccupied = (currentLayout, x, y) => {
    // Check if the specified space is occupied by an existing item
    return currentLayout.some(item => item.x <= x && x < item.x + item.w && item.y <= y && y < item.y + item.h);
  };

  const isValidLayout = (currentLayout) => {
    // Check the layout is valid
    return !currentLayout.some(item => !isValidItem(item));
  };

  const isValidItem = (item) => {
    return (item.static || (item.x + item.w <= maxCol && item.y + item.h <= maxRow));
  };

  const onDragStop = (newLayout, oldItem, newItem, placeholder, e) => {
    const headImg = document.getElementById('SQ_Head');
    const pointX = e.clientX;
    const pointY = e.clientY;
    const imgRect = headImg.getBoundingClientRect();
    if (pointX < imgRect.left || pointX > imgRect.right || pointY < imgRect.top || pointY > imgRect.bottom) {
      // this doens't work due to assignment to state works lazy...
      onPutItem(newItem); // onPutItem(oldItem);
      archivedList = [...archivedList, newItem];
    }
  }

  const calcFontSize = (width, height) => {
    height = height < 20 ? height : 20;
    width = width < 20 ? width : 20;
    const m = height > 10 ? 0.14
              : height > 4 ? height * 0.014
              : 0.04;

    const fontSize = width * m;
    return String(fontSize) + 'rem';
  };

  const onClickNext = () => {

  }

  return (
    <div className="sq-interest">
      <Header/>
      <PageTitle korean="동기" english="Self-questioning" subIcon={PageSubTitleIcon} subTitle="관심사 정리"/>
      <div className="view-container" style={{display:"table", margin: "5px auto 10rem auto"}}>
        <div className="head-image-container" style={{display:"table-cell", verticalAlign:'middle', position:'relative', }}>
          <div className="grid-layout-container">
            <GridLayout
              layout={layout}
              onLayoutChange={onLayoutChange}
              onDragStop={onDragStop}
              cols={maxCol}
              maxRows={maxRow}
              rowHeight={gridHeight/maxRow}
              margin={gridMargin}
              width={gridWidth + gridMargin[0] * (maxCol - 1)}
              height={gridHeight + gridMargin[1] * (maxRow - 1)}
              compactType={compactType}
              autoSize={true}
              preventCollision={true}
              isBounded={false}
              style={{ position:'absolute', }}
            >
               {layout.map(item => (
                <div key={item.i} style={{ visibility:item.static?'hidden':'visible', backgroundColor: 'white',
                borderRadius: '50%', boxShadow: '0 0 0 3px #CCAFD9 inset', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', }}>
                  {/* Individual rendered components */}
                  <input type="text" maxLength="7" size="7" rows="1" id={item.i} ref={elem => inputs.current[item.i] = elem}
                    style={{border: "none", textAlign:"center", width: "80%", height:"auto",
                            fontSize:calcFontSize(item.w, item.h), overflow:'hidden', display:'flex', fontFamily:'Wanted Sans',}}
                    placeholder={inputValues[item.i] || "what's yours?"}/>
                  <div style={{ display:'flex' }}>
                    <span style={{fontSize:calcFontSize(item.w*0.5, item.h)}}>{Math.round(item.w*item.h/totalArea.current*100)  }%</span>
                  </div>
                </div>
              ))}
            </GridLayout>
          </div>
          <img src={HeadImg} style={{ width:'600px', height:'600px', }} id='SQ_Head'/>
        </div>
        <ToolBox onTakeItem={onTakeItem} items={archived || [] } values={inputValues}/>
        <div className="components-container">
          <button onClick={addNewComponent} style={{width:'3.5rem', height:'3.5rem',}}>
            <img src={AddButtonImg} style={{width:'100%', height:'100%',}}/>
          </button>
        </div>
      </div>
      <Footer link={'/sq-experience'} helpContent={"자신의 관심사를 브레인 맵으로 정리해보세요."} onClickButton={onClickNext}/>
    </div>
  );
}

export default SQInterest;
