import React from "react";
import "./Footer.scss";
import { Dot } from "./Dot";

export const GuestFooter = ({ currentPage, totalPages, goToPrevPage, goToNextPage}) => {
  
  const renderDots = () => {
    let dots = [];
    for (let i = 1; i <= totalPages; i++) {
      dots.push(<Dot key={i} isActive={i === currentPage} />)
    }
    return dots;
  };

  return (
    <div className="footerContainer">
      <div className="footerWrapper">
        <div className="footerDotWrapper">
          {/* prev btn - show up when currentPage is bigger than 1 */}
          {currentPage > 1 && (
            <button onClick={goToPrevPage} className="prevButton">이전</button>
          )}
          {renderDots()}
          {/* next btn - show up when current page is smaller than total pages */}
          {currentPage < totalPages && (
            <button onClick={goToNextPage} className="nextButton">다음</button>
          )}
        </div>
      </div>
    </div>
  )
};
  