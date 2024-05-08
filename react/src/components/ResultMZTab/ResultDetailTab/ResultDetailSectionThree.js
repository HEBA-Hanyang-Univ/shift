import React, { useState, useEffect } from "react";
import TryFetch from "../../FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../CookieUtils/SecureLocalStorageExtends";
import { Swiper, SwiperSlide } from "swiper/react";


import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper/modules';


function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
};

const ResultDetailSectionThree = ({keywordData}) => {

  const slides = [];

  keywordData.replies.map((reply) => {
    const data = {
      username: reply.anonymous ? "익명" : reply.nickname,
      relationship: reply.relationship,
      intro: reply.one_line_intro
    }
    slides.push(data);
  });
  const slideChunks = chunkArray(slides, 5);

  return (
    <section className="rdSectionThreeContainer">
      <div className="rdSectionThreeWrapper">
        <div className="rdSectionThreeTitle">
          <span>한 줄 정의 자세히 보기</span>
        </div>
        <div className="rdSectionThreeContent">
          <div className="rdSectionThreeContentTitleWrapper">
            <div className="rdSectionThreeContentTitle">
              <span className="contentTitleName">응답자</span>
              <span>나와의 관계</span>
              <span>{keywordData.nickname}은(는)</span>
            </div>
          </div>
          <Swiper
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}">${index + 1}</span>`;
              },
            }}
            modules={[Pagination]}
            className="rdSectionThreeSwiper"
          >
            {slideChunks.map((chunk, index) => (
              <SwiperSlide key={index} className="rdSectionThreeSwiperSlide">
                {chunk.map((item, subIndex) => (
                  <div className="rdSectionThreeSwiperSlideContentBox" key={subIndex}>
                    <div className= "rdSectionThreeSwiperSlideContent">
                      <span className="contentTitle">{item.username}</span>
                      <span className="contentRelationship">{item.relationship}</span>
                      <span className="contentDes">{item.intro}(이)다.</span>
                    </div>
                  </div>
                ))}
              </SwiperSlide>
            ))}
          </Swiper>       
        </div>
      </div>
    </section>
  )
}

export default ResultDetailSectionThree;