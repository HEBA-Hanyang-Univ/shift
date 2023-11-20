import React, { useState, useEffect, useRef } from "react";
// import interact from "interactjs";
// to drag in mobile safari, it's better use interactjs than onDrag in HTML5 I guess..

const ToolBoxItem = ({onTakeItem, item, value}) => {

  const inputRef = useRef(null);

  const onDragEnd = (event) => {
    event.preventDefault();
    const headImg = document.getElementById('SQ_Head');
    const pointX = event.clientX;
    const pointY = event.clientY;
    const imgRect = headImg.getBoundingClientRect();
    if (pointX >= imgRect.left && pointX <= imgRect.right && pointY >= imgRect.top && pointY <= imgRect.bottom) {
      onTakeItem(item, inputRef.current.value ? inputRef.current.value : inputRef.current.placeholder);
    }
  }

  return (
    <div key={item.i} style = {{ backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 0 0 3px #CCAFD9 inset', display:'flex', justifyContent:'center', alignItems:'center', width: '7rem', height: '7rem',}}
      className="toolbox__items__item"
      draggable="true" onDragEnd={onDragEnd}
    >
      <input className="toolbox_item_input" type="text" maxLength="7" size="7" rows="1" id={item.i} ref={inputRef}
        style={{border: "none", textAlign:"center", width: "90%", height:"auto", fontSize:"1.0rem",  overflow:'hidden',}}
        placeholder={value || "what's yours?"}/>
    </div>
  );
};

const ToolBox = ({onTakeItem, items, values}) => {
  return (
    <div className="toolbox">
      <span className="toolbox__title">Toolbox</span>
      <div className="toolbox__items">
        {items.map(item => (
          <ToolBoxItem
            key={item.i}
            item={item}
            onTakeItem={onTakeItem}
            value={values[item.i]}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolBox;
