import React, { useState, useEffect } from "react";
import ErrorImg from "../assets/images/Result/Preparing.png";
import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";

const Error = () => {
  const [keywords, setKeywords] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/epa_keywords')
      .then((response) => {
        // 응답을 JSON으로 변환
        return response.json();
      })
      .then((data) => {
        // 변환된 JSON을 사용하여 상태 설정
        setKeywords(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error('Error!', error);
      });
  }, []);

  return (
    <div id="Container" className="errorContainer">
      <div className="errorWrapper">
        <div className="errorImg">
          <img src={ErrorImg} alt="error"></img>
        </div>
        <div className="errorText">
          <span style={{fontSize: '1.2rem'}}>
            <b>404 ERROR!</b>
          </span>
          <span>
            이용에 불편을 드려 죄송합니다 :(
            <br/>
            원하시는 페이지를 찾을 수 없습니다.            
            <br/>
          </span>
        </div>
        <div className="errorBtn">
          <Link to="/">
            <Button width={10} height={2.5} color={"#9C79AC"}>
              <span>
                HOME
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;