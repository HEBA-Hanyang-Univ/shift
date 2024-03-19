import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { Button } from "../Button/Button";
import { Dot } from "./Dot";
import NextArrow from "../../assets/images/nextArrow.svg";

export const GuestFooter = ({ prevPageUrl, nextPageUrl, isNextEnabled }) => {

  return (
    <div className="guestFooterContainer">
      <div className="footerWrapper">
        <div className="prevBtnBox">
          {prevPageUrl && 
            <Link to={prevPageUrl} style={{textDecoration:'none'}}>
              <Button color='#9C76AC' width={5} height={2.5} className="prevPageBtn">
                이전
              </Button>
            </Link>}
        </div>

        <div className="nextBtnBox">
          {nextPageUrl && 
            <Link to={nextPageUrl} style={{textDecoration:'none'}}>
              <Button color='#9C76AC' width={5} height={2} className="nextPageBtn" disabled={!isNextEnabled} >
                다음
                <img src={NextArrow} alt="nextBtn"/>
              </Button>
            </Link>}
        </div>
      </div>
    </div>
  )
}
  