import React from "react";
import "assets/styles/Error.scss";
import "assets/styles/common.scss";
import ErrorImg from "assets/images/WarningIcon.svg";


export const Error = () => {
  return (
    <div className="errorOverlay">
      <div className="errorWrap">
        <div className="errorBox">
          <div className="errorImg">
            <img src={ErrorImg} alt="error img"></img>
          </div>
          <div className="errorMessage">
            <span>
              일시적인 오류입니다.
              <br></br>
              링크를 확인하고 다시 접속해주세요.
              <br></br>
              서비스 이용에 불편을 드려서 죄송합니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}