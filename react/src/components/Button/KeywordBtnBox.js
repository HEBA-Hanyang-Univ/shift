import React from "react";
import { Button } from "./Button";

// dummy data
const dummyKeywords = [
  "지혜로운", "옷을 굉장히 잘 입는", "방구를 심히 잘 뀌어버리는", "킹 받는", "밥을 잘 사주는 이쁜", "아는체를 잘하는", 
  "마음씨가 고운", "행복한", "이제노", "김도영", "항상 감사하고", "응원해주시고", 
  "성원해주시고", "자고싶어", "ㅗ", "개강하기 싫은", "무엇을 쓸 지 모르겠는", "이것은",
  "더미데이터", "아이스 아메리카노", "기이이이이이인 문장", "키워드", "세 단어만 더", "두 단어만 더"
]

export const KeywordBtnBox = ({ keywords, color, width, height, className }) => {

  const columns = Math.ceil(dummyKeywords.length / 4);

  return (
    <div className="keywordBtnBox" style={{display: 'grid', gridTemplateColumns: 'repeat'}}>
      {dummyKeywords.map((keyword, index) => (
        <div>
          <Button
            color={color}
            width={width}
            height={height}
            className={className}
            key={index}
          >
            {keyword}
          </Button>
        </div>
      ))}
    </div>
  );
};
