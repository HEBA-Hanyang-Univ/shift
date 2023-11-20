import React, { useState, useEffect, useRef } from "react";

const PageTitle = ({korean, english, subIcon, subTitle}) => {

  return (
    <div className="page-title" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'1.5rem 0 1.5rem 0', borderBottom: '1px solid #E6E6E6', marginBottom:'1.0rem'}}>
      <div className="korean-title" style={{color:'#9C76AC', fontFamily:'Wanted Sans', fontSize:'2.5rem', fontWeight:'700'}}>
        <span>{korean}</span>
      </div>
      <div className="english-title" style={{color:'#9C76AC', fontFamily:'Wanted Sans', fontSize:'3.0rem', fontWeight:'700'}}>
        <span>{english}</span>
      </div>
      <div className="sub-title" style={{display:'flex', color:'#44344D', fontFamily:'Wanted Sans', fontSize:'1.0rem', fontWeight:'700', marginTop:'1rem', }}>
        <img src={subIcon} style={{width:'1.5rem', height:'1.5rem', marginRight: '0.3rem' }}/>
        <span>{subTitle}</span>
      </div>
    </div>
  );
};

export default PageTitle;
