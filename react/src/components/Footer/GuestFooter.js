import { useState } from "react";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import NextArrow from "../../assets/images/nextArrow.svg";

export const GuestFooter = ({ prevPageUrl, nextPageUrl, isNextEnabled }) => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    if(isNextEnabled) {
      navigate(nextPageUrl);
    }
  };

  return (
    <div className="guestFooterContainer">
      <div className="footerWrapper">
        <div className="prevBtnBox">
          {prevPageUrl && 
            <Link to={prevPageUrl} style={{textDecoration:'none'}}>
              <Button color='#9C76AC' width={5} height={2} className="prevPageBtn">
                이전
              </Button>
            </Link>}
        </div>

        <div className="nextBtnBox">
          <Button color='#9C76AC' width={5} height={2} className="nextPageBtn" onClick={handleNextPage} disabled={!isNextEnabled} >
            다음
            <img src={NextArrow} alt="nextBtn"/>
          </Button>
        </div>
      </div>
    </div>
  )
}