import React, { useState } from "react";
import "../../../assets/styles/Result/Result.scss";
import upArrowImg from "../../../assets/images/resultUpArrow.png";
import downArrowImg from "../../../assets/images/resultDownArrow.png";
import TryFetch from "../../FetchComponent/FetchComponent";
import { loadDataWithExpiration, saveDataWithExpiration } from "../../CookieUtils/SecureLocalStorageExtends";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

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

const ResultDetailSectionTwo = ({ data }) => {

  // 데이터 받아올 때 isVisible 값 추가
  const [keywords, setKeywords] = useState([
    { id: 0, keyword: "방구를 잘 뀌는", selected: false, selectCount: 5, responseCount: 2, visible: false },
    { id: 1, keyword: "방구를 잘 뀌는", selected: false, selectCount: 5, responseCount: 2, visible: false },
    { id: 2, keyword: "방구를 잘 뀌는", selected: false, selectCount: 5, responseCount: 2, visible: false },
    { id: 3, keyword: "방구를 잘 뀌는", selected: false, selectCount: 5, responseCount: 2, visible: false },
    { id: 4, keyword: "방구를 잘 뀌는", selected: false, selectCount: 5, responseCount: 2, visible: false },   
  ]);

  const slideChunks = chunkArray(keywords, 4);

  // const [keywords, setKeywords] = useState();

  const toggleVisibility = (id) => {
    setKeywords(keywords.map((keyword) =>
      keyword.id === id ? { ...keyword, visible: !keyword.visible } : keyword
    ));
  };

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
          <Swiper 
            className="rdSectionTwoContentSwiper"
            pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}">${index + 1}</span>`;
            },
          }}
          modules={[Pagination]}
          >
            {slideChunks.map((chunk, index) => (
              <SwiperSlide key={index}>
                {chunk.map((item, subIndex) => (
                  <div className="rdSectionTwoContentBox" key={subIndex}>
                    <div className="rdSectionTwoBtnBox">
                      <button onClick={() => toggleVisibility(item.id)} className={`${item.visible ? 'toggleActive' : ''}`}>
                        <img src={item.visible ? downArrowImg : upArrowImg} alt="upImg"/>
                      </button>
                      {/* TODO: 키워드 받아오기 */}
                      <div className="rdSectionTwoKeyword">
                        <span>방구를 잘 뀌는</span>
                      </div>
                      {/* TODO: 선택수, 응답 수 */}
                      <div className="rdSectionTwoCountBox">
                        <span>선택 수 {item.selectCount}</span>
                        <span>응답 수 {item.responseCount}</span>
                      </div>
                    </div>
                    <div className={`rdSectionTwoOneLineBox ${item.visible ? "rdSectionTwoOneLineBoxActive" : ""}`}>
                      {/* 닉네임과 한줄 평 */}
                      <div className="rdSectionTwoOneLine">
                        <span>이름</span>
                        <div className="rdSectionTwoOneLineText">
                          <span>한줄평</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                ))}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ResultDetailSectionTwo;