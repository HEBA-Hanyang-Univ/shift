import React, { useState, useEffect, useRef } from "react";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import HeadImg from "assets/images/SQ_Head.svg";
import ToolBox from "test/ToolBox";


// Known Problem : If Drag or Resize over item below, Layout limitation works bad.
// What I have to do is if empty row is exist, delete them
const TestView = () => {
  const [layout, setLayout] = useState([]);
  const [archived, setArchived] = useState([]);
  const inputs = useRef([]);
  const [inputValues, setInputValues] = useState({});
  const val = useRef(0);
  const maxCol = 7;
  const maxRow = 9;
  const gridWidth = 280;
  const gridHeight = 360;
  const gridMargin = [10, 10];
  const [compactType, setCompactType] = useState(null);

  let archivedList = [];

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
  };

  const onTakeItem = (item, value) => {
    let w = item.w;
    let h = item.h;
    let emptySpace = findEmptySpace(layout, w, h);
    if (emptySpace == null) {
      w = 1;
      h = 1;
      emptySpace = findEmptySpace(layout, w, h);
    }
    if (emptySpace == null) {
      alert('no where to place!');
      return;
    }
    item.x = emptySpace.x;
    item.y = emptySpace.y;
    item.w = w;
    item.h = h;
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
      if (item.x + item.w > maxCol || item.y + item.h > maxRow) {
        item.x = 0;
        item.w = item.w > 2 ? 2 : item.w;
        item.y = 0;
        item.h = item.h > 2 ? 2 : item.w;
        deleteList = [...deleteList, item];
      }
    });
    console.log(deleteList);
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
      w: 1,
      h: 1,
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
      x++;
      if (x >= maxCol - (w-1)) {
        x = 0;
        y++;
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
    return (item.x + item.w <= maxCol && item.y + item.h <= maxRow);
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

  return (
    <div className="view-container" style={{display:"table", margin: "5px auto"}}>
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
            preventCollision={false}
            isBounded={false}
            style={{ position:'absolute', top:40, left:120, }}
          >
             {layout.map(item => (
              <div key={item.i} style={{ backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 0 0 3px #CCAFD9 inset', display:'flex', justifyContent:'center', alignItems:'center', }}>
                {/* Individual rendered components */}
                <div className="hide-button" style={{ cursor:'pointer', position:'absolute', fontSize:String(5.0 * (item.w * item.h)>3 ? 1.0 : 0.5)+"rem", top:0, right:item.w > 2 ? 5 : 0,}} onClick={() => onPutItem(item)}>&times;</div>
                <input type="text" maxLength="7" size="7" rows="1" id={item.i} ref={elem => inputs.current[item.i] = elem}
                  style={{border: "none", textAlign:"center", width: "80%", height:"auto", fontSize:String(3.0 * (item.w>3 ? 1.0 : item.w*0.3) * ((item.h > 2) ? 1.0 : item.h*0.3))+"rem",  overflow:'hidden',}}
                  placeholder={inputValues[item.i] || "what's yours?"}/>
              </div>
            ))}
          </GridLayout>
        </div>
        <img src={HeadImg} style={{ width:'600px', height:'600px', }} id='SQ_Head'/>
      </div>
      <ToolBox onTakeItem={onTakeItem} items={archived || [] } values={inputValues}/>
      <div className="components-container">
        <button onClick={addNewComponent}>Add New</button>
      </div>
    </div>
  );
}

export default TestView;
