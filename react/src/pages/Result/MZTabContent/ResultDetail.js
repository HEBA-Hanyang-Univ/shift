import React from "react";
import "../../../assets/data/MZ/stateData";
import stateData from "../../../assets/data/MZ/stateData";

// content component
function SectionThree({ content }) {
  return (
    <div className="rdSectionThreeContentBox">
      {content.map((paragraph, index) => (
        <span key={index}><br/>{paragraph}<br/></span>      
      ))}
    </div>
  );
}

// hashTag component
function HashTagComponent({ hashTagTop, hashTagBottom}) {
  return (
    <div className="rdHashTagBox">
      <div className="rdHashTagTop">
        {hashTagTop.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <div className="rdHashTagBottom">
        {hashTagBottom.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

// meterValues
// meterValues example : {MZ: 50, T: 70, R: 30, O: 25}
function RangeDisplay ({className, label1, label1Span, label2, label2Span, value}) {
  return (
    <div className={`rangeDisplay ${className}`}>
      <div className="rangeSpan">
        <span className="rangeLabel">{label1}</span>
        <span className="rangeLabel">{label1Span}</span>
        <span className="rangeValue">{value}%</span>
      </div>
      <meter min={0} max={100} value={value} />
      <div className="rangeSpan">
        <span className="rangeLabel">{label2}</span>
        <span className="rangeLabel">{label2Span}</span>
        <span className="rangeValue">{100 - value}%</span>
      </div>
    </div>
  );
}


const ResultDetail = ({ mzType, meterValues }) => { 

  // 기본 값 TRO
  const setData = stateData[mzType] || stateData.TRO;

  const {
    title,
    subTitle,
    img,
    hashTagTop,
    hashTagBottom,
    sectionThreeTitle,
    sectionThreeContent
  } = setData;

  return (
    <div id="Container">
      <div className="rdWrapper">
        <section className="rdSectionOne">
          <div className="rdSectionTitle">
            <div className="rdMainTitle">
              <span>{title}</span>
            </div>
            <div className="rdSubTitle">
              <span>{subTitle}</span>
            </div>
          </div>
          <div className="rdImgBox">
            <img src={img} alt="mz img" />
          </div>
          <HashTagComponent hashTagTop={hashTagTop} hashTagBottom={hashTagBottom} />
        </section>
        <section className="rdSectionTwo">
          <RangeDisplay
            className="rangeMZ"
            style={{marginTop: '-1rem !important'}}
            label1="MZ력"
            label2="꼰대력" 
            value={meterValues.MZ} 
          />
          <RangeDisplay 
            className="rangeTP"
            label1="T" 
            label1Span="투명성" 
            label2="P" 
            label2Span="은폐성" 
            value={meterValues.T} 
          />
          <RangeDisplay 
            className="rangeRC"
            label1="R" 
            label1Span="저항성" 
            label2="C" 
            label2Span="순응성" 
            value={meterValues.R} 
          />
          <RangeDisplay 
            className="rangeOS"
            label1="O" 
            label1Span="객관성" 
            label2="S" 
            label2Span="주관성" 
            value={meterValues.O} 
          />
        </section>
        <section className="rdSectionThree">
          <div className="rdSectionThreeTitle">
            <span>{sectionThreeTitle}</span>
          </div>
          <div className="rdSectionThreeContentWrapper">
            <SectionThree content={sectionThreeContent} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultDetail;
