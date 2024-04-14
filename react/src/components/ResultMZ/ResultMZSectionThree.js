import React from "react";
import "../../assets/styles/Result/Result.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

import {Scrollbar} from "swiper/modules";

const ResultMZSectionThree = ({username}) => {


  return (
    <div className="rsSectionThree">
      <div className="rsSectionThreeTitle">
        <div className="rsSectionThreeTitleText">
          <span className="titlePurple">{username}</span>
          <span className="titleBlack">님의 한 줄 정의</span>
        </div>
        <div className="rsSectionThreeDetail">
          <span>
            자세히보기 {'>'}
          </span>
        </div>
      </div>
      <div className="rsSectionThreeContent">
        <div className="rsSectionThreeContentTitle">
          <span className="titlePurple">{username}</span>
          <span className="titleBlack">님은</span>
        </div>
        <div className="rsSectionThreeSpin">
          <Swiper
            direction={"vertical"}
            className="rsSwiperWrapper"
            spaceBetween={0}
            slidesPerView={3}
            loop={true}
            resistance={false}
            centeredSlides={true}
            modules={[Scrollbar]}
          >
            <SwiperSlide>1</SwiperSlide>
            <SwiperSlide>2</SwiperSlide>
            <SwiperSlide>3</SwiperSlide>
            <SwiperSlide>4</SwiperSlide>
            <SwiperSlide>5</SwiperSlide>
            {/* infinite scroll works when the preview is more than the slide. */}
            <SwiperSlide>1</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ResultMZSectionThree;