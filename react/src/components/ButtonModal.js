import React, {useEffect, useRef, useState} from "react";
import "assets/styles/Modal.scss";
import UseOutsideClick from "components/UseOutsideClick";
import ModalContainer from "components/ModalContainer";
import WarningIcon from "assets/images/WarningIcon.svg";


function ButtonModal({ onClose, onClickButton, title, message, buttonMessage }) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose ?.()
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickButton?.();
    handleClose();
  }

  UseOutsideClick(modalRef, handleClose);

  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow
    };
  }, []);

  return (
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap" ref={modalRef}>
          <div className="modalContent">
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'1rem', }}>
              <img src={WarningIcon} style={{width:'2.5rem', height:'2.5rem', }}/>
            </div>
            <span className="title" style={{fontSize:'1.4rem', marginBottom:'0.2rem', fontWeight:'700', }}>
              {title}
            </span>
            {message.split('\n').map((line,i) => {return (
              <span key={i} style={{color:'#525252', fontWeight:'500', fontSize:'1.0rem', marginBottom:'2.0rem', letterSpacing: '0.04rem',}}>{line}<br/></span>
            );})}
            <button type="submit" onClick={handleSubmit}>
              <span>{buttonMessage}</span>
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ButtonModal;
