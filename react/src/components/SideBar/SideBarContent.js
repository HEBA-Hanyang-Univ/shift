import React, { useRef, useState } from "react";
import SQ from "assets/images/SH_sq.svg";
import ToDoImg from "assets/images/SideBarToDo.svg";
import DoneImg from "assets/images/SideBarAchieved.svg";
import Dashed from "assets/images/SideBarDashed.png";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'assets/styles/SideBar.scss';

const SideBarContent = () => {

  return (
    <div className="sideBarContentBox">
      <div className="mainTitleBox">
        <img src={SQ} alt="mainTitle img"></img>
        <div className="mainTitle">Self-definition 자기정의</div>
      </div>
      <Swiper navigation={true} modules={[Navigation]} className="subTitleBox">
        <SwiperSlide>
          <div className="subTitle">Self-questioning (자기 이해)</div>
          <div className="sideBarContentListBox">
            <ul>
              <li className="sideBarContent">
                <img src={ToDoImg}></img>
                <Link to={"/"} className="contentTitle">
                  <span>
                    MBTI 성격 분석
                  </span>
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
          
        </SwiperSlide>
        <SwiperSlide>
          <div className="subTitle">Self-defining (자기 정의)</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SideBarContent;