import React from "react";
import { Tab } from "../../components/Tab/Tab";
import "../../assets/styles/Result/Result.scss";

// data는 여기서 한 번에 하위 컴포넌트들로 전달
// dummy data
const dummyData = {
  username: "username",
  // 자기객관화 상위 %
  percentage: 10,
  // 예측한 키워드 중 맞은 값
  correctKeywords: ["지혜로운", "옷을 굉장히 잘 입는", "방구를 잘뀌는"],
  // 유형
  typeOfUser: '자기주장형',
  // meterValues: 유형 소개 페이지에 넣을 그래프 값
  meterValues: {MZ: 50, T: 50, R: 30, O: 25},
  // descriptionSentences: user에 대한 한 줄 평
  descriptionSentences: [
    "다른건 몰라도 그냥 돌이다.",
    "여자친구도 없는 조성훈이다.",
    "12시까지 집에 가야하는 바보다.",
    "여러모로 쓸모있는 종이다.",
    "이유빈은 허허허하고 웃는다.",
    "무엇이든지 할 수 있는 사람이다.",
  ]
}

const Result = () => {
  return (
    <div id="Container" className="resultContainer">
      <div className="resultContent">
        <Tab data={dummyData}/>
      </div>
    </div>
  );
} 

export default Result;