import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Result/Result.scss";

const ResultMZSectionTwo = ({ username }) => {
  //dummy data
  const dummyData = {
    "내가 아는 나" : ["지혜로운", "옷을 굉장히 잘 입는", "방구를 잘뀌는", "킹 받는"],
    "내가 모르는 나" : ["밥을 잘 사주는 이쁜", "아는체를 잘하는", "마음씨가 고운", "행복한", "버블티"],
    "타인이 아는 나" : ["vkdfld", "항상 감사하고", "응원해주시고", "성원해주시고", "자고싶어"],
    "타인이 모르는 나" : ["ㅗ", "개강하기 싫은", "무엇을 쓸 지 모르겠는", "이것은"]
  }

  return (
    <div className="rsSectionTwo">
      <div className="rsSectionTwoTitle">
        {/* TODO : 추후 유형과 이름 넣기 */}
        <span style={{color: "#A570C4"}}>{username}</span>
        <span>님은&nbsp;</span>
        <span style={{color: "#A570C4"}}>자기주장형</span>
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
              {Object.entries(dummyData).map(([key, values], index) => (
                  <div className="content" key={index}>
                    {values.map((value, idx) => (
                      <div key={idx} className="keyword">
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ResultMZSectionTwo;