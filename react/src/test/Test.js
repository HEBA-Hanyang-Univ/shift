import React, { useState, useEffect, useRef } from "react";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import HeadImg from "assets/images/SQ_Head.svg";

// Known Problem : If Drag or Resize over item below, Layout limitation works bad.
// What I have to do is if empty row is exist, delete them
const TestView = () => {
  const [layout, setLayout] = useState([]);
  const val = useRef(0);
  const maxCol = 10;
  const maxRow = 10;
  const gridWidth = 400;
  const gridHeight = 400;
  const gridMargin = [10, 10];

  const onLayoutChange = (newLayout) => {
    // it doesn't work that roll-back to origin now.
    // this function works when onDrag / onResize done.
    if (!isValidLayout(newLayout)) {
      console.log('invalid layout');
      revertLayout(newLayout);
    }

    setLayout(newLayout);
  };

  const revertLayout = (newLayout, oldItem, newItem, placeholder) => {
    if (oldItem != null && newItem != null && placeholder != null) {
      console.log('revert layout');
      fixItem(oldItem, newItem, placeholder);
    }
    newLayout = layout;
    console.log('before: ', layout, '\nafter: ', newLayout);
  }

  const assertLayout = (newLayout, oldItem, newItem, placeholder) => {
    if (!isValidLayout(newLayout)) {
      revertLayout(newLayout, oldItem, newItem, placeholder);
    }
  }

  const addNewComponent = () => {
    if (val.current >= 8) {
      alert('no more add!');
      return;
    }

    const emptySpace = findEmptySpace(layout);
    if (emptySpace == null) {
      alert('no where to add!');
      return;
    }

    const newItem = {
      i: val.current.toString(), // Use a unique identifier for each item
      x: emptySpace.x,
      y: emptySpace.y,
      w: 1,
      h: 1,
    };

    setLayout([...layout, newItem]);
    val.current++;
  };

  const findEmptySpace = (currentLayout) => {
    // Logic to find an empty space in the layout
    // For simplicity, just finds the first available position
    let x = 0;
    let y = 0;
    let isFull = false;
    while (isSpaceOccupied(currentLayout, x, y)) {
      x++;
      if (x >= maxCol) {
        x = 0;
        y++;
      }
      if (y >= maxRow) {
        isFull = true;
        break;
      }
    }
    if (isFull) return null;

    return { x, y };
  };

  const isSpaceOccupied = (currentLayout, x, y) => {
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

  const fixItem = (oldItem, newItem, placeholder) => {    
    newItem.w = oldItem.w;
    newItem.x = oldItem.x;
    newItem.h = oldItem.h;
    newItem.y = oldItem.y;
    if (placeholder != null) {
      placeholder.w = newItem.w;
      placeholder.x = newItem.x;
      placeholder.h = newItem.h;
      placeholder.y = newItem.y;
    }
    // the code below doesn't work
    // newItem = {...newItem, w:oldItem.w, x:oldItem.x, h:oldItem.h, y:oldItem.y};
    // placeholder = {...placeholder, w:oldItem.w, x:oldItem.x, h:oldItem.h, y:oldItem.y};
  };

  return (
    <div className="view-container" style={{display:"table", margin: "5px auto"}}>
      <div className="head-image-container" style={{display:"table-cell", verticalAlign:'middle', position:'relative', }}>
        <img src={HeadImg} style={{ width:'600px', height:'600px', }} />
      </div>
      <div className="grid-layout-container">
        <GridLayout
          layout={layout}
          onLayoutChange={onLayoutChange}
	  cols={maxCol}
	  maxRows={maxRow}
          rowHeight={gridHeight/maxRow}
	  margin={gridMargin}
          width={gridWidth}
          height={gridHeight + gridMargin[1] * (maxRow - 1)}
          compactType={null}
	  autoSize={true}
	  preventCollision={false}
	  isBounded={false}
	  onDrag={assertLayout}
	  onDragStop={assertLayout}
	  onResize={assertLayout}
        >
           {layout.map(item => (
            <div key={item.i} style={{ backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 0 0 3px #CCAFD9 inset', display:'flex', justifyContent:'center', alignItems:'center', }}>
              {/* Individual rendered components */}
              <textarea type="text" maxlength="7" size="7" rows="1"
	        style={{border: "none", textAlign:"center", width: "90%", height:"auto", fontSize:String(3.0 * (item.w/maxCol))+"rem", resize:"none", overflow:'hidden',}}
		placeholder="what's yours?"/>
            </div>
          ))}
        </GridLayout>
      </div>
      <div className="components-container">
        <button onClick={addNewComponent}>Add New</button>
      </div>
    </div>
  );
}

export default TestView;
