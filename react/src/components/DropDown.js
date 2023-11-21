import React, { useState } from 'react';
import "assets/styles/DropDown.scss";
import Arrow from "assets/images/dropDown.svg";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('1번째 SHIFT');
  
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className='dropDownWrapper'>
      <button onClick={toggleOpen}>
        <span>{selectedItem}</span>
        <img src={Arrow} alt='dropdown arrow img'></img>
      </button>    
      {isOpen && (
        <ul className='dropDownUl'>
          <li onClick={() => handleItemClick('1번째 SHIFT')}>1번째 SHIFT</li>
          <li onClick={() => handleItemClick('2번째 SHIFT')}>2번째 SHIFT</li>
        </ul>
      )}
    </div>
  )
}

export default DropDown;