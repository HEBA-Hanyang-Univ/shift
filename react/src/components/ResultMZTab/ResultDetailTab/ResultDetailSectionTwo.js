import React, { forwardRef, useEffect, useState } from "react";
import "../../../assets/styles/Result/Result.scss";
import upArrowImg from "../../../assets/images/resultUpArrow.png";
import downArrowImg from "../../../assets/images/resultDownArrow.png";
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


const ResultDetailSectionTwo = forwardRef(({ keywordData, epaKeywords, setLoadStatus }, ref) => {
  const selected = [...new Set(keywordData.replies.map((reply) => reply.keyword_selected).flat())]
  const k = [];
  selected.map((keyword) => {
    k.push({
      id: keyword,
      keyword: epaKeywords[keyword][0],
      selected: false,
      selectCount: 0,
      responseCount: 0,
      visible: false,
      reason: [],
    });
  });

  keywordData.replies.map((reply) => {
    reply.keyword_selected.map((keyword) => {
      k.map((k) => {
        if (k.id === keyword) {
          k.selectCount++;
        }
      });
    });
    reply.keyword_detail.map((detail) => {
      k.map((k) => {
        if (k.id === detail.id && detail.reason.length > 0) {
          k.responseCount++;
          k.reason.push([reply.anonymous ? "익명": reply.nickname, detail.reason]);
        }
      });
    })
  });

  const sortedK = [...k].sort((a, b) => {
    if (b.selectCount !== a.selectCount) {
      return b.selectCount - a.selectCount;
    }
    return b.responseCount - a.responseCount;
  });
  const [keywords, setKeywords] = useState(sortedK);

  const slideChunks = chunkArray(keywords, 4);
  
  const toggleVisibility = (id) => {
    setKeywords(keywords.map((keyword) =>
      keyword.id === id && keyword.responseCount > 0 ? { ...keyword, visible: !keyword.visible } : keyword
    ));
  };

  const closeAllToggles = () => {
    setKeywords(keywords.map((keyword) => ({ ...keyword, visible: false })));
  };

  useEffect(()=> {
    setLoadStatus(true);
  }, [])

  return (
    <div className="rdSectionTwoContainer" ref={ref}>
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
          onSlideChange={() => closeAllToggles()}
          >
            {slideChunks.map((chunk, index) => (
              <SwiperSlide key={index}>
                {chunk.map((item, subIndex) => (
                  <div className="rdSectionTwoContentBox" key={subIndex}>
                    <div className="rdSectionTwoBtnBox">
                      <button onClick={() => toggleVisibility(item.id)} className={`${item.visible ? 'toggleActive' : ''}`}>
                        <img src={item.visible ? downArrowImg : upArrowImg} alt="upImg"/>
                      </button>
                      <div className="rdSectionTwoKeyword" onClick={() => toggleVisibility(item.id)}>
                        <span>{epaKeywords[item.id][1]} {epaKeywords[item.id][0]}</span>
                      </div>
                      <div className="rdSectionTwoCountBox">
                        <span>선택 수 {item.selectCount}</span>
                        <span>응답 수 {item.responseCount}</span>
                      </div>
                    </div>
                    <div className={`rdSectionTwoOneLineBox ${item.visible ? "rdSectionTwoOneLineBoxActive" : ""}`}>
                      {item.reason.map((reason, index) => {
                        return (
                      <div className="rdSectionTwoOneLine" key={index}>
                        <span>{reason[0]}</span>
                        <div className="rdSectionTwoOneLineText">
                          <span>{reason[1]}</span>
                        </div>
                      </div>)})}
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
});

export default ResultDetailSectionTwo;