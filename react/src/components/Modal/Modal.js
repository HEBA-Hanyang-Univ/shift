import React, { useRef } from "react";
import "./Modal.scss";
import UseOutsideClick from "./UseOutsideClick";
import ModalContainer from "./ModalContainer";

function Modal({ onClose, className, children }) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose();
  };  

  UseOutsideClick(modalRef, handleClose);

  return (
    <ModalContainer>
      <div className="overlay">
        <div
          className="modalWrap"
          ref={modalRef}
        >
          <div className={`modalContent ${className}`}>
            {children}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default Modal;