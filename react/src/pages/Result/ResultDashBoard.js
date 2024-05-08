import React, { useEffect, useState } from "react";
import "../../assets/styles/Result/ResultDashBoard.scss";
import { ResultDashBoardBox } from "../../components/ResultDashBoardBox/ResultDashBoardBox";
import { PreparingDashBoardBox } from "../../components/ResultDashBoardBox/PreparingDashBoardBox";
import { saveDataWithExpiration, loadDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

import TryFetch from "../../components/FetchComponent/FetchComponent";

const ResultDashBoard = () => {
  const [ myTests, setMyTests ] = useState(loadDataWithExpiration("myTests"));
  const [ showResult, setShowResult ] = useState(false);

  useEffect(() => {
    if (myTests === null) {
      TryFetch("/my_tests", "GET", {}, (data) => {
        setMyTests(data);
        if (data["epa"]) {
          setShowResult(true);
          // NOTE: myTests data's lifetime is 6 seconds
          saveDataWithExpiration("myTests", data, 0.1);
        }
      }, (error) => {});
    } else {
      if (myTests["epa"]) {
        setShowResult(true);
      }
    }
  }, []);

  return (
    <div id="Container">
      <div className="rdbWrapper">
        <div className="rdbTitleWrapper">
          <span>테스트 결과 확인</span>
        </div>
        <div className="rdbResultDashBoardBoxWrapper">
          {showResult && <ResultDashBoardBox tid={myTests["epa"][0]} number={myTests["epa"][1]}/>}
          {/*TODO: consider if user doesn't have any test. */}
          {!showResult && <PreparingDashBoardBox />}
          <PreparingDashBoardBox />
          <PreparingDashBoardBox />
        </div>
      </div>
    </div>
  )
}

export default ResultDashBoard;
