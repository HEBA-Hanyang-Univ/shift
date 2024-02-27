import React from "react";

export const Dot = ({isActive}) => {
  return (
    <span style={{color: isActive ? '#9C76AC' : '#D9D9D9', borderRadius: '5rem'}}></span>
  )
};