import React from "react";
import { Button } from "./Button"; // 만약 Button 컴포넌트가 다른 파일에 있다면 그 경로를 잘 설정해주세요.

export const KeywordBtnBox = ({ keywords, gradient, width, height, className }) => {
  return (
    <div>
      {keywords.map((keyword, index) => (
        <Button
          gradient={gradient}
          width={width}
          height={height}
          className={className}
          key={index}
        >
          {keyword}
        </Button>
      ))}
    </div>
  );
};
