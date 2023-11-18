import React, {useRef, useState, useEffect, ReactElement} from "react";

import { Header } from "components/Header";
import "assets/styles/StartHomepage.scss";
import ModifyBtn from "assets/images/modifyBtn.svg";
import Dashed from "assets/images/dashedLine.png";
import Portrait from "assets/images/portrait.png";
import DropDown from "components/DropDown";

export const StartHomepage = () => {
  return (
    <>
    <Header></Header>
    <div id="SHWrap">
      <div id="SHContainer">
        {/* 상단 프로필 */}
        <div className="SHProfile">
          <div className="SHProfileLeft">
            <div className="userProfileImg">
              {/* TODO: 추 후 userImg 삽입 */}
              <img src={Portrait} alt="blanked img"></img>
            </div>
            <div className="SHProfileContent">
              <div className="userProfileBox">
                {/* TODO: 추 후 userName 삽입 */}
                <div className="userName">깍두기응애응애응님</div>
                <button className="userNameModifyBtn">
                  <img src={ModifyBtn} alt="modify button"></img>
                </button>
              </div>
              <div className="dropDownBox">
                <DropDown></DropDown>
              </div>
            </div>
          </div>
          <div className="SHProfileRight">
            <div className="SHBtnBox">
              <button className="SHBtnPurple">
                <span>시작하기</span>
              </button>
              <button className="SHBtnWhite">
                <span>결과지 확인</span>
              </button>
            </div>
            <div className="lastModifiedDate">
              <span>마지막 수정일 : </span>
              {/* TODO: 마지막 수정일 입력하기 */}
              <span>2023.09.30</span>
            </div>
          </div>
        </div>
        {/* SHIFT 진도 페이지 */}
        <div className="SHProgressTextBox">
          <div className="SHProgressText">
            <button>
              <span>S</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className="SHProgressText">
            <button>
              <span>H</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className="SHProgressText">
            <button>
              <span>I</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className="SHProgressText">
            <button>
              <span>F</span>
            </button>
            <img src={Dashed} alt="dashed img"></img>
          </div>
          <div className="SHProgressText">
            <button>
              <span>T</span>
            </button>
          </div>
        </div>
        {/* SHIFT 진도 컨텐츠 */}
        <div className="SHProgressContentBox">
          {/* S */}
          <div className="SHProgressContentS"> 
            <div className="SHProgressTitle">
              <div className="SHProgressTitleMain">
                Self Defining
              </div>
              {/* TODO: 코스마다 해당 페이지로 이동 */}
              <div className="SHProgressTitleLink">
                코스 자세히 보기
              </div>
            </div>
            <div className="SHProgressSubTitleS">
              <div className="SHProgressSubTitleSSpan">
                Self-questioning
              </div>
              <div className="SHProgressSubTitleSSpan">
                Self Inspection
              </div>
              <div className="SHProgressSubTitleSSpan">
                SWOT Analysis
              </div>
              <div className="SHProgressSubTitleSSpan">
                External Perception Analysis
              </div>
              <div className="SHProgressSubTitleSSpan">
                Self Profiling
              </div>
            </div>
            <div className="SHProgressDetailBox">

            </div>
          </div>
        </div>
        {/* 진행률 */}
        <div className="SHProgressBarBox">
          <span>진행률</span>
          <div className="SHProgressBar">
            <div className="SHProgre    ssbarColored"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
