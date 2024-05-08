import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/Result/Result.scss";

const ResultSummarySectionTwo = ({ keywordData, epaKeywords }) => {

  const username = keywordData.nickname;
  //TODO : Add logic to determine type of user
  const typeOfUser = "자기주장형"; // keyword

  const matchMyself = [...new Set(keywordData.replies.map((reply) => reply.keyword_in_myself).flat())]
  const selected = [...new Set(keywordData.replies.map((reply) => reply.keyword_selected).flat())]
  const boxData = {
    1: matchMyself,
    2: [...new Set(keywordData.replies.map((reply) => reply.keyword_not_in_myself).flat())],
    3: [...new Set(keywordData.keyword_myself.filter((keyword) => !matchMyself.includes(keyword)).flat())],
    4:[...new Set(keywordData.keyword_want.filter((keyword) => !selected.includes(keyword)).flat())],
  }

  return (
    <div className="rsSectionTwo">
      <div className="rsSectionTwoTitle">
        {/* TODO : 추후 유형과 이름 넣기 */}
        <span style={{color: "#A570C4"}}>{username}</span>
        <span>님은&nbsp;</span>
        <span style={{color: "#A570C4"}}>{typeOfUser}</span>
        <span>입니다</span>
      </div>
      <div className="rsSectionTwoLink">
          <Link to="/result">
            <button>
              <span>
                자세히 보기 {'>'}
              </span>
            </button>
          </Link>
      </div>
      <div className="rsSectionTwoGraphWrapper">
        <div className="rsSectionTwoGraphBox">
          <div className="rsSectionTwoGraph">
            <div className="colHeadOne">
              <span>
                내가 아는 나
              </span>
            </div>
            <div className="colHeadTwo">
              <span>
                내가 모르는 나
              </span>
            </div>
            <div className="rowHeadOne">
              <span>
                타인이<br/>아는 나
              </span>
            </div>
            <div className="rowHeadTwo">
              <span>
                타인이<br/>모르는 나
              </span>
            </div>
            <div className="contentBox">
              {/* TODO: the data in entries has not been added */}
              {Object.entries(boxData).map(([key, values], index) => (
                  <div className="content" key={index}>
                    {values.map((value, idx) => {
		      const keyword = epaKeywords[value];
                      if (!keyword) {
		        return null;
		      }
                      return (
                      <div key={idx} className="keyword">
                        <span>{keyword[1]} {keyword[0]}</span>
                      </div>
                    )})}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ResultSummarySectionTwo;
