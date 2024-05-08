import React from "react";
import "../../../assets/data/MZ/stateData";
import stateData from "../../../assets/data/MZ/stateData";

// content component
function BottomSection({ content }) {
  return (
    <div className="rdBottomContentBox">
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


const ResultDetailSectionOne = ({ keywordData }) => {
  const matchMyself = [...[keywordData.replies.map((reply) => reply.keyword_in_myself).flat()]]
  const selected = [...new Set(keywordData.replies.map((reply) => reply.keyword_selected).flat())]
  const wantNotSelected = [...keywordData.keyword_want.filter((keyword) => !selected.includes(keyword)).flat()]
  const matchOthers = [...[keywordData.replies.map((reply) => reply.keyword_in_others).flat()]]
  // TODO: need to add adjuster for the score. now it's just 1
  const tpScore = matchMyself.length / (keywordData.replies.length * 5) * 100 * 1; 
  const rcScore = wantNotSelected.length / (keywordData.replies.length * 5) * 100 * 1;
  const osScore = matchOthers.length / (keywordData.replies.length * 5) * 100 * 1;

  const mzType = (tpScore > 50 ? "T" : "P") + (rcScore > 50 ? "R" : "C") + (osScore > 50 ? "O" : "S");

  const setData = stateData[mzType]

  const {
    title,
    subTitle,
    img,
    hashTagTop,
    hashTagBottom,
    mzPower,
    sectionThreeTitle,
    sectionThreeContent
  } = setData;

  return (
    <div id="Container">
      <div className="rdWrapper">
        <section className="rdTop">
          <div className="rdTopTitle">
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
        <section className="rdMiddle">
          <RangeDisplay
            className="rangeMZ"
            style={{marginTop: '-1rem !important'}}
            label1="MZ력"
            label2="꼰대력" 
            value={mzPower}
          />
          <RangeDisplay 
            className="rangeTP"
            label1="T" 
            label1Span="투명성" 
            label2="P" 
            label2Span="은폐성" 
            value={tpScore}
          />
          <RangeDisplay 
            className="rangeRC"
            label1="R" 
            label1Span="저항성" 
            label2="C" 
            label2Span="순응성" 
            value={rcScore}
          />
          <RangeDisplay 
            className="rangeOS"
            label1="O" 
            label1Span="객관성" 
            label2="S" 
            label2Span="주관성" 
            value={osScore}
          />
        </section>
        <section className="rdBottom">
          <div className="rdBottomTitle">
            <span>{sectionThreeTitle}</span>
          </div>
          <div className="rdBottomContentWrapper">
            <BottomSection content={sectionThreeContent} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultDetailSectionOne;
