import React, { useState, useEffect, useRef } from "react";

const ToolBoxItem = ({onTakeItem, item}) => {
  return (
    <div
      className="toolbox__items__item"
      onClick={onTakeItem.bind(undefined, item)}
    >
      {item.i}
    </div>
  );
};

const ToolBox = ({onTakeItem, items}) => {
  return (
    <div className="toolbox">
      <span className="toolbox__title">Toolbox</span>
      <div className="toolbox__items">
        {items.map(item => (
          <ToolBoxItem
            key={item.i}
            item={item}
            onTakeItem={onTakeItem}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolBox;
