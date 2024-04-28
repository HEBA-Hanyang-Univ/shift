import "./Footer.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { StepNavigation } from "./StepNavigation";
import NextArrow from "../../assets/images/nextArrow.svg";
import { useState } from "react";

export const GuestFooter = ({ prevPageUrl, nextPageUrl, isNextEnabled, doBeforeNext }) => {
  const navigate = useNavigate();

  const stepPaths = [
    {label: '', path: '/guest/info'},
    {label: '', path: '/guest/keyword'},
    {label: '', path: '/guest/reasoning'},
    {label: '', path: '/guest/description'},
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  
  const updateStep = (step) => {
    setCurrentStep(step);
  };

  const handlePrevPage = () => {
    if(prevPageUrl) {
      const prevStepIndex = stepPaths.findIndex(step => step.path === prevPageUrl);
      setCurrentPage(prevStepIndex);
      navigate(prevPageUrl);
      setCurrentPage(prevStepIndex);
    }
  };

  const handleNextPage = () => {
    if(isNextEnabled) {
      doBeforeNext?.();
      const nextStepIndex = stepPaths.findIndex(step => step.path === nextPageUrl);
      setCurrentStep(nextStepIndex);
      navigate(nextPageUrl);
      setCurrentPage(nextStepIndex);
    }
  };

  return (
    <div className="guestFooterContainer">
      <div className="footerWrapper">
        <div className="prevBtnBox">
          {prevPageUrl && 
            <Link to={prevPageUrl} style={{textDecoration:'none'}} onClick={handlePrevPage}>
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