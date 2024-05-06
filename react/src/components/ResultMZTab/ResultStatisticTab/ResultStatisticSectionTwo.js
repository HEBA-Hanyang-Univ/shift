import React from "react";
import "../../../assets/styles/Result/Result.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper/modules';

const slides = [
  // TODO: add data
]

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

const ResultStatisticSectionTwo = () => {

  const slideChunks = chunkArray(slides, 5);

  return (
    <section className="rstSectionTwoContainer">
      <div className="rstSectionTwoWrapper">
        <div className="rstSectionTwoTitleWrapper">
          <div className="rstSectionTwoTitle">
            <span>No.</span>
            <span>닉네임</span>
            <span>나와의 관계</span>
            <span className="rstContent">응답 날짜</span>
          </div>
        </div>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rstSectionTwoSwiper"
        >
          {slideChunks.map((chunk, index) => (
            <SwiperSlide key={index} className="rstSectionTwoSwiperSlide">
              {chunk.map((item, subIndex) => (
                <div key={subIndex} className="rstSectionTwoContentBox">
                  <div className="rstSectionTwoContentWrapper">
                    <span>{subIndex + 1}</span>
                    <span>{item.username}</span>
                    <span>{item.relation}</span>
                    <span className="rstContent">{item.date}</span>
                  </div>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ResultStatisticSectionTwo;