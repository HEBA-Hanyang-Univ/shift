import React, { useState } from "react";
import TryFetch from "../../FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../CookieUtils/SecureLocalStorageExtends";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper/modules';

const ResultDetailSectionTwo = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const  toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div className="rdSectionTwoContainer">
      <div className="rdSectionTwo">
        <div className="rdSectionTwoTitle">
          <div className="rdSectionTwoTitleTop">
            <span>키워드 자세히 보기</span>
          </div>
          <div className="rdSectionTwoTitleBottom">
            <span>키워드 선택 이유</span>
          </div>
        </div>
        <div className="rdSectionTwoContent">
          <Swiper className="rdSectionTwoContentSwiper">
            <SwiperSlide>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ResultDetailSectionTwo;