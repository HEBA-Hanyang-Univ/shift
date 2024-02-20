import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Hamburger.scss";

const Hamburger = () => {

  return (
    <div className="HamburgerContainer">
      <ul>
        <li>
          <Link to='/'>자기이해 검사</Link>
        </li>
        <li>
          <Link to='/'>결과 확인</Link>
        </li>
        <li>
          <Link to='/'>의견 보내기</Link>
        </li>
        <li>
          <Link to='/'>로그인</Link>
        </li>
      </ul>
    </div>
  )
};

export default Hamburger;