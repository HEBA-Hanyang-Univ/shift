import React, { useRef } from "react";
import "./Modal.scss";
import UseOutsideClick from "./UseOutsideClick";
import ModalContainer from "./ModalContainer";

function Modal({ isOpen, onClose, width, height, children }) {
  const modalRef = useRef(null);

  UseOutsideClick(modalRef, () => {
    if(isOpen) {
      onClose();
    }
  });

  if(!isOpen) return null;

  return (
    <ModalContainer>
      <div className="overlay">
        <div
          className="modalWrap"
          ref={modalRef}
          width={width}
          height={height}  
        >
          <div className="modalContent">
            {children}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default Modal;